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
    firebase.auth().createUserWithEmailAndPassword(name,pwd).then(function(user){
        console.log("sucess signup!waiting for email verifying....");
        //sending email, callback func
        sendEmailVer();
    
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
        console.log("sucess login! "+user.email);
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

function sendEmailVer(){
    var actionCodeSettings = {
    url: 'http://localhost:3000/?email=' + firebase.auth().currentUser.email
  };
    firebase.auth().currentUser.sendEmailVerification(actionCodeSettings).then(function() {//callback func
    //without preventDefault, send will reload the whole page
        console.log("email is sent to user");
        $('.staticBtn').trigger('click');
    }).catch(function(error) {
        console.log(error.message);
    });
}


