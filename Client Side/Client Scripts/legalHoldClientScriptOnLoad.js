function onLoad() {

var litigationPerson = g_form.getValue('assigned_to');

var lockDown = new GlideRecord('sys_user_grmember');

			lockDown.addQuery('group', '102f4289db644c1024f77b5b8c9619e4'); // sys id of "Legal Hold"
			lockDown.addQuery('user', litigationPerson);
			lockDown.query();

				if(lockDown.next()){

							g_form.setValue('u_legal_hold', true);
							alert(g_form.getDisplayBox('assigned_to').value+' is on Legal Hold!  Please follow protocol to preserve data.');


				}
				else {
							g_form.setValue('u_legal_hold', false);
				}
}
