var name,password,email,uid,displayName;

//modal function
function modalBtn(){
    console.log("modal btn working");
    window.location = "/";
}
//listen for empty input
$('#name').on('focus',function(e){
    $(this).parent().find('.glyphicon').remove();
    $(this).parent().removeClass('has-error');
})
$('#pwd').on('focus',function(e){
    $(this).parent().find('.glyphicon').remove();
    $(this).parent().removeClass('has-error');
})
//submit form
function submitForm(){
    //get values
    name =  $("#name").val();
    pwd = $("#pwd").val();
    //hide alert
    $('.alertErr').hide();
    console.log("name :"+name);

    firebase.auth().createUserWithEmailAndPassword(name,pwd).then(function(user){
        console.log("sucess signup!");
        $('.popBtn').trigger('click');

    }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode+errorMessage);

       if(errorMessage.indexOf("address")!=-1){
        $('.inEmail').addClass('has-error');
        $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').appendTo($('.inEmail'));
        }
        if(errorMessage.toLocaleLowerCase().indexOf("password")!=-1){
            $('.inPwd').addClass('has-error');
            $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>').appendTo($('.inPwd'));
        }
    
       $('#alertWord').text(errorMessage);
       $('.alertErr').show();
      });
}
function validateForm(){
    //get values
    name =  $("#name").val();
    pwd = $("#pwd").val();
    //hide alert
    $('.alertErr').hide();
    console.log("name :"+name);

    firebase.auth().signInWithEmailAndPassword(name, pwd).then(function(user){
        console.log("sucess login!"+user.email);
        $('.popBtn').trigger('click');
    }).catch(function(error){
         // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode+errorMessage);
          $('#alertWord').text(errorMessage);
          $('.alertErr').show();
    });

}

//save users to firebase
function saveUsers(name,password){
    var newUserRef = userRef.push();
    newUserRef.set({
        name:name,
        password:password
    });
}

