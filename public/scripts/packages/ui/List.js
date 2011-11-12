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
  	 * The CSS selector used to grab the list items
  	 * @property itemSelector
  	 * @type String
  	 * @final
  	 */	  
	  itemSelector: "li",
  	/**
  	 * The CSS Class that signifies a selected list item
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
	List.selectedItem;
  /**
   * A collection of list items
   * @property items
   * @type Array
   */
	List.items;

  // Init
	settings = _.extend( defaults, settings );
  List.items = $( settings.itemSelector, $element );
  List.selectedItem = List.items[0];
  List.selectedIndex = 0;
  List.size = List.items.length;

  /**
   * Select a item in the list
   * @method selectItem
   * @public
   * @param {Integer} num The index of the item to select
   */
  List.selectItem = function (num) {
    var SELECTED_CSS = settings.selectedClass;
    
    if (0 <= num && num < List.size) {
      // Unstyle the old item
      $(List.selectedItem).removeClass(SELECTED_CSS);
    
      // Update selectedIndex & selectedItem
      List.selectedIndex = num;
      List.selectedItem = List.items[List.selectedIndex];
    
      // Style the new item
      $(List.selectedItem).addClass(SELECTED_CSS);    
      
      // Fire custom event
      List.trigger("itemSelected", List.selectedItem);
    }
  };
  
  /**
   * Returns the selected list item
   * @method getSelectedItem
   * @public
   * @return Object
   */
  List.getSelectedItem = function () {
    return List.selectedItem;
  };
  
  /**
   * Returns the number of items in the list 
   * @method getSize
   * @public
   * @return Integer
   */
  List.getSize = function () {
    return List.size;
  };
  
  // Framework magic
  $element.data( id, List );
  
} );

if ( typeof module !== 'undefined' && module.exports ) {
	module.exports = List;
}
