function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

	//----make all field editable----//
g_form.setReadOnly('account_owner',false);
g_form.setReadOnly('account_type',false);
g_form.setReadOnly('account_phi',false);


	// ---set form values from AWS Account Owners Table via dot walk----//
g_form.getReference('account_id', setAccountVariables);

function setAccountVariables(happy){
	function firstLetter(s) {

	  return s.replace(/^.{1}/g, s[0].toUpperCase());
	}

    g_form.setValue('account_owner',  happy.u_account_owner);
	g_form.setValue('account_phi',    happy.u_phi.toUpperCase());
	g_form.setValue('account_type',   firstLetter(happy.u_account_type));



	//------set back to readonly---------------//
    g_form.setReadOnly('account_owner',true);
    g_form.setReadOnly('account_type',true);
    g_form.setReadOnly('account_phi',true);

  }
}
