var id = 'ui/List',
	Abstract = li.require( 'ui/Abstract' ),
	List;

/**
 * A representation of a stateful list
 * @class List
 * @constructor
 * @param {HTMLElement} element The HTML element containing this component
 * @param {Object} settings Configuration properties for this instance
 */
List = Abstract.extend( function ( $element, settings ){
  /**
   * Instance of the List class
   * @property List
   * @type {Object}
   */	
   var List = this,
	/**
	 * Default configuration values
	 * @property defaults
	 * @type {Object}
	 */
	defaults = {};

	settings = _.extend( defaults, settings );

	$element.data( id, this );

  // Subscribe to custom events
  $element.on('next', function (event) {
    _.log("List: next");
  });

  $element.on('previous', function (event) {
    _.log("List: previous");
  });

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = List;
}
