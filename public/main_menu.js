 //menu bar control
 //can not have 2 promise array with the same name
 var Promise2 = [];
 Promise2.push($.get('menu2.html',function(res){
    
    $('.menuPlace').html(res);

    $('.dropDownBtn').on('mouseenter',function(){
        $('.dropdown-menu').show();
    })
    $('.dropDownBtn').on('mouseleave',function(){
      //true or false will not work
      if(	$('.dropdown-menu li:hover').length == 0)
        $('.dropdown-menu').hide();
    })

    $('.dropdown-menu').on('mouseleave',function(){
      if($('.dropDownBtn:hover').length == 0)
        $('.dropdown-menu').hide();
    })
    console.log("test $.get order");
})//end $.get
);//end promise push
$.when.apply($,Promise2).done(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.emailVerified) {
          $('.headBtn').show();
          $('.newBtn').show();
          $('.dropDownBtn').show();
          $('.loginBtn').hide();
          $('.signupBtn').hide();
          
          var profileRef2 = firebase.database().ref('profile');
          profileRef2.on('value',function(snapshot){
            var DB2 = snapshot.child(uid).val();
            if(DB2){
                var headRef2 = firebase.storage().ref('image_profile/'+uid).child(DB2.headImg);
                headRef2.getDownloadURL().then(function(url){
                    $('.headBtn').find('img').attr('src',url);
                }).catch(function(error){
                    $('.headBtn').find('img').attr('src','upload-default.png');
                })
            }
          })
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

