$( document ).ready(function() {

    // CHANGE ROLES
    $('#payNow').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      let user = {}
      alert(recipient)
      $.get('/company/get_team_member_details/'+recipient,(data)=>{
       
          user = data.user
      })

      setTimeout(()=>{
        var modal = $(this)
        modal.find('.modal-title').text('Manage ' + user.first_name + ' '+user.last_name)
        document.getElementById("id").value = recipient
      },2000)
     
    })

    
})