 var productRef;
 var productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText;
$('#save-button').on('click',function(event){
  event.preventDefault();
  //get values
  productName = $('#productName').val();
  price = $('#price').val();
  category = $('#category option:selected').text();
  buyDate = $('#buy-date').val();
  expireDate = $('#expire-date').val();
  shoppingPlace = $('#shoppingPlace').val();
  notification = $('#notification option:selected').text();
  descriptionText = $('#description-text').val();

  //create the user database node
  if(uid){
    productRef = firebase.database().ref('product/'+uid);
    saveProduct(productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText);
    alert("product info has been saved! ");
    //$('form').trigger('reset');
  }
  else
    alert("user account is not existed!");
});
function saveProduct(productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText){
  var newProduct = productRef.push();//add a new post(with a unique key)
  newProduct.set({//set will rewrite everything
    productName:productName,
    price:price,
    category:category,
    buyDate:buyDate,
    expireDate:expireDate,
    shoppingPlace:shoppingPlace,
    notification:notification,
    descriptionText:descriptionText
  });
}

var showProduct = function(){
    productRef = firebase.database().ref('product');
    //listen for the value existed or not, callback func, after the onAuth
    productRef.on('value',function(snapshot){//db: object of database Ref
      if(uid){
        var db = snapshot.child(uid).val();
        $.each(db,function(index,x){//index is uid here
          //console.log(x);
          $('.container').append('<div class = "'+index+'"></div>');
          //.load() is async, you need callback function 
          $('.'+index+'').load('/block.html',function(){
              $(this).find('.productName').text(x.productName);
              $(this).find('.expireDate').text(x.expireDate);
              $(this).find('.glyphicon-euro').text(x.price);

          });//index


        });//each
        

      }
    });//snapshot
}




