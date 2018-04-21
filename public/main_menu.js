 //menu bar control
 //can not have 2 promise array with the same name
 var Promise2 = [];
 Promise2.push($.get('menu2.html',function(res){
    
    $('.menuPlace').html(res);

    $('.dropDownBtn').on('mouseenter',function(){
        $('.dropdown-menu').slideDown();
    })
    $('.dropDownBtn').on('mouseleave',function(){
      //true or false will not work
      if(	$('.dropdown-menu li:hover').length == 0)
        $('.dropdown-menu').slideUp();
    })

    $('.dropdown-menu').on('mouseleave',function(){
      if($('.dropDownBtn:hover').length == 0)
        $('.dropdown-menu').slideUp();
    })
    console.log("test $.get order");
})//end $.get
);//end promise push
$.when.apply($,Promise2).done(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $('.headBtn').show();
          $('.newBtn').show();
          $('.dropDownBtn').show();
          $('.loginBtn').hide();
          $('.signupBtn').hide();
        } else {
            $('.headBtn').hide();
            $('.newBtn').hide();
            $('.dropDownBtn').hide();
            $('.loginBtn').show();
            $('.signupBtn').show();
        }
      });
});//when

function signoutForm(){
    firebase.auth().signOut().then(function() {
      console.log("sign out sucess!");
      window.location.href="/";
    }).catch(function(error) {
      // An error happened.
    });    
}

function logoutPop(){
    $('.popLogoutBtn').trigger('click');
    console.log("link test");
}
$('.longoutLink span').trigger('click');
