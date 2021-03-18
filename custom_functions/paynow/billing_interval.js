const moment = require('moment')
const billing_interval = (plan,today) => {
  const billing_interval = plan.billing_interval;
  const period = plan.period
  const every = plan.every

  let expiry_date = today;
  moment(expiry_date);

  if (billing_interval === "Daily") {
    expiry_date = moment().add(1, 'days').format("YYYY-MM-DD");
  } else if (billing_interval === "Monthly") {
    expiry_date = moment().add(30, 'days').format("YYYY-MM-DD");
  } else if (billing_interval === "3 Months") {
    expiry_date = moment().add(90, 'days').format("YYYY-MM-DD");
  } else if (billing_interval === "6 Months") {
    expiry_date = moment().add(120, 'days').format("YYYY-MM-DD");
  } else if (billing_interval === "Yearly") {
    expiry_date = moment().add(365, 'days').format("YYYY-MM-DD");
  } else if (billing_interval === "Custom") {
        let day = 0
        if(period === 'Days')
        {
            day = parseInt(every) 
        }
        else if(period==='Weeks')
        {
            day =parseInt(every)*7

        }
        else if(period==='Months')
        {
          day = parseInt(every)*30
        }
        else if(period==='Years')
        {
            day = parseInt(every)*365
        }
        expiry_date = moment().add(day, 'days').format("YYYY-MM-DD");
  }
  return expiry_date;
};
module.exports = {
  billing_interval: billing_interval,
};
