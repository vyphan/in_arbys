var id = 'ui/Carousel',
	Abstract = li.require( 'ui/Abstract' ),
	Carousel;

/**
 * Description
 * @class Carousel
 * @constructor
 * @param {HTMLElement} element The DOM node representing the Carousel's container
 * @param {Object} settings Configuration properties
 */
Carousel = Abstract.extend( function ( element, settings ){
	var Carousel = this,
		defaults = {};

	settings = _.extend( defaults, settings );

	element.data( id, this );

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = Carousel;
}