(function executeRule(current, previous /*null when async*/) {

	//businessRule for insertion

var kits1to10 = [current.kit1,current.kit2,current.kit3,current.kit4,current.kit5,current.kit6,current.kit7,current.kit8,current.kit9,current.kit10];


//___remove all falsy values, count how many true
var kits = kits1to10.filter(Boolean); //https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
var kitsL = kits.length;
var goodCount=0;

var trunc = current.fedex_input.toString();

      //RE:Splice.....See FedEx guidlines on Barcode formatting http://pages.message.fedex.com/barcodescan_home/
      if (trunc.length==32){
        trunc = trunc.slice(16,28);
      }

      if (trunc.length==34){
        trunc = trunc.slice(-14);
      }

//___loop through the kits, inserting only new records, no duplicates
for (var y = 0; y<kitsL; y++){

  var currentKit = kits[y];

      var lockDown = new GlideRecord('x_s4_lab_logistics_table');
      lockDown.addQuery('kitno', currentKit);
      lockDown.query();

                if(lockDown.next()){
                  //1. Mark as Invalid;
                  current.invalidentry = true;
                  //2. Alert the user
                  gs.addErrorMessage("Kit number " + currentKit + " was already entered into master logisitcs table. No duplicate created.");
                  //3. Create a log invalidentry
                  gs.warn("Kit number " + currentKit + " was already entered into master logisitcs table.  "+ gs.getUserName() + " was blocked from creating a duplicate entry." );
                }

                else{
                  lockDown.initialize();
                  lockDown.kitno=currentKit;
                  lockDown.full_barcode=current.fedex_input;
                  lockDown.fedex=trunc;
                  lockDown.insert();
                  goodCount++;
                  //eval('gs.addInfoMessage("Kit number "kits['+y+']" inserted successfully");');

                }
}

if (goodCount==1){
gs.addInfoMessage("1 kit was entered successfully");
}
if (goodCount>1){
gs.addInfoMessage(goodCount+" kits were entered successfully");
}


})(current, previous);
