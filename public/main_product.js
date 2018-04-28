//image file 
var imageFile;

//click 'pubilsh' to trigger modal first
$('#save-button').on('click',function(e){
  e.preventDefault();
  $('.saveaskBtn').trigger('click');
});
$('#del-button').on('click',function(e){
  e.preventDefault();
  $('.delaskBtn').trigger('click');
});
//the code in "var = function(){}" will be readed by the compiler, 
//but the code in "function(){}" will be skipped by the comiler 
var saveConfrim = function(event){
  console.log("test save click order");
  //get values
  productImg = $('.photo-label').text();
  productName = $('#productName').val();
  price = $('#price').val();
  category = $('#category option:selected').text();
  buyDate = $('#buy-date').val();
  expireDate = $('#expire-date').val();
  shoppingPlace = $('#shoppingPlace').val();
  notification = $('#notification option:selected').text();
  descriptionText = $('#description-text').val();

  //create the user database node
  //reference to login user's storage
  storageRef = firebase.storage().ref('image/'+uid);
  //reference to login user's database
  productRef = firebase.database().ref('product/'+uid);
  //if new item, save all info
  if(!queryKey){
    saveProduct(productImg,productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText);
  }
  //$('form').trigger('reset');
  else{
    //if item existed, update it.
    updateProduct(productImg,productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText);
  }
};
var delConfrim = function(){
  imageRef = firebase.storage().ref('image/'+uid).child(queryKey+'/'+oldImg);
  //delete old img
  imageRef.delete().then(function(){
    firebase.database().ref('product/'+uid).child(queryKey).remove();
    window.location.assign('/');
  }).catch(function(error){console.log(error)})//delete
}
function saveProduct(productImg,productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText){
  //save info
  var newProduct = productRef.push();//add a new post(with a unique key)
  newProduct.set({//set will rewrite everything
    productImg:productImg,
    productName:productName,
    price:price,
    category:category,
    buyDate:buyDate,
    expireDate:expireDate,
    shoppingPlace:shoppingPlace,
    notification:notification,
    descriptionText:descriptionText
  });
  //save new post key for saing img
  var key = newProduct.key;
  //create a reference to the full path of the file, including the file name.
  imageRef = storageRef.child(key+'/'+productImg);
  //get the image from input="file"
  //cannot upload default, security reason
  imageFile =  $('#upload-photo').get(0).files[0];
  if(imageFile){
    imageRef.put(imageFile).then(function(snapshot){
      console.log(snapshot.downloadURL);
    }).catch(function(error){
      console.log(error);
    });//put
    alert("product info has been saved! ");
  }//if
  else{//when user didn't upload image
    alert("you are creating product without picture!");
    console.log("no pic will store in storage");
  }
}//saveProduct

function updateProduct(productImg,productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText){
  var updates = {
    productImg:productImg,
    productName:productName,
    price:price,
    category:category,
    buyDate:buyDate,
    expireDate:expireDate,
    shoppingPlace:shoppingPlace,
    notification:notification,
    descriptionText:descriptionText
  };
  //updating data:
  productRef.child(queryKey).update(updates);
  //updating img:
  imageFile = $('#upload-photo').get(0).files[0];
  if(imageFile){
    imageRef = storageRef.child(queryKey+'/'+oldImg);
    //delete old img
    imageRef.delete().then(function(){
      //put new img
      imageRef = storageRef.child(queryKey+'/'+productImg);
      imageRef.put(imageFile).then(function(snapshot){
        console.log(snapshot.downloadURL);
      }).catch(function(error){console.log(error);})//put

    }).catch(function(error){console.log(error)})//delete
  }
  console.log("update finish");
}//updateProject

//page behavior, only run when all blokcs finish loading
function moreInfo(){
  $('.rightBtn').on('click',event =>{
    event.preventDefault();
    console.log("right button working when loading finish.");
    $(event.currentTarget).parent().next().fadeToggle();
  });
  //don't name it as id, otherwise only ONE id will be found (id is unique)
  $('.re-editBtn').on('click',function(event){
    event.preventDefault();
    //console.log(uid);OK
    //get the non-display key for current product.
    var thisKey = $(event.currentTarget).prev().text();
    console.log(thisKey);
    window.location.assign('/edit?thisKey='+thisKey);
  })

  function activeBell(event){
    event.preventDefault();
    $(this).toggleClass('active');
    $(this).animate({'top':'-5px'},'fast').animate({'top':'0px'},'fast');
  }

  $('.notification').on('click',activeBell);
}//moreInfo function

var showUserTitle = function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.emailVerified) {
      console.log("testing user title showing");
      $('.userTitle').show();
      //load user image and infomation
      var profileRef3 = firebase.database().ref('profile');
      profileRef3.on('value',function(snapshot){
        var DB3 = snapshot.child(uid).val();
        if(DB3){
          //update title info
          $('.emailTitle').next().text(DB3.titleEmail);
          $('.urlTitle').next().text(DB3.titleURL);
          $('.nameTitle').text(DB3.titleName);
          //update title img
          var headRef3 = firebase.storage().ref('image_profile/'+uid).child(DB3.headImg);
          headRef3.getDownloadURL().then(function(url){
              $('.userTitle').find('img').attr('src',url);
          }).catch(function(error){
              $('.userTitle').find('img').attr('src','upload-default.png');
          })
        }
      })
    } else {
      $('.userTitle').hide();
    }
  });
  var user2 = firebase.auth().currentUser;
}

var showProduct = function(){
  productRef = firebase.database().ref('product');
  //listen for the value existed or not, callback func, after the onAuth
  productRef.on('value',function(snapshot){//db: object of database Ref
    if(uid){
      var db = snapshot.child(uid).val();
      //create array to hold deferred objects
      var Promise = [];
      //loading only when !null
      if(db){
        $.each(db,function(index,x){//index is uid here
          console.log(index);
          //reference to img's full path and name
          imageRef = firebase.storage().ref('image/'+uid).child(index+'/'+x.productImg);
     
          $('.content').append('<div class = "'+index+'"></div>');
          var div =  $('.'+index+'');
          //.load() is async, load and insert HTML immediately, followed by callback func.load() isn't designed for use with deferred object, use .get() instead
          //push all these deferred objects (.ajax calls, promise objects)
          Promise.push($.get('/block.html',function(res){
            div.html(res);
            div.find('#productName').text((x.productName)==0?( $('#productName').val()
          ):(x.productName));
            div.find('#notification').text((x.notification)==0?( $('#notification').val()
          ):(x.notification));
            div.find('#expire-date').text((x.expireDate)==0?( $('#expire-date').val()
          ):(x.expireDate));
            div.find('#price').text((x.price)==0?( $('#price').val()
          ):(x.price));
            div.find('#shoppingPlace').text((x.shoppingPlace)==0?( $('#shoppingPlace').val()
          ):(x.shoppingPlace));
            div.find('#category').text((x.category)==0?( $('#category').val()
            ):(x.category));
            div.find('#description-text').text((x.descriptionText)==0?( $('#description-text').val()
          ):(x.descriptionText));
            //store key for each product
            div.find('#hideKey').text(index);

            console.log("2nd:test async $.get order for each div");
          })
        );

          //getDownloadURL() is async, you need a success callback
          imageRef.getDownloadURL().then(function(url){
            console.log(url);
            div.find('.card-img-top').attr('src',url);
            console.log("3rd:test async $.getDownloadURL() order for each div");
          });

          console.log("1st:test async $.each order");
        });//each    
      }//if(db)

      //.each doesn't have a .promise() function, instead using .when to accept a list of promises
      //.WHEN ALL deferred objects in the array are resolved, THEN call the function
      //$ means 'this' keyword in jQuery, which has to be binded to jQuery object
      $.when.apply($,Promise).done(function(){
        //code here when all promise objects are done/resolved
        moreInfo();
        console.log("test async promise order");
      });//when
        
      }//if(uid)
    });//snapshot
}




