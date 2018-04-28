// Get a reference to the database/storage service, which is used to create references in your database/storage bucket
var profileRef,storageRef2,headRef;
var headImg,titleName,titleEmail,titleURL,titleAbout;
//profile file 
var headFile;

$('#save-button').on('click',function(e){
    e.preventDefault();
    saveProfile();
});

var showDefault = function(){
    //have to show before "click", need onAuthStateChanged running defaultly
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          titleEmail = user.email;
       $('#email').val(titleEmail);
      } 
    });
   
  }
var saveProfile = function(){
    headImg = $('.photo-label').text();
    titleName = $('#username').val();
    titleEmail = $('#email').val();
    titleURL = $('#url').val();
    titleAbout = $('#aboutme').val();
    console.log(uid+" : "+headImg+" , "+titleName+" , "+titleEmail+" , "+titleURL+" , "+titleAbout);
    //reference to login user's database abd storage
    //it is set after "click", so can accesse uid in windows.onload callback func
    profileRef = firebase.database().ref('profile/'+uid);
    storageRef2 = firebase.storage().ref('image_profile/'+uid);
    updateProfile(headImg,titleName,titleEmail,titleURL,titleAbout);
}

function updateProfile(headImg,titleName,titleEmail,titleURL,titleAbout){
    //user only has one profile info, override it
    profileRef.set({
        headImg:headImg,
        titleName:titleName,
        titleEmail:titleEmail,
        titleURL:titleURL,
        titleAbout:titleAbout
    });
    //it's OK to save all the head img, but only show the match one
    headRef = storageRef2.child(headImg);   
    headFile =  $('#upload-photo').get(0).files[0];
    //preview img existed
    if(headFile){
        //storage won't save two pic in same name, avoid overlap
        headRef.put(headFile).then(function(snapshot){
            console.log(snapshot.downloadURL);
        }).catch(function(error){
        console.log(error);
        });//put
        alert("profile image has been saved! ");
    }
    else{
        console.log("no profile img will update in storage");
    }
    $('.confirmBtn').trigger('click');
}

var showProfile = function(){
    //can not get uid at this step
    profileRef = firebase.database().ref('profile');
    profileRef.on('value',function(snapshot){
        //be accessed to uid in callback after windows.onload
        var DB = snapshot.child(uid).val();
        console.log(DB);
        //if user has save profile already
        if(DB){
            $('.photo-label').text(DB.headImg);
            $('#username').val(DB.titleName);
            $('#email').val(DB.titleEmail);
            $('#url').val(DB.titleURL);
            $('#aboutme').val(DB.titleAbout);

            //getDownloadURL() to find match pic or solve error
            headRef = firebase.storage().ref('image_profile/'+uid).child(DB.headImg);
            headRef.getDownloadURL().then(function(url){
                console.log(url);
                $('.preview').find('img').attr('src',url);
                $('.headBtn').find('img').attr('src',url);
            }).catch(function(error){
                switch (error.code) {
                    case 'storage/object_not_found':
                    console.log("user did not save profile img");
                    $('.preview').find('img').attr('src','upload-default.png');
                    $('.headBtn').find('img').attr('src','upload-default.png');
                    break;
                }
            });
        }//if

    })
}

