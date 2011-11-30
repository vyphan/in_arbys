var id = 'ui/CarouselAutoPlay',
  Abstract = li.require('ui/Abstract'),
	Carousel = li.require('ui/Carousel'),
	AutoPlayer = li.require('providers/AutoPlayer'),
	CarouselAutoPlay;

CarouselAutoPlay = Abstract.extend(function(element, settings) {
	var CarouselAutoPlay = this,
		CarouselAdapter, 
		autoplayer,
		defaults = {};
	
	settings = _.extend(defaults, settings);
	CarouselAdapter = new Carousel(settings);
	autoplayer = new AutoPlayer(settings);
	
  // Observes these custom events
  $element.on('play', function (event) {
    CarouselAutoPlay.play();
    event.stopPropagation();
  });

  $element.on('stop', function (event) {
    CarouselAutoPlay.stop();
    event.stopPropagation();
  });

  CarouselAutoPlay.start = function() {};
  CarouselAutoPlay.stop = function() {};

  
  // Magic
	// $element.data( id, CarouselAutoPlay );	
	
});
if (typeof module !== 'undefined' && module.exports) {
	module.exports = CarouselAutoPlay;
}
