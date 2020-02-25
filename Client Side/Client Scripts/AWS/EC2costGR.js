function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

//-----Make Monthly cost Editable-----//

g_form.setReadOnly('monthly_cost_estimate',false);

//-----Create GlideRecord------------//
   var classy = g_form.getValue('sc_class_size');
   var ec2typeGR = new GlideRecord('u_use1_ec2_instance_types');    //Glide Record referencing table of all EC2 prices avaialbe in Northern Virginia as of 12/10/2019
   ec2typeGR.addQuery('u_class_and_size', classy);
   ec2typeGR.query(myFirstCallBackFunction);

//------Call Back Function--------//
   function myFirstCallBackFunction(ec2typeGR){

     var spotCheck = g_form.getValue('spot_processing');
   	 var clock = g_form.getValue('eight_by_five');
     var spot_discount = 0.5;
     while (ec2typeGR.next()){

       g_form.setValue('linux_per_hour', ec2typeGR.u_demand_hourly_linux_cost);
		 //  g_form.setReadOnly('linux_per_hour');  //---not needed
	   g_form.setValue('cpu_count', ec2typeGR.u_cpu);
       g_form.setValue('GiB', ec2typeGR.u_memory);

	var exactCost = 7.56758114;	 //variable to test decimal truncating in calculations below.  730 is the total number of hours in a calendar month. 174 is the number of business hours in a calendar month.

//------------------Math-------------------//

		 if (clock == "24x7" && spotCheck == 'ondemand' ){
         exactCost = 730*ec2typeGR.u_demand_hourly_linux_cost;
		   }

		 if (clock == "8x5" && spotCheck == 'spotinstance' ){
         exactCost = spot_discount*174*ec2typeGR.u_demand_hourly_linux_cost;
		   }

		 if (clock == "24x7" && spotCheck == 'spotinstance' ){
         exactCost = spot_discount*730*ec2typeGR.u_demand_hourly_linux_cost;
		   }

		 if (clock == "8x5" && spotCheck == 'ondemand' ){
         exactCost = 174*ec2typeGR.u_demand_hourly_linux_cost;
		   }

       g_form.setValue('monthly_cost_estimate', exactCost.toFixed(2));

//-----Return to ReadOnly from within Callback script-------//

		g_form.setReadOnly('monthly_cost_estimate',true);


     }
   }
}
