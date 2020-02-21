task.short_description = 'Configure and Deliver new device - ' + current.cat_item.getDisplayValue();
//  task.setValue('assignment_group', current.request.requested_for.location.u_default_support_group);

if (current.request.requested_for.location == "Atran"){  // sys id needed for location or will strings work?
    task.setValue('assignment_group',"Stock - IT - Atran"); //sysid 258fd848dbcb841068b5797b8c9619ed

}
else {
    if (current.request.requested_for.location == "Branford"){
        task.setValue('assignment_group',"Stock - IT - Branford"); //sysid 94efd848dbcb841068b5797b8c9619fb

    }
    else {
          if (current.request.requested_for.location == "Union Square"){
              //task.setValue('assignment_group',"Stock - IT - Union Square"); //sysid ac10e808dbcb841068b5797b8c9619ce
              task.setValue('assignment_group',"ac10e808dbcb841068b5797b8c9619ce"); 

          }
          else {
            task.setValue('assignment_group',"Stock - IT - Stamford"); //sysid a17ad048dbcb841068b5797b8c9619b9

    }
  }
}
