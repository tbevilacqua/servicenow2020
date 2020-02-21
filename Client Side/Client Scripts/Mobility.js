function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }

	if (newValue == '3629b101db7a401068b5797b8c961909'){ //sys_id of Smartphones and tablets

//serial vs IMEI
  g_form.showFieldMsg("serial_number","Please Enter IMEI number above.");
  g_form.setMandatory('serial_number', true);
  g_form.setMandatory('asset_tag',false);


  g_form.showFieldMsg("invoice_number","Please Enter the Telecom order # above.");
  g_form.setMandatory('invoice_number', true);

  g_form.setMandatory('vendor',true);
  g_form.showFieldMsg("vendor","Please Select the Telecom Vendor");

  g_form.setMandatory('assigned_to',true);

  g_form.showFieldMsg('purchase_date',"Please enter the 'Date of Service' above.");
  g_form.setMandatory('purchase_date',true);

  g_form.setMandatory('u_mobile_no',true);
  g_form.setVisible('u_mobile_no',true);

  g_form.setMandatory('u_sim',true);

  }
  else {
    g_form.setVisible
    g_form.setVisible
  }
}
