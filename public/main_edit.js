// Get a reference to the database/storage service, which is used to create references in your database/storage bucket
var productRef,storageRef,imageRef;
var productImg, productName,price,category,buyDate,expireDate,shoppingPlace,notification,descriptionText;
//url query
var queryKey = (window.location.search).split('=')[1];
//existed img name
var oldImg; 

var main = function(){

    var displayProduct = function(db){
        $('#productName').val(db.productName);
        $('.photo-label').text(db.productImg);
        $('#price').val(db.price);
        $('#category option:selected').text(db.category);
        $('#buy-date').val(db.buyDate);
        $('#expire-date').val(db.expireDate);
        $('#shoppingPlace').val(db.shoppingPlace);
        $('#notification option:selected').text(db.notification);
        $('#description-text').val(db.descriptionText);
    }
   
	if(!queryKey){
		console.log("no query url");
	}
	else{
		console.log(queryKey);
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
                productRef = firebase.database().ref('product/'+uid+'/'+queryKey);
                //dispaly data
                productRef.on('value',function(snapshot){
                    var db = snapshot.val();
                    console.log(db);
                    displayProduct(db);
                    imageRef = firebase.storage().ref('image/'+uid+'/'+queryKey+'/'+db.productImg);
                    //download preview img, callback func
                    imageRef.getDownloadURL().then(function(url){
                        console.log("image retrieve working");
                        $('.preview').find('img').attr('src',url);
                        oldImg = $('.photo-label').text();
                        console.log(oldImg);
                    });
                })//end on value
			}
		})
    }
}
$(document).ready(main);