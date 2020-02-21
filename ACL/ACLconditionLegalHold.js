var answer = false; //Restrict access by default
var legalHoldSysID = "102f4289db644c1024f77b5b8c9619e4";

if(current.group != legalHoldSysID && (gs.hasRole('user_admin') || current.group.manager == gs.getUserID())){
   answer = true; //Allow access if user has 'user_admin' role or is group manager, but not for Legal Hold
}
if(current.group == legalHoldSysID && (gs.hasRole('legalHoldTestRole') || current.group.manager == gs.getUserID())){
      answer = true; //Allow access to Legal Hold if user has legalHoldTestRole role or is group manager only.

}
