$(function(){
    $(window).bind("load", function() { 

        let options = subscription_plans()
        let product_id = options.product_id
        let vendor_id = options.vendor_id
       
        console.log(document.cookie)
        $("#subscription_plans").load("http://192.248.35.44/custom/"+product_id+"/"+vendor_id); 
         
     } )    
});