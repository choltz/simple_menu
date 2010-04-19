// wrap the menu generation in a function so that it can be called
// on page load
function load_menu()
{
  // generate an instance of the simple_menu object
  var menu   = com.choltz.ui.menu();
  var parent = null;
  menu.add_menu_item("Home", "");

  // build parent and child menu items. The second parameter in each of
  // these examples are empty. They should contain the target URL for
  // the menu item
  parent = menu.add_menu_item("About", "");
  parent.add_child("History", "");
  parent.add_child("Team",    "");
  parent.add_child("Offices", "");

  parent = menu.add_menu_item("Services", "");
  parent.add_child("Web Design",         "");
  parent.add_child("Internet Marketing", "");
  parent.add_child("Hosting",            "");
  parent.add_child("Domain Names",       "");
  parent.add_child("Broadband",          "");

  parent = menu.add_menu_item("Contact Us", "");
  parent.add_child("United Kingdom",        "");
  parent.add_child("France",                "");
  parent.add_child("USA",                   "");
  parent.add_child("Australia",             "");
}