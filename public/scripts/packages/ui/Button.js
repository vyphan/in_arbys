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

<<<<<<< HEAD
	element.bind( settings.event, function ( event ) {
		Button.send( out );
		console.log("Button clicked");
	} );
=======
  $element.on( settings.on, function ( event ) {
    Button.trigger( action );
  } );

  $element.data( id, Button );
>>>>>>> 1dbbeeebc6e7daef9de922f971f9296d5c00304c

} );

if ( typeof module !== 'undefined' && module.exports ) {
<<<<<<< HEAD
	module.exports = Button;
}


alert('yo');
=======
  module.exports = Button;
}
>>>>>>> 1dbbeeebc6e7daef9de922f971f9296d5c00304c
