var id = 'ui:Button',
  Abstract = li.require( 'ui/Abstract' ),
  Button;

Button = Abstract.extend( function ( $element, settings ){
  var Button = this,
    defaults = {
      on: 'click'
    },
    action,
    $subscribesTo;

  settings = _.extend( defaults, settings );

  action = settings.action;

  $subscribesTo = $(settings.subscribe);

  // on click
  $element.on( settings.on, function ( event ) {
    _.log("Button " + settings.on + " with " + action);
    Button.trigger( action );
  } );

  $element.data( id, Button );

  if ($subscribesTo.length) {
    Button.subscribe( $subscribesTo );
  }
  
} );

if ( typeof module !== 'undefined' && module.exports ) {
  module.exports = Button;
}

