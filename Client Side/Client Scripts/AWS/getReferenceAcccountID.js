function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
g_form.setReadOnly('account_owner',false);
g_form.setReadOnly('account_type',false);
g_form.setReadOnly('phi',false);

g_form.getReference('account_id', setAccountVariables);

function setAccountVariables(happy){

    g_form.setValue('account_owner',  happy.u_account_owner);
    g_form.setValue('account_type',   happy.u_account_type );
    g_form.setValue('phi',            happy.u_phi  );

    g_form.setReadOnly('account_owner',true);
    g_form.setReadOnly('account_type',true);
    g_form.setReadOnly('phi',true);

  }
}
