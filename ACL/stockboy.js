var answer = true;

  if (current.install_status == "6"){   //value for "In stock"

	answer = false;

    if(gs.getUser().isMemberOf(current.stockroom.assignment_group.name)){

     answer = true;
   }

 }
