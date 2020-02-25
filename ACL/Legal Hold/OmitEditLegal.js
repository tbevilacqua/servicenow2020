//Script to restrict access to groups via List Control.  Table is sys_user_group

// https://sema4genomicsdev.service-now.com/nav_to.do?uri=sys_ui_list_control.do?sys_id=19393940eb11010060bbafcef106fed9

var answer = true; //Restrict access by default

// Variables required for simple match
var legalHoldSysID = "102f4289db644c1024f77b5b8c9619e4";
var restrictedGroupTypeSysID ="5f9647a0db1d845068b5797b8c96195b";

//Variables required to account for multiple group type assignments
var allGroupTypes = current.group.type; //sys id(s) of all group typess
var checkRestricted = allGroupTypes.match(/5f9647a0db1d845068b5797b8c96195b/g);  // sheds all other group types,


//Update to factor for multiple types per group
if(checkRestricted != restrictedGroupTypeSysID && (gs.hasRole('user_admin') || current.group.manager == gs.getUserID())){
   answer = false; //Allow access if user has 'user_admin' role or is group manager, but not for Legal Hold
}

//First Restricted Group, Legal Hold
if(current.group == legalHoldSysID && (gs.hasRole('legalHold'))){
      answer = false; //Allow access to Legal Hold if user has legalHoldTestRole role or is group manager only.

}

//Second Restricted Group
