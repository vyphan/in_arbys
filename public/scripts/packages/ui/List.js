var id = 'ui/List',
	Abstract = li.require( 'ui/Abstract' ),
	Callout;

/**
 * Description
 * @class List
 * @constructor
 * @param {HTMLElement} element The HTML element containing the component
 * @param {Object} settings Configuration properties for this instance
 */
List = Abstract.extend( function ( element, settings ){
	var List = this,
		defaults = {};

	settings = _.extend( defaults, settings );

	element.data( id, this );

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = List;
}