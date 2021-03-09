 
      document.getElementById("billing_interval").addEventListener("change",(e)=>{
        if(e.target.value==='Custom')
        {
          document.getElementById("custom").style.display = "block"

        }
        else 
        {
          document.getElementById("custom").style.display = "none"
        }
      })