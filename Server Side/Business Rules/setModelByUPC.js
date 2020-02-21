// Business Rule to update alm_hardware using a function to query model details from CMDB and return an object
//Test data UPC 741852963 for Dell Inc. 7390

(function executeRule(current, previous /*null when async*/) {   // start for Business Rule


			function returnModel(upc) {

					var modelGR = new GlideRecord('cmdb_model');
					modelGR.get('barcode', upc);

					return {
						"typ":modelGR.cmdb_model_category //sys_id of category
						,"typ_DV":modelGR.cmdb_model_category.getDisplayValue()
						,"co":modelGR.manufacturer  //sys_id of manufacturer
						,"co_DV":modelGR.manufacturer.getDisplayValue()
						,"display_name":modelGR.display_name //string, but calculated value
						,"name":modelGR.name   // Key Value! see below
						,"zip":modelGR.manufacturer.zip  //string, dot walked
						,"unique":modelGR.getUniqueValue() // sy_id of the product model record

					};
				}

var modelObject = returnModel(current.u_upc);	// function to return an object with any characteristic of the model as needed.


//-- Uses object properties with plain text as confirmation of values, if needed
				current.comments = "The hardware details of this " + modelObject.display_name + " are populated by the UPC code " + current.u_upc + ".";
//					+"The zip code of manufacturer is " + modelObject.zip + "\n"
//					+ "The manufacturer is " + modelObject.co_DV + "\n"
//					+ "The model of " + modelObject.typ_DV + " is " + modelObject.name + "\n"
//					+ "The display value is set to manufacture and model, which is " + modelObject.display_name;


//__________easy ones
current.model_category = modelObject.typ; //  Set the category
current.display_name = modelObject.display_name; // Set the display name


//__________key to the kingdom
current.model = modelObject.name; //  -  most confusing line of code, because the model IS the name in cmdb_model, but value not displayed in alm_asset?


//__________get Reference Record to assign field values for items that are "secretly" dot walked values....
var ref = current.model.getRefRecord();
	ref.name = modelObject.name; // funny little loop back that works
	ref.manufacturer = modelObject.co;  // Set the Manufacturer name
	ref.update();


})(current, previous);  // close for Business Rule
