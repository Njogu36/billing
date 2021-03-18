const total_sales_graph = async (sales,currency,quotes)=>{
    
   let arr = [];
  
   let convert_to_usd_total = 0
   let data = {
    labels: [],
    datasets: [{
        label: 'Total Sales - Default Currency ('+ currency+')',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: []
    }]
   }
   let i;
   const date = new Date();
   date.setDate(1);
   for(i=0; i<=11; i++) {
       let att_ = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2)
       arr.unshift(att_)
       
       date.setMonth(date.getMonth() - 1);
    }

    // PER MONTH
   let datasets_data= Promise.all(arr.map(async (item,index)=>{
       const filterSalesPerMonth = await JSON.parse(sales).filter((x)=>{
           return x.year_month === item
       })
       if(filterSalesPerMonth.length > 0)
       {
           const get_amount_currency = await filterSalesPerMonth.map((y)=>{
               return {currency:y.currency,total:parseInt(y.total.replace(/\,/g,''))}
           })
           
           const convert_currency_to_usd = await get_amount_currency.map((y)=>{
               if(y.currency==='USD')
               {
                return parseInt(y.total)
               }
               if(y.currency !=='USD')
               {
                const quote = "USD"+y.currency
                let amount = 0
                Object.keys(quotes).map(function(key, index) {
                    if(key === quote)
                    {
                       
                        amount =parseInt((parseInt(y.total)/parseInt(quotes[key])) )
                       
                    }
                }); 
                return amount

               }
           })

           convert_to_usd_total = await convert_currency_to_usd.reduce((x,y)=>{
               return x+y
           })
         
           // CONVERT USD AMOUNT TO DEFAULT CURRENCY
           if(currency !=='USD')
           {
               const quote = "USD"+currency;
               Object.keys(quotes).map(function(key, index) {
                if(key === quote)
                {
                   convert_to_usd_total = (parseInt(convert_to_usd_total)*parseInt(quotes[key])) 
                }
            }); 
           }

       }
     
       return convert_to_usd_total
    }))

  
    data.labels = arr
    data.datasets[0].data = await datasets_data
    return data
}
module.exports = total_sales_graph