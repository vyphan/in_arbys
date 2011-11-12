/**
 * Athena Framework Library
 * @class athena-0.0.1
 * @module
 * @static
 */
( function( $ ){

  var pattern = '[data-athena*="ui:"]',
    queues = {},
    actions = {},
    required = [];


  /**
   * Queue a node for execution once associated package is ready
   * @method Name
   * @public|private
   * @param {String} key Key for package
   * @param {Object} $node The JQuery node associated with the UI Component
   */
  function enqueue( key, $node ) {
    if ( !( $node.data().queued ) ) {
      if( queues[key] ) {
        queues[key].push( $node );
      } else {
        queues[key] = [$node];
      }
      $node.data( 'queued', true );
    }
  }

  /**
   * JQuery plug-in used to parse node for UI components, load and instantiate, neccessary packages.
   * @method act
   * @public
   */
  $.fn.act = function() {
    var $this = $( this ),
      count;

    /**
     * Instantiate a node's role.
     * @method execute
     * @private
     * @param {Object} $node JQuery node reference
     * @param {String} role An event type (?)
     * @param {Object} Action The name of the Event's class
     */
    function execute( $node, role, Action ) {
      new Action( $node, new Function ( '$this', 'return ' + $node.data( 'athenaConfig' ) + '[\'' + role + '\']'  )( $node ) );
      $node.data( 'acting', true );
      console.info( 'Action ' + role + ' executed with', $node );
      count -= 1;
      if( count  === 0 ) {
        $this.trigger( 'acting' );
      }
    }

    //Keep track of total actors found, so we can trigger an acting event when they're instantiated
    count = _.reject( $( pattern, $this ), function( item, index ) {
      return $( item ).data().acting;
    } ).length;

    /**
     * Recurse over children to make sure UI components are instantiated inside out. 
     * @method recurse
     * @private
     * @param {Object} $this JQuery object reference pointing to the original node.
     */
    ( function recurse( $this ) {
      var $actors,
        roles;

      //It's already instantiated so there's no need to continue
      if( $this.data().acting ) {
        return;
      }

      //UI components that are children of the passed in node.
      $actors = _.reject( $( pattern, $this ), function( item, index ) {
        return $( item ).data().acting;
      } );

      //There are no child UI components, so it's safe to instantiate it, or queue it up and load neccessary packages
      if( $actors.length === 0 ) {
        if( $this.is( pattern ) ) {
          roles = _.reject( ( $this.data().athena || '' ).split( ' ' ), function( role, index ) {
            return ( role.indexOf( 'ui:' ) === -1 );
          } );
          _.each( roles, function( role, index ) {
            var module;
            if( typeof actions[role] === 'function' ) {
              execute( $this, role, actions[role] );
            } else {
              enqueue( role, $this );
              module = role.replace( ':', '/' );
              if( _.indexOf( required, module ) === -1 ) {
                required.push( module );
                li.require( [ module ], function( Action ) {
                  actions[role] = Action;
                  queue = queues[role];
                  while ( queue.length > 0 ) {
                    execute( queue.pop(), role, Action );
                  }
                  recurse( $this.parents() );
                } );
              }
            }
          } );
        } else {
          return;
        }
      }

      //Lather, rinse, repeat...
      _.each( $this.contents(), function( node, index ) {
        recurse( $( node ) );
      } );

    } ( $this ) );

  };
}( jQuery ) );


/**
 * JQuery plug-in to get access to a component instance bound to 
 * the specified DOM node.
 * @method getControl
 * @public
 * @param {String} id The id of the component's DOM node.
 */
( function( $ ){
  $.fn.getControl = function( id ) {
    return $( this ).data( id );
  };

}( jQuery ) );


/**
 * Hijacks $jQuery's event model so we can put in Athena specific hooks.
 * @class
 * @static
 */

( function( $ ){

  var cache = {
    on: $.fn.on,
    off: $.fn.off,
    trigger: $.fn.trigger
  };

  /**
   * Facade for JQuery's on method
   * @method on
   * @public
   */
  $.fn.on = function() {
    var $this = $( this );
    if( $this.data( 'acting' ) ) {
      _.each( arguments, function( argument, index ) {
        if( typeof argument === 'function' ) {
          
        }
        return;
      } );
    }
    return cache.on.apply( $this, arguments );
  };

  /**
   * Facade for JQuery's off method
   * @method off
   * @public
   */  
  $.fn.off = function() {
    var $this = $( this );
    if( $this.data( 'acting' ) ) {
      
    }
    return cache.off.apply( $this, arguments );
  };

  /**
   * Facade for JQuery's trigger method
   * @method trigger
   * @public
   */  
  $.fn.trigger = function() {
    var $this = $( this );
    if( $this.data( 'athena' ) ) {

    }
    return cache.trigger.apply( $this, arguments );
  };

}( jQuery ) );
