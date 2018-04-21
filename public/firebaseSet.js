var name,password,email,uid,displayName;
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
  
  //Listen to the status change,if in sign_out status, user is null
//callback func, run with window onload
var initApp = function(){
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
}
//window.onload -- all pic are loaded, which is later than document.ready()
window.onload = initApp();
