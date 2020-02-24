(function executeRule(current, previous /*null when async*/) {



	var litigationPerson = current.assigned_to;

	var lockDown = new GlideRecord('sys_user_grmember');

				lockDown.addQuery('group', '102f4289db644c1024f77b5b8c9619e4'); // sys id of "Legal Hold"
				lockDown.addQuery('user', litigationPerson);
				lockDown.query();

					if(lockDown.next()){

							gs.warn(gs.getUserName() + " has accessed the hardware records of " + current.assigned_to.name + "who is on legal hold.");

	}

})(current, previous);
