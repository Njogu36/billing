$(function(){
   
        let options = subscription_plans()
        let product_id = options.product_id;
        let vendor_id = options.vendor_id;
        let quantity =options.quantity
        let email = options.email
        
       $("#subscription_plans").load("https://2b2cdb813ab7.ngrok.io/custom/"+product_id+"/"+vendor_id+"/"+quantity+'/'+email); 
       
});