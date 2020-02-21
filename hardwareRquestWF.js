task.short_description = 'Configure and Deliver new device - ' + current.cat_item.getDisplayValue();
//old //  task.setValue('assignment_group', current.request.requested_for.location.u_default_support_group);

//new//

//Atran
if (current.request.requested_for.location == "d6cf0b19db54d300c5215878dc9619e3"){
    task.setValue('assignment_group',"258fd848dbcb841068b5797b8c9619ed"); // Stock - IT - Atran sysid

}
else {
//Branford
    if (current.request.requested_for.location == "1542a025db18d300c5215878dc9619b3"){
        task.setValue('assignment_group',"94efd848dbcb841068b5797b8c9619fb"); //    Stock - IT - Branford sysid

    }
    else {
//Union Square
          if (current.request.requested_for.location == "5483d233db4ac34024f77b5b8c96194d"){
            task.setValue('assignment_group',"ac10e808dbcb841068b5797b8c9619ce"); //    Stock - IT - Union Square sysid

          }
          else {
//Stamford & Remote
            task.setValue('assignment_group',"a17ad048dbcb841068b5797b8c9619b9");  //    Stock - IT - Stamford sysid

    }
  }
}
