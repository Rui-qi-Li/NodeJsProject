 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC42rK-jJ_B8qDKsyKEIqt7W_7v91BI6Ak",
    authDomain: "test-649ca.firebaseapp.com",
    databaseURL: "https://test-649ca.firebaseio.com",
    projectId: "test-649ca",
    storageBucket: "test-649ca.appspot.com",
    messagingSenderId: "361971917680"
  };
  firebase.initializeApp(config);


//reference messages collection
//var userRef = firebase.database().ref('users');
//set hint 
var name_hint = document.getElementById('name_hint');
if(name_hint) name_hint.style.backgroundColor = 'red';
var pass_hint = document.getElementById('pass_hint');
if(pass_hint) pass_hint.style.backgroundColor = 'red';

var name,password,email,uid,displayName;

//submit form
function submitForm(){
    //e.preventDefault();
    pass_hint.innerHTML = "";
    name_hint.innerHTML = "";
    //get values
    name =  document.getElementById("name").value;
    password = document.getElementById("pwd").value;

    //saveUsers(name,password);
    //window.location.href = "./home.html";
    console.log("you have submitted");
    
    firebase.auth().createUserWithEmailAndPassword(name,password).then(function(user){
        pass_hint.innerHTML = "sucess signup!";
       
        setTimeout(function(){
            window.location = "/";
        },2000);

    }).catch(function(error) {
         // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          pass_hint.innerHTML = 'The password is too weak.';
        } else if (errorCode == 'auth/email-already-in-use') {
          name_hint.innerHTML = 'The email adress is existed.';
        }
        else{
            pass_hint.innerHTML = errorMessage;
        }
        console.log(error);
        // [END_EXCLUDE]
      });
}
function validateForm(){
    pass_hint.innerHTML = "";
    name_hint.innerHTML = "";
    //get values
    name =  document.getElementById("name").value;
    password = document.getElementById("pwd").value;

    firebase.auth().signInWithEmailAndPassword(name, password).then(function(user){
        pass_hint.innerHTML = "sucess login!";
        console.log(user.email);
         setTimeout(function(){
            window.location = "/";
        },2000);
    }).catch(function(error){
         // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            pass_hint.innerHTML = "Wrong password.";

          } else if (errorCode ==='auth/user-not-found'){
            name_hint.innerHTML = "the account isn't existed";
          }
          else{
            pass_hint.innerHTML = errorMessage;
          }
    });

}

function signoutForm(){
    firebase.auth().signOut().then(function() {
      console.log("sign out sucess!");
    }).catch(function(error) {
      // An error happened.
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


//Listen to the status change
//if in sign_out status, user is null
firebase.auth().onAuthStateChanged(function(user){
        if(user){
            email = user.email;
            uid = user.uid;
            displayName = user.displayName;
            console.log("sign in status."+email);
            console.log(user);
        }
        else
            console.log("sign out status.")
    });

