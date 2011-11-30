var klass = li.require( 'libraries/klass' ),
  AutoPlayer;

/**
 * AutoPlay provider
 * @class AutoPlayer
 * @constructor
 * @requires ['libraries/jquery', 'libraries/klass']
 * @param {Object} settings Configuration options for this instance
 */
AutoPlayer = klass( function ( settings ){

/**
 * AutoPlayer instance
 * @property AutoPlayer
 * @private
 * @type {Object}
 */
  var AutoPlayer = this,
  /**
   * Default configuration values
   * @property defaults
   * @private
   * @type {Object}
   */
  defaults = {
    /**
     * The animation interval, in milliseconds
     * @property interval
     * @type {Integer}
     * @default 3000
     */
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
    _.log("AutoPlayer: play");
    timer = window.setInterval(function () {
      AutoPlayer.trigger("next");
    }, settings.interval);
  });

  $element.on('stop', function (event) {
    _.log("AutoPlayer: stop");
    window.clearInterval(timer);
  });

  AutoPlayer.subscribe( $subscribesTo );
  
  $element.data( id, AutoPlayer );

} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Play;
}

