var id = 'ui:Play',
  Abstract = li.require( 'ui/Abstract' ),
  Play;

/**
 * Representation of a button element
 * @class Button
 * @constructor
 * @extends Abstract
 * @param {HTMLElement} element The HTML element surrounded by the control
 * @param {Object} settings Configuration properties for this instance
 */
Play = Abstract.extend( function ( $element, settings ){
/**
 * Instance of Button
 * @property Button
 * @type Object
 */
  var Play = this,
    /**
     * Default configuration values
     * @property defaults
     * @type Object
     */
    defaults = {
      interval: 3000
    },
    /**
     * The source of events to listen for
     * @property $subscribesTo
     * @type Object
     */
    $subscribesTo,
    /**
     * The player timer
     * @property timer
     * @type Object
     */    
    timer;

  settings = _.extend( defaults, settings );

  $subscribesTo = $(settings.subscribe);

  // Subscribe to custom events
  $element.on('play', function (event) {
    _.log("Play: play");
    timer = window.setInterval(function () {
      Play.trigger("next");
    }, settings.interval);
  });

  $element.on('stop', function (event) {
    _.log("Play: stop");
    window.clearInterval(timer);
  });



  if ($subscribesTo.length) {
    Play.subscribe( $subscribesTo );
  }

  $element.data( id, Play );
  
} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Play;
}

