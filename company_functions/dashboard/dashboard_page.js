const mongojs = require('mongojs');
const fetch = require('node-fetch')

// FUNCTIONS
const calculate_transactions = require('./calculate_transaction')
const calculate_sales = require('./calculate_sales')
const total_sales_graph = require('./total_sales_graph');
const sales_per_product_graph = require('./sales_per_product_graph')

const dashboard_page = async (req,res)=>{
    const db_name = req.user.db_name;
    const db = mongojs("mongodb://localhost/"+db_name);
    const Transaction = db.collection("transactions");
    const Subscriber =db.collection("subscribers");
    const Product = db.collection("products")
    const Subscriptions = db.collection("subscriptions")
    const Coupon = db.collection("coupons")
    const Currency = db.collection("currencies")
  
    const response =  await fetch("http://api.currencylayer.com/live?access_key=67d21d925539eb8a4cd95a6d4d7484a8")
    const data = await response.json()
    const quotes = data.quotes
    

    Transaction.find({},(err,transactions)=>{
     Transaction.find({status:"Paid"},(err,sales)=>{
        Subscriber.find({},(err,subscribers)=>{
            Product.find({},(err,products)=>{
                Subscriptions.find({},(err,subscriptions)=>{
                    Coupon.find({},(err,coupons)=>{
                        Currency.findOne({},async (err,currency)=>{
                            if(currency)
                            {
                                
                                const calculate_transactions_ = await calculate_transactions(JSON.stringify(transactions),currency.name,quotes)
                                const calculate_sales_ = await calculate_sales(JSON.stringify(sales),currency.name,quotes)
                                const total_sales_graph_ = await total_sales_graph(JSON.stringify(sales),currency.name,quotes)
                                const sales_per_product_graph_ = await sales_per_product_graph(JSON.stringify(sales),currency.name,quotes,products)
                                
                                  res.render('./company/dashboard/dashboard.jade',{
                                        user:req.user,
                                        transactions:transactions,
                                        subscribers:subscribers,
                                        subscriptions:subscriptions,
                                        calculate_transactions:calculate_transactions_,
                                        calculate_sales:calculate_sales_,
                                        sales_per_product_graph:JSON.stringify(sales_per_product_graph_),
                                        total_sales_graph:JSON.stringify(total_sales_graph_),
                                        products:products,
                                        coupons:coupons,
                                        currency:currency
                                    })
                             
                                
                            }
                            else
                            {
                                 res.render('./company/dashboard/dashboard.jade',{
                                    user:req.user,
                                    transactions:transactions,
                                    subscribers:subscribers,
                                    subscriptions:subscriptions,
                                    products:products,
                                    calculate_transactions:0,
                                    calculate_sales:0,
                                    total_sales_graph:{},
                                    sales_per_product_graph:{},
                                    coupons:coupons,
                                    currency:"Nill"
                                })
                            }
                            
                        })
                        
                    })
                    
                })
            })
        })
             
        })
    })
  
}
module.exports = {
    dashboard_page:dashboard_page
}