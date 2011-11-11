var id = 'ui/List',
	Abstract = li.require( 'ui/Abstract' ),
	List;

/**
 * A representation of a stateful list
 * @class List
 * @constructor
 * @param {HTMLElement} $element A JQuery object representing the HTML element containing this component
 * @param {Object} settings Configuration properties for this instance
 */
List = Abstract.extend( function ( $element, settings ){
  /**
   * Instance of the List class
   * @property List
   * @type {Object}
   */	
   var List = this,
	/**
	 * Default configuration values
	 * @property defaults
	 * @type {Object}
	 */
	defaults = {
  	/**
  	 * The CSS selector used to grab the list nodes
  	 * @property nodeSelector
  	 * @type String
  	 * @final
  	 */	  
	  nodeSelector: "li",
  	/**
  	 * The CSS Class that signifies a selected list node
  	 * @property CSS_SELECTED
  	 * @type String
  	 * @final
  	 */
    selectedClass: "selected"	  
	};
	
  /**
   * The number of items in the List
   * @property size
   * @type Integer
   */
	List.size = 0;
  /**
   * The index of the selected item in the List
   * @property selectedIndex
   * @type Integer
   */	
	List.selectedIndex;
	/**
	 * A reference to the currently-selected item in the List
	 * @property selectedElement
	 * @type JQObject
	 */
	List.selectedNode;
  /**
   * A collection of list items
   * @property nodes
   * @type Array
   */
	List.nodes;

  // Init
	settings = _.extend( defaults, settings );
  List.nodes = $( settings.nodeSelector, $element );
  List.selectedNode = List.nodes[0];
  List.selectedIndex = 0;
  List.size = List.nodes.length;

  /**
   * Select a node in the list
   * @method selectNode
   * @public
   * @param {Integer} num The index of the node to select
   */
  List.selectNode = function (num) {
    var SELECTED_CSS = settings.selectedClass;
    
    if (0 <= num && num < List.size) {
      // Unstyle the old node
      $(List.selectedNode).removeClass(SELECTED_CSS);
    
      // Update selectedIndex & selectedNode
      List.selectedIndex = num;
      List.selectedNode = List.nodes[List.selectedIndex];
    
      // Style the new node
      $(List.selectedNode).addClass(SELECTED_CSS);    
      
      // Fire custom event
      List.trigger("nodeSelected", List.selectedNode);
    }
  };
  
  /**
   * Returns the selected list node
   * @method getSelectedNode
   * @public
   * @return Object
   */
  List.getSelectedNode = function () {
    return List.selectedNode;
  };
  
  /**
   * Returns the number of nodes in the list 
   * @method getSize
   * @public
   * @return Integer
   */
  List.getSize = function () {
    return List.size;
  };
  
/*
  // Subscribe to custom events
  $element.on('next', function (event) {
    _.log("List: next");
    List.setSelectedNode(List.selectedIndex + 1);
  });

  $element.on('previous', function (event) {
    _.log("List: previous");
    List.setSelectedNode(List.selectedIndex - 1);
  });
*/

  // Framework magic
  $element.data( id, List );
  
} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = List;
}
