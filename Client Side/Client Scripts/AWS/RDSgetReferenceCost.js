function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }
g_form.setReadOnly('monthly_cost_estimate',false);
g_form.getReference('sc_class_size_filtered', findPrice);

function findPrice(dbInstance){
    var exactCost = 1.9*730*dbInstance.u_demand_hourly_linux_cost;
    g_form.setValue('monthly_cost_estimate', exactCost.toFixed(2));
    g_form.setReadOnly('monthly_cost_estimate',true);

  }
}
