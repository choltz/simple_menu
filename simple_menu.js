// namespace the menu feature
if(!com) var com={};
if(!com.choltz) com.choltz={};
if(!com.choltz.ui) com.choltz.ui={};

//
// menu class - build builds up the markup necessary
// to display a dynamic dropdown menu.
//
com.choltz.ui.menu = function()
{
  var public       = {};
  var private      = {};

  // constructor
  private.init = function()
  {
    // create a top-level menu element in the menu place-holder
    var menu          = $("simple_menu"); 
    var menu_ul       = document.createElement("ul");
    menu_ul.id        = "menu_bar";
    menu_ul.className = "menu_bar";
    var clear         = document.createElement("div");
    clear.style.clear = "both";

    private.menu_bar  = menu.appendChild(menu_ul);
    menu.appendChild(clear);
  }();

  // Add a menu item to the top-level menu structure
  public.add_menu_item = function(text, url)
  {
    var menu_item = new com.choltz.ui.menu.menu_item(private.menu_bar);
    return menu_item.add_child(text, url);
  }

  return public;
}

//
// This object builds the markup for menu items in the
// dynamic menu structure
//
com.choltz.ui.menu.menu_item = function(parent_element)
{
  var public  = {};
  var private = {};

  // Add a child item to the menu structure
  public.add_child = function(text, url)
  {
    var menu_ul;
    var menu_li         = document.createElement("li");
    menu_li.className   = "menu_cell";
    var menu_link       = document.createElement("a");

    // menu bar items are slightly different than dropdown menu items
    if (parent_element.id == "menu_bar")
    {
      menu_ul = parent_element;    
      menu_link.className = "menu_link menu_bar_link";

      // If this is IE, use mouse over and out, as css alone won't work
      if (document.all&&document.getElementById)
      {
        menu_li.onmouseover=function()
        {
          this.className+=" over";
        }
        menu_li.onmouseout=function()
        {
          this.className=this.className.replace(" over", "");
        }
      }
    }
    else
    {
      menu_ul         = private.get_dropdown();    
      menu_link.className = "menu_link menu_cell_link";

      if (IsIE())
      {
        menu_link.style.width = "100%";
      }
    }

    // Add a hyperlink to the meu item
    menu_link.innerHTML = text;
    menu_link.href      = url;
    menu_li.appendChild(menu_link);
    menu_ul.appendChild(menu_li);

    // wrap the element in a menu item object and return it
    return com.choltz.ui.menu.menu_item(menu_li);
  }

  // figure out the dropdown associated with the item represented
  // by this object
  private.get_dropdown = function()
  {
    // create a dropdown container if it isn't already present
    if (parent_element.childNodes.length <= 1)
    {
      menu_ul            = document.createElement("ul");
      menu_ul.className  = "menu_dropdown";
      menu_ul.style.left = "0px";
      menu_ul.style.top  = (IsIE() ? parent_element.clientHeight + "px" : menu_ul.style.top);

      parent_element.appendChild(menu_ul);
    }
    else
    {
      menu_ul = parent_element.childNodes[1];
    }

    return menu_ul;
  }

  return public;
}


// convenience function to retrieve an element by id
function $(id)
{
  return document.getElementById(id);
}

// return whether or not the browser is Internet Explorer
function IsIE()
{
   return /MSIE/.test(navigator.userAgent)
}
