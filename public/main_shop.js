
var titleLocal = 0;
let objectKeyNumber = 0;
let localKeyword = 0;
var wordInput = 0;
var startLoc = {lat: 53.3456, lng: -6.24023};
var costLocal = 0;

//price conversion
let euro = .82;
let US_dollar = 1;
let Sterling = 1.13;

// Give each image in the scrollbar it's own unique key to save having to write huge amounts of code
function getKey0() {
    objectKeyNumber = 0;
    //console.log("objectKeyNumber is " + objectKeyNumber);
}

function getKey1() {
  objectKeyNumber = 1;
  //console.log("objectKeyNumber is " + objectKeyNumber);
}

function getKey2() {
  objectKeyNumber = 2;
  //console.log("objectKeyNumber is " + objectKeyNumber);
}

function getKey3() {
  objectKeyNumber = 3;
  //console.log("objectKeyNumber is " + objectKeyNumber);
}

function getKey4() {
  objectKeyNumber = 4;
  //console.log("objectKeyNumber is " + objectKeyNumber);
}


function shop(tab,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tab).style.display = "block";
    //element.style.backgroundColor = color;

}
// Get the element with id="defaultOpen" and click on it
//document.getElementById("defaultOpen").click();
let ZoomClickCounter = 0;

function myFunction(imgs) {

    var expandImg = document.getElementById("img-expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";
}

function getProductData() {
  let ref = database.ref('products');
  ref.on('value', gotData, errData);
  console.log(ref);
}

function gotData(data, wordInput) {
  //console.log(data.val());
  let product = data.val();
  //console.log("data.val is " + product);
  let keys = Object.keys(product);
  //console.log("The shop object keys are " + keys);
  //console.log(keys[0].title + " this test is working");
  for(let i = objectKeyNumber; i < keys.length; i++) {
    let k = keys[objectKeyNumber];
    titleLocal = product[k].title;
    var ingredientsLocal = product[k].incredients;
    costLocal = "Price: " + product[k].cost;
    //console.log("The cost is " + costLocal);
    localKeyword = product[k].searchWord;
    //console.log("The keyword is " + localKeyword);
    var imagesLocal = product[k].images;
    var aboutLocal = product[k].about;
    var ratingLocal = product[k].user_rating;
    wordInput = localKeyword;
    //console.log("wordInput is " + wordInput);
    var imageLocal0 = imagesLocal[0];
    var imageLocal1 = imagesLocal[1];
    var imageLocal2 = imagesLocal[2];
    var imageLocal3 = imagesLocal[3];
      console.log("ratingLocal is " + ratingLocal);
    if(ratingLocal < 19 && ratingLocal > 0){
      document.getElementById('rating_stars5').style.display = 'none';
      document.getElementById('rating_stars4').style.display = 'none';
      document.getElementById('rating_stars3').style.display = 'none';
      document.getElementById('rating_stars2').style.display = 'none';
      document.getElementById('rating_stars1').style.display = 'block';
      // document.getElementById('rating_stars0').style.display = 'none';
    }
    if(ratingLocal >= 20 && ratingLocal < 39){
      document.getElementById('rating_stars5').style.display = 'none';
      document.getElementById('rating_stars4').style.display = 'none';
      document.getElementById('rating_stars3').style.display = 'none';
      document.getElementById('rating_stars2').style.display = 'block';
      document.getElementById('rating_stars1').style.display = 'none';
      // document.getElementById('rating_stars0').style.display = 'none';
    }
    if(ratingLocal >= 40 && ratingLocal < 59){
      document.getElementById('rating_stars5').style.display = 'none';
      document.getElementById('rating_stars4').style.display = 'none';
      document.getElementById('rating_stars3').style.display = 'block';
      document.getElementById('rating_stars2').style.display = 'none';
      document.getElementById('rating_stars1').style.display = 'none';
      // document.getElementById('rating_stars0').style.display = 'none';
    }
    if(ratingLocal >= 60 && ratingLocal < 79){
      document.getElementById('rating_stars5').style.display = 'none';
      document.getElementById('rating_stars4').style.display = 'block';
      document.getElementById('rating_stars3').style.display = 'none';
      document.getElementById('rating_stars2').style.display = 'none';
      document.getElementById('rating_stars1').style.display = 'none';
      // document.getElementById('rating_stars0').style.display = 'none';
    }


    if(ratingLocal >= 80){
        document.getElementById('rating_stars5').style.display = 'block';
        document.getElementById('rating_stars4').style.display = 'none';
        document.getElementById('rating_stars3').style.display = 'none';
        document.getElementById('rating_stars2').style.display = 'none';
        document.getElementById('rating_stars1').style.display = 'none';
        // document.getElementById('rating_stars0').style.display = 'none';
    }


    var sizeLocal = "Volume: " + product[k].size + "ml";

    function stopGarbageCollection(localKeyword){
      localKeyword = this.localKeyword;
      return localKeyword;
    }

  }
  document.getElementById('large_thumbs0_img').src = imageLocal0;
  //console.log("does this link exist? " + imageLocal0);
  document.getElementById('large_thumbs1_img').src = imageLocal1;
  document.getElementById('large_thumbs2_img').src = imageLocal2;
  document.getElementById('large_thumbs3_img').src = imageLocal3;

  document.getElementById('description').innerText = aboutLocal;
  document.getElementById('titleName').innerText = titleLocal;
  document.getElementById('ingredients').innerText = ingredientsLocal;

  document.getElementById('volume').textContent = sizeLocal;
  document.getElementById('price').innerText = costLocal;

  return wordInput;
}

function errData(err) {
  console.log('Error!');v
  console.log(err);
}



function Euro_Price(costLocal) {
  costLocal = euro * costLocal;
  //console.log("€" + costLocal);
  return ("€" + costLocal);
}

function USD_Price(USD_Price) {
  USD_Price = (US_dollar * price).toFixed(2);
  //console.log("$" + USD_Price);
  return ("$" + USD_Price);
}

function Sterling_Price(Sterling_Price) {
  Sterling_Price = (Sterling * price).toFixed(2);
  console.log("£" + Sterling_Price);
  return ("£" + Sterling_Price);
}

var map;
var infowindow;

//
// function searchWord(wordInput) {
//   wordInput = this.wordInput;
//   console.log("The value of wordInput is " + wordInput);
//   // initMap();
//   return wordInput;
// }

function searchWord(wordInput) {
  wordInput = document.getElementById('mapSearch').value;
  //console.log("The value of wordInput is " + wordInput);
    return search(wordInput);
}

function search(localKeyword) {
  var service2 = new google.maps.places.PlacesService(map);
  //console.log("Word input received: " + localKeyword);
  service2.nearbySearch({
    location: startLoc,
    radius: 36000,
    type: ['store'],
    name: localKeyword
  }, callback);

}

function keyWordLocal(localKeyword) {
  thisLocalKeyword = localKeyword;
//  console.log("keywordlocal received is " + thisLocalKeyword);
  return keyword(thisLocalKeyword);
}

function keyword(thisLocalKeyword) {
  var service3 = new google.maps.places.PlacesService(map);
  //console.log("keyword input received: " + thisLocalKeyword);
  service3.nearbySearch({
    location:startLoc,
    radius: 36000,
    type: ['store'],
    keyword: keyWordLocal(),
    name: thisLocalKeyword
  }, callback);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: startLoc,
    zoom: 11
  });

  infoWindow = new google.maps.InfoWindow;
  //console.log("infoWindow created")

  //if location is allowed mark with pointer and move window to location

  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(
      function(position)
    {
      //console.log("getCurrentPosition returned our position!")
      startLoc =
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker(
       {
        position: startLoc,
        map: map
       }
      );

      infoWindow.setPosition(startLoc);
      infoWindow.setContent('You are here');
      infoWindow.open(map);
      map.setCenter(startLoc);

infowindow = new google.maps.InfoWindow();
//console.log("infoWindow created again!")
var service = new google.maps.places.PlacesService(map);
service.nearbySearch({
  location: startLoc,
  radius: 36000,
  type: ['store'],
  keyword: ['cosmetics'],
  name: ['boots']
}, callback);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }

  else
  {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
    console.log("Unfortunately, it appears GeoLocation is not supported on your browser type");
  }


}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'store_icon.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
  infowindow.setContent(place.name);
  infowindow.open(map, this);
  });
}
