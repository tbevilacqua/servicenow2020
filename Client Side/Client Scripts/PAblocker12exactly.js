function onSubmit() {

  var kits1to6 = [];
  var kitsLength =[];
  var kitsLengthSum = 0;

  for (var x=1; x<11; x++){
      var currentKit = "kit" +x;
      var currentKitValue = g_form.getValue(currentKit);
      kits1to6.push(currentKitValue);
      kitsLength.push(currentKitValue.length);
      kitsLengthSum += currentKitValue.length;
  }


//___remove all falsy values
var kits = kits1to6.filter(Boolean);
var kitsL = kitsLength.filter(Boolean);


// function tests - Data validation
function dozen(array,sum){
      return ((sum/array.length) != 12) || ((new Set(array)).size !=1); //  Average must be 12 and all kit lengths must equal each other (all must be 12)
}

function hasDuplicates(array) {
      return (new Set(array)).size !== array.length; //set (unique values) size compared to array length
}





if (hasDuplicates(kits)){
    alert('Record submission aborted due to duplicates.  Please ensure all kits are properly accounted for');

      //Make sure dirty form still works
    g_form.submit = false;

      //Abort the submission
    return false;
   }
 else{
      if (dozen(kitsL,kitsLengthSum)){
        alert('Record submission aborted due to one or more kit numbers having wrong number of characters.  Please ensure all kit numbers are correct.');

          //Make sure dirty form still works
        g_form.submit = false;

          //Abort the submission
        return false;
      }
      else{

            return true;
	       }

  }
}
