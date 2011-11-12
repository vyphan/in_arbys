var id = 'ui/Carousel',
	List = li.require( 'ui/List' ),
	Carousel;

/**
 * Description
 * @class Carousel
 * @constructor
 * @param {HTMLElement} $element The JQuery node representing the Carousel's container
 * @param {Object} settings Configuration properties
 */
Carousel = List.extend( function ( $element, settings ){
	var Carousel = this,
		defaults = {};

	settings = _.extend( defaults, settings );

  Carousel.next = function () {
    var index = Carousel.selectedIndex,
      size = Carousel.size,
      next = index + 1;
      
    if (next >= size) {
      Carousel.first();
    }
    else {
      Carousel.selectItem(index + 1);
    }
  };
  
  Carousel.previous = function () {
    var index = Carousel.selectedIndex,
      size = Carousel.size,
      next = index - 1;
      
    if (next < 0) {
      Carousel.last();
    }
    else {
      Carousel.selectItem(next);
    }
  };
  
  Carousel.first = function () {
    Carousel.selectItem(0);
  };
  
  Carousel.last = function () {
    Carousel.selectItem(Carousel.size - 1);    
  };
  
  
  // Observes these custom events
  $element.on('next', function (event) {
    Carousel.next();
    event.stopPropagation();
  });

  $element.on('previous', function (event) {
    Carousel.previous();
    event.stopPropagation();
  });
  
  // Magic
	$element.data( id, Carousel );
});

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = Carousel;
}