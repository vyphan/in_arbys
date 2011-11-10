var id = 'ui/List',
	Abstract = li.require( 'ui/Abstract' ),
	Callout;

List = Abstract.extend( function ( $element, settings ){
	var List = this,
		defaults = {};

	settings = _.extend( defaults, settings );

	$element.data( id, this );

  // Subscribe to custom events
  $element.on('next', function (event) {
    _.log("List: next");
  });

  $element.on('previous', function (event) {
    _.log("List: previous");
  });

} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = List;
}