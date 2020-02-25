function passVariablesToDescription(){

// SCRIPT to COPY ALL VARIABLES from RITM into DESCRIPTION  as part of service catalog workflow
// Script inspired by timmo on https://community.servicenow.com/community?id=community_question&sys_id=34e54f21db1cdbc01dcaf3231f961906
// and Aaron on https://community.servicenow.com/community?id=community_question&sys_id=abacee49db9ce3082be0a851ca961927

var items = 'glide record failed to pass description'; //for debugging
var dpv = 'glide record failled to pass short description'; //for debugging

var gr = new GlideRecord("sc_req_item");
gr.addQuery("request", current.request.sys_id);
gr.query();

		while(gr.next()) {

			// Get Owned Variables for Requested Item and sort by Order

			var ownvar = new GlideRecord('sc_item_option_mtom');

			ownvar.addQuery('request_item.number', gr.number);

			//Attempt to Exclude empty variables, breaks, and containers
			ownvar.addQuery('sc_item_option.value','!=','');
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','11'); // Labels
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','12'); // Breaks
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','13'); // not listed?
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','14'); // Macro
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','15'); // UI page
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','17'); // Macro with Labels
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','19'); // Container Start
			ownvar.addQuery('sc_item_option.item_option_new.type','!=','20'); // Container End
			ownvar.orderBy('sc_item_option.order');

			ownvar.query();

			dpv = gr.cat_item.getDisplayValue();
			items = '';


			while(ownvar.next()) {

						var field = ownvar.sc_item_option.item_option_new;
						var fieldValue = ownvar.sc_item_option.item_option_new.name;
						//Array of invalid variables types
						var invalidTypesOfVariables = [11,12,13,14,15,17,19,20];
						var noob = ownvar.sc_item_option.item_option_new.type;

			// Copy variable Display Value unless undefined (invalid)


						if ( invalidTypesOfVariables.indexOf(noob) == -1 ) {  //This conditional statement works in Chrome developer console, but not server side in ServiceNow?
							half = gr.variables[fieldValue].getDisplayValue();  //creates an error in workflow "undefined value" id the type is invalid
						}
						else {
							half = "undefined variable type " + noob;  // Just to identify the variable type for now
						}

			items += field.getDisplayValue() + " : " + half + "\n";

			}

		}

task.short_description = dpv;
task.description = items;
}
