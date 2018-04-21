// Get a reference to the database/storage service, which is used to create references in your database/storage bucket
var productRef,storageRef,imageRef;
var productImg, productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText;
//image file 
var imageFile;

$('#save-button').on('click',function(event){
    console.log("test onclick order");
    event.preventDefault();
    //get values
    productImg = $('.photo-label').text();
    productName = $('#productName').val();
    username = $('#username').val();
    username = $('#username').val();

  
    //create the user database node
    if(uid){
      //reference to login user's storage
      storageRef = firebase.storage().ref('image/'+uid);
      //reference to login user's database
      productRef = firebase.database().ref('product/'+uid);
      //save all the form when "click"
      saveProduct(productImg,productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText);
      //$('form').trigger('reset');
    }
    else
      alert("user account is not existed!");
  });
  