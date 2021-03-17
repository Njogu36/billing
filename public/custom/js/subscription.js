$(function(){
   
        let options = subscription_plans()
        let product_id = options.product_id;
        let vendor_id = options.vendor_id;
        let quantity =options.quantity
        let email = options.email
        
       $("#subscription_plans").load("http://localhost:8000/custom/"+product_id+"/"+vendor_id+"/"+quantity+'/'+email); 
       
});