$("#verification-button").on('click',function(event){
    event.preventDefault();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.sendEmailVerification().then(function() {
            console.log("working");
          }).catch(function(error) {
              console.log(error);
          });
        } 
      });
});
