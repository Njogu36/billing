document.getElementById("type").addEventListener("change",(e)=>{
    let val = e.target.value;
    if(val==='')
    {
        document.getElementById('limited').style.display ='none'
    }
    else if(val==='Limited')
    {
     document.getElementById('limited').style.display ='block'
    }
    else if(val === 'Unlimited')
    {
        document.getElementById('limited').style.display ='none'
    }

})