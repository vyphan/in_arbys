var id = 'ui/Abstract',
	klass = li.require( 'libraries/klass' ),
	EventProvider = li.require( 'providers/Event' ),
	Abstract;

/**
 * The base component class all other UI components inherit from.
 * @class Abstract
 * @constructor
 * @param {HTMLElement} element The HTML element surrounded by the control
 * @param {Object} settings Configuration properties for this instance
 */
Abstract = klass( function ( element, settings ){

  /**
   * Instance of Abstract class
   * @property Abstrance
   * @type {Object}
   */
	var Abstract = this,
	/**
	 * Instance of EventProvider
	 * @property Event
	 * @type {Object}
	 */
	Event,
  /**
    * Default configuration values
  	* @property defaults
  	* @type {Object}
  	*/
  defaults = {
    observers: []
  },
  /**
   * Other components that are watching this component for any events it triggers
   * @property observers
   * @type {Array}
   */
  observers,
  /**
   * Description
   * @property namespace
   * @type {String}
   */
	namespace;
	
	settings = _.extend( defaults, settings );
	observers = settings.observers;

	namespace = '.' + settings.namespace || '';


	Event = new EventProvider( {
		proxy: element
	} );

  /**
   * Trigger events for any observers 
   * @method notify
   * @private
   * @param {String} type The type of custom event to trigger
   * @param {Array} parameters Arguments passed through to the observer's callback function
   */
	function notify( type, parameters ) {
		_.each( observers, function( observer, index ) {
			observer.trigger ? observer.trigger( type, parameters ) : $( observer ).trigger( type, parameters );
		} );
	}

  /**
   * Creates an event listener 
   * @method bind
   * @public
   * @param {String} type The type of the event 
   * @param {Function} handler The callback function
   */
	Abstract.bind = function( type, handler ) {
		return Event.bind( type + namespace, handler );
	};
  
  /**
   * Removes an event listener 
   * @method unbind
   * @public
   * @param {String} type The type of the event
   */
	Abstract.unbind = function( type ) {
		return Event.unbind( type + namespace );;
	};
	
	/**
   * Fires a custom event 
   * @method trigger
   * @public
   * @param {String} type The type of the event
   * @param {Array} parameters Arguments passed through to the callback function
   */
  Abstract.trigger = function( type, parameters ) {
		notify( type + namespace, parameters );
		return Event.trigger( type + namespace, parameters );
	};
	
	/**
   * Subscribes to a custom event
   * @method subscribe
   * @public
   * @param {Object} observer A reference to another ui component that wants to respond to some event triggered by the instance.
   */
  Abstract.subscribe = function( observer ) {
		observers.push( observer );
	};

	element.data( id, this );

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = Abstract;
}
