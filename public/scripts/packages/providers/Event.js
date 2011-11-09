
/**
 * @id providers/Event
 * @requires ['libraries/jquery', 'libraries/klass']
 */

var klass = li.require( 'libraries/klass' ),
	EventProvider;

/**
 * EventProvider library
 * @class EventProvider
 * @constructor
 * @requires ['libraries/jquery', 'libraries/klass']
 * @param {Object} settings Configuration options for this instance
 */
var EventProvider = klass( function ( settings ){

/**
 * EventProvider instance
 * @property EventProvider
 * @type {Object}
 */
	var EventProvider = this,
  /**
   * Configuration defaults
   * @property defaults
   * @type {Object}
   */
		defaults = {
			proxy: $( {} )
		},
    /**
     * TBD
     * @property cache
     * @type {Object}
     */
		cache = {},
    /**
     * TBD
     * @property proxy
     * @type {Object}
     */
		proxy,
    /**
     * Description
     * @property provider
     * @type {Boolean}
     */
		provider = true;

	settings = _.extend( defaults, settings );

	proxy = settings.proxy;
	cache.bind = proxy.bind;
	cache.unbind = proxy.unbind
	cache.trigger = proxy.trigger;

/**
 * Creates an event listener. 
 * @method bind
 * @public
 * @param {String} type The event type to respond to
 * @param {function} handler The callback function triggered by the event
 */
	EventProvider.bind = function ( type, handler ) {
		return ( function() {
			cache.bind.apply( settings.proxy, [type, handler] );
			return EventProvider;
		}() );
	}

  /**
   * Removes an event listener. 
   * @method unbind
   * @public
   * @param {String} type The event type to remove
   */
	EventProvider.unbind = function( type ) {
		return proxy.unbind = ( function() {
			cache.unbind.apply( settings.proxy, [type] );
			return EventProvider;
		}() );
	}
	
  /**
   * Fires a custom event.
   * @method trigger
   * @public
   * @param {String} type The event type
   * @param {Array} parameters Arguments passed on to the callback function.
   */
	EventProvider.trigger = function( type, parameters ) {
		return ( function() {
			cache.trigger.apply( settings.proxy, [type + ':before', parameters] );
			cache.trigger.apply( settings.proxy, [type, parameters] );
			cache.trigger.apply( settings.proxy, [type + ':after', parameters] );
			return EventProvider;
		}() );
	}

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = EventProvider;
}