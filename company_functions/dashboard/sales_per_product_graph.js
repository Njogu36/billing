const sales_per_product_graph = async (sales,currency,quotes,products)=>{
let convert_to_usd_total = 0
let amount = 0
    let data = {
        labels: [],
        datasets: [{
            label: 'Total Sales Per Product - Default Currency ('+ currency+')',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: []
        }]
    }
  let products_names = await products.map((item)=>{
      return item.product_name
  });
  
  
  
  let datasets_data = Promise.all(products_names.map(async (item,index)=>{
      let get_sales = JSON.parse(sales)
      let arr =[]
      await get_sales.map((x)=>{
            if(item===x.product.product_name)
            {
              let obj = {
                  currency:x.currency,
                  total:x.total.replace(/\,/g,'')
              }
             arr.push(obj)
            }  
      })
      if(arr.length<1)
      {
          return convert_to_usd_total = 0
      }
      if(arr.length>0)
      {

      let convert_currency_to_usd = await arr.map((x)=>{
          if(x.currency === 'USD')
          {
            return parseInt(x.total)
          }
          if(x.currency !=='USD')
          {
            const quote = "USD"+x.currency
            
            Object.keys(quotes).map(function(key, index) {
                if(key === quote)
                {
                   
                    amount =parseInt((parseInt(x.total)/parseInt(quotes[key])) )
                   
                }
            }); 
          }
          return amount
      })
      convert_to_usd_total = await convert_currency_to_usd.reduce((x,y)=>{
        return x+y
       })
    //CONVERT USD AMOUNT TO DEFAULT CURRENCY
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
    return convert_to_usd_total
}
  }));
  console.log(await datasets_data)
   


  data.labels = products_names
  data.datasets[0].data = await datasets_data
  return data

}
module.exports = sales_per_product_graph