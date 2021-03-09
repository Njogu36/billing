document.getElementById("price").addEventListener('change',()=>{
    
    const priceList = document.getElementsByName("price_currency")
    const price = document.getElementById("price").value 

    priceList.forEach((item,index)=>{
        let currency = item.value.split(" ")

        $.get("http://api.currencylayer.com/live?access_key=524e16193a1c2e03f65e4dadab226a8f",(response)=>{
            console.log(response.quotes)
            let myObject = response.quotes;
            let quote = "USD"+currency[0]

            function formatDollar(num) {
                var p = num.toFixed(2).split(".");
                return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
                    return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
                }, "") + "." + p[1];
            }
            
            Object.keys(myObject).map(function(key, index) {
            if(key === quote)
            {
                item.value = currency[0] + ' ' + formatDollar(parseFloat((myObject[key]*price)))
            }
            });

        })
 
    })

})
   