var klass = li.require( 'libraries/klass' ),
  EventProvider;

/**
 * EventProvider library
 * @class EventProvider
 * @constructor
 * @requires ['libraries/jquery', 'libraries/klass']
 * @param {Object} settings Configuration options for this instance
 */
EventProvider = klass( function ( settings ){

/**
 * EventProvider instance
 * @property EventProvider
 * @private
 * @type {Object}
 */
  var EventProvider = this,
  /**
   * Default configuration values
   * @property defaults
   * @private
   * @type {Object}
   */
    defaults = {
      /**
       * A selector used in creating a Jquery collection to proxie events
       * @property subscribe
       * @type {String}
       */
      proxy: '',
    },
    /**
     * A jQuery collection to proxy events
     * @property proxy
     * @private
     * @type {Array}
     */
    $proxy,
    /**
     * A cache of $proxy event methods
     * @property cache
     * @private
     * @type {Object}
     */
    cache = {};

  settings = _.extend( defaults, settings );

  $proxy = $( settings.proxy );

  cache.on = $proxy.on;
  cache.off = $proxy.off
  cache.trigger = $proxy.trigger;

  /**
   * Creates an event listener. 
   * @method on
   * @public
   * @param {String} type The event type to respond to
   * @param {function} handler The callback function triggered by the event
   */
  EventProvider.on = function ( type, handler ) {
    return ( function() {
      cache.on.apply( $proxy, [type, handler] );
      return EventProvider;
    }() );
  }

  /**
   * Removes a event listeners of type. 
   * @method off
   * @public
   * @param {String} type The event type to remove
  */
  EventProvider.off = function( type ) {
    return proxy.off = ( function() {
      cache.off.apply( settings.proxy, [type] );
      return EventProvider;
    }() );
  }

  /**
   * Fires an event.
   * @method trigger
   * @public
   * @param {String} type The event type
   * @param {Array} parameters Arguments passed on to the callback function.
   */
  EventProvider.trigger = function( type, parameters ) {
    return ( function() {
      cache.trigger.apply( $proxy, [type + ':before', parameters] );
      cache.trigger.apply( $proxy, [type, parameters] );
      cache.trigger.apply( $proxy, [type + ':after', parameters] );
      return EventProvider;
    }() );
  }

} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = EventProvider;
}