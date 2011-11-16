var id = 'ui/Dialog',
	Abstract = li.require( 'ui/Abstract' ),
	Dialog;

Dialog = Abstract.extend(function($element, settings) {
	var Dialog = this,
  		defaults = {
		    autoOpen: false
  		};

	settings = _.extend(defaults, settings);
	
	$element.dialog(settings);
	$element.on('close', function() {
	  $(this).dialog('close');
  });
	
	$element.data(id, this);
});

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = Dialog;
}