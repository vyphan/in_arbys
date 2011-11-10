var id = 'ui:Button',
  Abstract = li.require( 'ui/Abstract' ),
  Button;

Button = Abstract.extend( function ( $element, settings ){
  var Button = this,
    defaults = {
      on: 'click'
    },
    action;

  settings = _.extend( defaults, settings );

  action = settings.action;

  // on click
  $element.on( settings.on, function ( event ) {
    Button.trigger( action );
  } );

  $element.data( id, Button );

} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Button;
}



/*

$( '#pause_button' ).on( 'pause:before', function() {
  console.info(  'before, pause' );
} );

$( '#container' ).on( 'pause', function() {
  console.info( 'bubbled, pause' );
} );

$( '#pause_button' ).on( 'pause', function() {
  console.info( 'pause' );
} );

$( '#pause_button' ).on( 'pause:after', function() {
  console.info( 'after, pause' );
} );

$( '#play_button' ).on( 'play:before', function() {
  console.info( 'before, play' );
} );

$( '#container' ).on( 'play', function() {
  console.info( 'bubbled, play' );
} );

$( '#play_button' ).on( 'play', function() {
  console.info( 'play' );
} );

$( '#play_button' ).on( 'play:after', function() {
  console.info( 'after, play' );
} );


*/