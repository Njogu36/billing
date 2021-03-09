$("#discount_type").change((e)=>{
  let val = e.target.value;
  if(val==='Flat')
  {
   document.getElementById("flat").style.display = 'block'
   document.getElementById("percentage").style.display = 'none'
  }
  else if(val==='Percentage')
  {
    document.getElementById("flat").style.display = 'none'
    document.getElementById("percentage").style.display = 'block'
  }
})