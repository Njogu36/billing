const mongojs = require("mongojs");
const add_subscription_plan = (req, res) => {
  const db_name = req.user.db_name;
  const db = mongojs("mongodb://localhost/" + db_name);
  const Subscription = db.collection("subscriptions");
  const path = "/subscription_icons/";
  const {
    plan_name,
    checkout_message,
    billing_interval,
    every,
    period,
    trial_period,
    quantity,
    price,
    currency,
    price_currency,
    default_currency,
  } = req.body;
  Subscription.findOne({ plan_name: plan_name }, (err, sub) => {
    if (sub) {
      req.flash("danger", "Subscription already exists.");
      res.redirect("/company/subscription_plans");
    } else {
      let array = [];
      let obj ={}
      if (Array.isArray(currency) === true) {
        
          currency.map((item)=>{
              price_currency.map((x)=>{
                
                  let xCurrency = x.split(" ");
                 
                  if(item===xCurrency[0])
                  {
                  if(xCurrency[0]===default_currency)
                  {
                    obj = {
                        currency:xCurrency[0],
                        default:true,
                        amount:xCurrency[1]
                    }
                  }
                  else
                  {
                    obj = {
                        currency:xCurrency[0],
                        default:false,
                        amount:xCurrency[1]
                    }
                  }
                }
                 
              })
              array.push(obj)
          })
      } else if (Array.isArray(currency) === false) {
        
        price_currency.map((x) => {
          let xCurrency = x.split(" ");
          if(xCurrency[0]===currency)
          {
              if(currency===default_currency)
              {
                obj = {
                    currency:xCurrency[0],
                    default:true,
                    amount:xCurrency[1]
                }
              }
              else
              {
                obj = {
                    currency:xCurrency[0],
                    default:false,
                    amount:xCurrency[1]
                }
              }
          }  
        });
        array.push(obj)

      }
      
       setTimeout(()=>{
          
       let data = {}
       data.plan_name = plan_name;
       if(req.file === undefined)
       {
            data.icon ='/assets/images/icon.png'
       }
       else if(req.file !== undefined)
       {
           data.icon = path+req.file.filename
       }
       data.checkout_message = checkout_message;
       if(billing_interval!=='')
       {
        data.billing_interval = billing_interval
       }
       else if(billing_interval ==='')
       {
        data.billing_interval = ''
       }
       if(billing_interval==='Custom')
       {
           data.every = every
           data.period = period
       }
       else if(billing_interval !=='Custom')
       {
           data.every = 0;
           data.period = ""
       }
      
        data.trial_period = trial_period;
       
       
      
       data.enabled_quantity = quantity
       data.quantity = 1
       data.currencies = array
       data.created_on = new Date()
       Subscription.save(data,()=>{
        req.flash("info", "Subscription saved successfully.");
        res.redirect("/company/subscription_plans");
       })
      },2500)
    }
  });
};

module.exports = {
  add_subscription_plan: add_subscription_plan,
};
