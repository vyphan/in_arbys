var Class = require( 'class' ),
  List = require( 'athena/List' ),
  Carousel;

/**
 * A representation of a stateful list
 * @class List
 * @constructor
 * @param {HTMLElement} element The HTML element containing this component
 * @param {Object} settings Configuration properties for this instance
 */
Carousel =  Class.create( List, ( function() {

  var MAXED_EVENT = 'maxed',
    FLOORED_EVENT = 'floored',
    PLAY_EVENT = 'play',
    PLAYING_EVENT = 'playing',
    PAUSE_EVENT = 'pause',
    PAUSED_EVENT = 'paused',
    FIRST_EVENT = 'first',
    LAST_EVENT = 'last',
    SELECT_EVENT = 'select',
    SELECTED_EVENT = 'selected',
    PREVIOUS_EVENT = 'previous',
    NEXT_EVENT = 'next',
    OUT_OF_BOUNDS_EVENT = 'out-of-bounds';

  // RETURN METHODS OBJECT
  return {
    /**
     * PTClass constructor
     * @method initialize
     * @public
     * @param {Object} $super Pointer to superclass constructor
     * @param {Object} $element JQuery object for the element wrapped by the component
     * @param {Object} settings Configuration settings
     */
    initialize: function ( $super, $element, settings ) {

      // PRIVATE INSTANCE PROPERTIES

      /**
       * Instance of Carousel
       * @property Carousel
       * @type Object
       * @private
       */  
      var Carousel = this,
        /**
         * Default configuration values
         * @property defaults
         * @type Object
         * @private
         * @final
         */
        defaults = {
          /**
           * Number of times to cycle through carousel items when playing, set to -1 to repeat forever
           * @property repeat
           * @type Number
           * @private
           */
          repeat: -1,
          /**
           * Automatically calls play on instantiation if set to true
           * @property repeat
           * @type Boolean
           * @private
           * @final
           */
          autoplay: true,
          /**
           * The time in milliseconds to remain on an item while playing
           * @property delay
           * @type Number
           * @private
           * @final
           */
          delay: 3000
        },
        /**
         * Integer value signalling whether the carousel is set to repeat
         * @property repeat
         * @type Type Number
         * @private
         */
        repeat,
        /**
         * Flag signalling the playing state of the carousel
         * @property playing
         * @type Boolean
         * @default false
         * @private
         */
        playing = false;

      // MIX THE DEFAULTS INTO THE SETTINGS VALUES
      _.defaults( settings, defaults );

      repeat = settings.repeat;

      // CALL THE PARENT'S CONSTRUCTOR
      $super( $element, settings );

      // PRIVILEGED METHODS
     /**
       * Plays the Carousel when paused
       * @method play
       * @public
       * @return {Object} The Carousel instance
       */
      Carousel.play = function() {
        if( playing === false ) {
          repeat = settings.repeat;
          playing = true;
          ( function recurse() {
            window.setTimeout( function() {
              if( playing ) {
                Carousel.next();
                recurse();
              }
            }, settings.delay );
          }() );
          Carousel.trigger( PLAYING_EVENT, [ $element ] );
        }
        return Carousel;
      };

      /**
       * Pauses the Carousel when playing
       * @method pause
       * @public
       * @return {Object} The Carousel instance
       */
      Carousel.pause = function() {
        if( playing ) {
          playing = false;
          Carousel.trigger( PAUSED_EVENT, [ $element ] );
        }
        return Carousel;
      };

      /**
       * Carousels wrap, so they always have next
       * @method hasNext
       * @public
       * @return {Boolean} true if not at the last item in the list
       */
      Carousel.hasNext = function() {
        return true;
      };

      /**
       * Carousels wrap, so they always have previous
       * @method hasPrevious
       * @public
       * @return {Boolean} true
       */
      Carousel.hasPrevious = function() {
        return true;
      };
      
      /**
       * Selects the next item in the Carousel. 
       * @method next
       * @public
       * @return {Object} List
       */
      Carousel.next = function() {
        if( Carousel.size() === Carousel.index() + 1 ) {
          Carousel.select( 0 );
        } else {
          Carousel.select( Carousel.index() + 1 ); 
        }
        return Carousel;
      };

      /**
       * Selects the previous item in the Carousel. 
       * @method previous
       * @public
       * @return {Object} List
       */  
      Carousel.previous = function() {
        console.log( 'previous' );
        Carousel.select( Carousel.index() - 1 );
        return Carousel;
      };

      Carousel.on( PLAY_EVENT, function( event ) {
        event.stopPropagation();
        Carousel.play();
      } );
      Carousel.on( [PAUSE_EVENT, NEXT_EVENT, PREVIOUS_EVENT, FIRST_EVENT, LAST_EVENT, SELECT_EVENT].join( ' ' ), function( event, item ) {
        event.stopPropagation();
        Carousel.pause();
      } );
      Carousel.on( OUT_OF_BOUNDS_EVENT + '.' + NEXT_EVENT, function( event ) {
        var controls;

        event.stopPropagation();

        Carousel.next();

        controls = Carousel.current().athena( 'getControls' );
        _.each( controls, function( item, index ) {
          if ( typeof item.first === 'function' ) {
            item.first();
          }
        } );

      } );
      Carousel.on( OUT_OF_BOUNDS_EVENT + '.' + PREVIOUS_EVENT, function( event ) {
        var controls;

        event.stopPropagation();

        Carousel.previous();

        controls = Carousel.current().athena( 'getControls' );
        _.each( controls, function( item, index ) {
          if ( typeof item.last === 'function' ) {
            item.last();
          }
        } );
      } );
      Carousel.on( SELECTED_EVENT, function( event, $item ) {
        console.log( Carousel.items(), $item );
        if( $item.is( Carousel.items() ) ) {
          event.stopPropagation();
          console.log( 'YAY!!!', $item );
          Carousel.select( $item );
        }
      } );

      // Play if autoplay was true in settings
      if( settings.autoplay ) {
        Carousel.play();
      } else {
        Carousel.trigger( PAUSED_EVENT, [ $element ] );
      }

    }
  };

}() ) );

//Export to Common JS Loader
if( module ) {
  if( typeof module.setExports === 'function' ){
    module.setExports( Carousel );
  } else if( module.exports ) {
   module.exports = Carousel; 
  }
}
