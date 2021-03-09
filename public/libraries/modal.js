$( document ).ready(function() {

    // CHANGE ROLES
    $('#changeRoles').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) 
      var recipient = button.data('whatever') 
      let user = {}
      $.get('/company/get_team_member_details/'+recipient,(data)=>{
       
          user = data.user
      })

      setTimeout(()=>{
        var modal = $(this)
        modal.find('.modal-title').text('Manage ' + user.first_name + ' '+user.last_name)
        document.getElementById("id").value = recipient
      },2000)
     
    })

    // ADD NEW FEATURE
    $('#add_new_feature').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) 
        var recipient = button.data('whatever') 
        var string = recipient.split("#")
        var id = string[0];
        var no = string[1]
        console.log(id)
        console.log(no)
        let plan = {}
        $.get('/company/get_plan_details/'+id+'/'+no,(data)=>{
            plan = data.plan
        })
        setTimeout(()=>{
          var modal = $(this)
          modal.find('.modal-title').text('Add new feature | ' +plan.plan_name)
          document.getElementById("no").value = parseInt(no)
        },2000)
      })
})