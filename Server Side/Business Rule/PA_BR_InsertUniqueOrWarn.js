(function executeRule(current, previous /*null when async*/) {

	//businessRule for insertion

var kits1to6 = [current.kit1,current.kit2,current.kit3,current.kit4,current.kit5,current.kit6];


//___remove all falsy values, count how many true
var kits = kits1to6.filter(Boolean); //https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
var kitsL = kits.length;

//___loop through the kits, inserting only new records, no duplicates
for (var y = 0; y<kitsL; y++){

  var currentKit = kits[y];

      var lockDown = new GlideRecord('x_s4_lab_logistics_table');
      lockDown.addQuery('kitno', currentKit);
      lockDown.query();

                if(lockDown.next()){
                  //1. Create console.error(); or error console.log();
                  current.invalidentry = true;
                  //2. Alert message
                  gs.warn("Kit number " + currentKit + " was already entered into master logisitcs table. No duplicate created.");
                  gs.addErrorMessage("Kit number " + currentKit + " was already entered into master logisitcs table.  "
                  + gs.getUserName() + " was blocked from creating a duplicate entry." );
                }
                else{
                  lockDown.initialize();
                  lockDown.kitno=currentKit;
                  lockDown.fedex=current.fedex_input;
                  lockDown.insert();
                  gs.addInfoMessage("Kit number " + currentKit + " was entered successfully");
                  //eval('gs.addInfoMessage("Kit number "kits['+y+']" inserted successfully");');

                }
}


})(current, previous);
