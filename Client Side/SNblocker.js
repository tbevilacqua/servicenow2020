function onSubmit() {

  var sns1to25 = [];
  for (var x=1; x<26; x++){
      var currentSN = "u_sn" +x;
      var currentSNvalue = g_form.getValue(currentSN);
      sns1to25.push(currentSNvalue);
  }


//___remove all falsy values
var sns = sns1to25.filter(Boolean);

function hasDuplicates(array) {
      return (new Set(array)).size !== array.length; //set (unique values) size compared to array length
}

if (hasDuplicates(sns)){
    alert('Record submission aborted due to duplicates.  Please ensure all serial numbers are properly accounted for before you can submit.');

      //Make sure dirty form still works
    g_form.submit = false;

      //Abort the submission
    return false;
   }
 else{
		return true;
	}

}
