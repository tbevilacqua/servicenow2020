//script to add entries into alm_hardware en masse

(function executeRule(current, previous /*null when async*/) {


//Confirm UPC code is already recorded in hardware catalogue in CMDB
var upcCounter = 0;
var catalogue = new GlideRecord('cmdb_model');
catalogue.addQuery('barcode', current.u_bulk_upc);
catalogue.query();

//counts how many CMDB models have this UPC code
while(catalogue.next()){
  upcCounter ++;

}
var catty = catalogue.cmdb_model_category;

//Only if UPC is unique do we proceed
if(upcCounter == 1) {


              var sn1to25 = [current.u_sn1,current.u_sn2,current.u_sn3,current.u_sn4,current.u_sn5,current.u_sn6,current.u_sn7,current.u_sn8,current.u_sn9,
                            current.u_sn10,current.u_sn11,current.u_sn12,current.u_sn13,current.u_sn14,current.u_sn15,current.u_sn16,current.u_sn17,current.u_sn18,current.u_sn19,
                            current.u_sn20,current.u_sn21,current.u_sn22,current.u_sn23,current.u_sn24,current.u_sn25];


              //___remove all falsy values, count how many true
              var sns = sn1to25.filter(Boolean); //https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
              var snsL = sns.length;
              var goodCount=0;


              //___loop through the sns, inserting only new records, no duplicates for what is already in alm_hardware
              for (var y = 0; y<snsL; y++){

                var currentSN = sns[y];

                    var lockDown = new GlideRecord('alm_hardware');
                    lockDown.addQuery('serial_number', currentSN);
                    lockDown.query();

                              if(lockDown.next()){

                                //1. Alert the user
                                gs.addErrorMessage("Serial number " + currentSN + " was already entered into the Asset Management Table. No duplicate created.");
                                //2. Create a log entry
                                gs.warn("Serial number " + currentSN + " was already entered into the Asset Management Table.  "+ gs.getUserName() + " was blocked from creating a duplicate entry." );
                              }

                              else{  // creates the unique records.... though lockDown.insert
                                goodCount++;
                                lockDown.initialize();
                                lockDown.serial_number=currentSN;
                                lockDown.install_status="6";
                                lockDown.u_upc=current.u_bulk_upc;
                                lockDown.stockroom=current.u_stockroom;
                                var gdt = new GlideDateTime();
                                if (catty == "81feb9c137101000deeabfc8bcbe5dc4" || "74f01164dbad8c1024f77b5b8c9619fc" || "a6a01d64dbad8c1024f77b5b8c96196e"){ //sysids for Laptop, Desktop, Computer
                                      lockDown.substatus= "pending_install"; //sysid for pending_install
                                      lockDown.depreciation ="3064390c37303000158bbfc8bcbe5dcf"; //sysid for Straight Line 3 years... SL 3years
                                      if (current.u_just_bought == true){
                                            gdt.addYearsLocalTime(3);
                                            gdt.addDaysLocalTime(-3);
                                            lockDown.depreciation_date = gdt.getValue();
                                          }
                                      else {
                                            gs.log("Warranty expiration date needed for Computer with Serial Number "+ currentSN);
                                          }
                                }
                                else {
                                  lockDown.depreciation ="0f21351437b03000158bbfc8bcbe5da8"; //sysid for Straight Line 5 years... SL 5 years
                                  if (current.u_just_bought == true){
                                      gdt.addYearsLocalTime(5);
                                      gdt.addDaysLocalTime(-3);
                                      lockDown.depreciation_date = gdt.getValue();
                                  }
                                }
                                lockDown.insert();
                              }
              }
              // Reporting results of the bulk insertion
              if (goodCount >= 1) {

                      if (goodCount==1){
                      gs.addInfoMessage("1 Asset was entered successfully");
                      }
                      if (goodCount>1){
                      gs.addInfoMessage(goodCount+" Assets were entered successfully");
                      }

                      if(gs.getUser().isMemberOf(current.u_stockroom.assignment_group.name)) {
                        gs.addInfoMessage("You may now deploy the Assets from this stockroom.");
                      }
                      else {
                        gs.addErrorMessage("You should not have badge access to the " + current.u_stockroom.name + " stock room.  You will not be able to deploy newly added assets.  Please work with a local asset manager.");
                        gs.warn(gs.getUserName()+ " is adding inventory to a stock room they don't have permissions to.");
                      }
              }
              else {
                gs.addErrorMessage("No assets were added into inventrory");
              }
      }

      // Error reporting on the cmdb_model table that prevents bul record creation:
      else {
          if(upcCounter <1){
              gs.addErrorMessage("This UPC code was not found in CMDB.  No assets have been added to inventory. Please work with the Procurement Team to ensure the hardware catalog is current.");
              gs.warn(gs.getUserName()+ " attmpted to add an unknown UPC, " + current.u_bulk_upc + " , to the " + current.u_stockroom.name + " stockroom.");
            }
          else{
            gs.addErrorMessage("Multiple hardware models (" + upcCounter + ") are currently associated with UPC code " + current.u_bulk_upc +" in CMDB.  No assets have been added to inventory. Please work with the Procurement Team to ensure barcodes are unique in the hardware catalog.");
            gs.warn("Duplicate UPC Error! Barcode ' " + current.u_bulk_upc + " ' is currently listed " + upcCounter + " times in the CMDB.");

          }
      }

})(current, previous);
