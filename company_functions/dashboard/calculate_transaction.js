const calculate_transactions =  async (transactions,currency,quotes)=>{
    let total = 0;
 
    let data = await JSON.parse(transactions).map((item)=>{
        let amount =item.total.replace(/\,/g,'');
        let quote = "USD"+item.currency
        let converted = 0
  
        if(item.currency !== 'USD')
        {
            Object.keys(quotes).map(function(key, index) {

                if(key === quote)
                {
                   converted += (parseInt(amount)/parseInt(quotes[key])) 
                }
            }); 
        }
        if(item.currency ==='USD')
        {
            Object.keys(quotes).map(function(key, index) {

                if(key === quote)
                {
                   
                    converted += (parseInt(amount)*parseInt(quotes[key])) 
                }
            }); 
        }
        return parseInt(converted)
       
    })

    total = await data.reduce((x,y)=>{
        return x+y
    })
  
    if(currency !=='USD')
    {
       let quote = "USD"+currency
      Object.keys(quotes).map(function(key, index) {
            if(key === quote)
            {
                total = (parseInt(total)*parseInt(quotes[key])) 
            }
        });
       
    }


    function formatDollar(num) {
        var p = num.toFixed(2).split(".");
        return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
    }
  
     return formatDollar(parseInt(total))
}

module.exports = calculate_transactions      
