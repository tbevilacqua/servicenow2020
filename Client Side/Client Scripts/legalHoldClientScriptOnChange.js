function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;
   }//Client script on change to set Legal hold to true when member of the group

		var litigationPerson = g_form.getValue('assigned_to');
		// var legalAlert = 'litigationPerson' + ' is on Legal Hold!  Please follow protocol to preserve data.';

		var lockDown = new GlideRecord('sys_user_grmember');

			lockDown.addQuery('group', '102f4289db644c1024f77b5b8c9619e4');
      lockDown.addQuery('user', litigationPerson);
			lockDown.query();
		    if(lockDown.next()){

			g_form.setValue('u_legal_hold', true);
			alert(g_form.getDisplayBox('assigned_to').value+" is on Legal Hold! Please follow protocol to preserve data.");

		}

	}
