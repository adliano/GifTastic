// Data Set with initial animals, Set used to void repetitive input
let animalsSet = new Set(["cow", "dog", "cat", "rat", "horse", "monkey", "bat"]);
// API Key
const API_KEY = "GvtvtZwH7qHmYmA0qVRIs8mOOul36if";

/* ************************************************************* */
/* * * * * * * * * * * * reloadButtons() * * * * * * * * * * * * */
/* ************************************************************* */
function reloadButtons() {
  // Clean Screen
  document.querySelector("#btnContainer").innerHTML = "";
  // Loop trough Set and add Buttons
  for (let animal of animalsSet) {
    document.querySelector("#btnContainer").appendChild(mkbtn(animal));
  }
}
/* ************************************************************* */
/* * * * * * * * * * * * * * mkbtn() * * * * * * * * * * * * * * */
/* ************************************************************* */
// function to create a new button
function mkbtn(textContent) {
  // create new element button
  let _btn = document.createElement("button");
  // add Bootstrap class to style it
  _btn.setAttribute('class', 'btn btn-primary m-2');
  // add innerHtml
  _btn.innerHTML = textContent;
  // return the created button
  return _btn;
}
/* ************************************************************* */
/* * * * * * * * * * * * * mkImgCard() * * * * * * * * * * * * * */
/* ************************************************************* */
// function to create a new img element
/**
 *
<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-7 p-1">
    <div class="card p-1">
        <h4 class="card-title text-center p-2 mx-2  bg-primary text-light">Rating</h4>
        <img class="px-1 m-1" src="https://media2.giphy.com/media/dchERAZ73GvOE/200_s.gif" alt="Chewbacca">
    </div>
</div>
 *
 */
function mkImgCard(animalImgObj, alt) {
  let _col = document.createElement('div');
  _col.setAttribute('class', 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-7 p-1');
  // create card div
  let _card = document.createElement('div');
  // Add the clases to cardDiv
  _card.setAttribute('class', 'card p-1 gif-card');
  // Create Card Title <H4>
  let _cardTitle = document.createElement('h4');
  // Add classes for crad title
  _cardTitle.setAttribute('class','card-title text-center p-2 mx-2  bg-primary text-light');
  // Add innerHTML for card Title (Rating)
  _cardTitle.innerHTML = animalImgObj.rating;
  // Get the imgages Object
  animalImgObj = animalImgObj.images;
  // Create <img>
  let _img = document.createElement('img');
  // Add the Attributes
  _img.setAttribute('src',animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-still',animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-animate',animalImgObj.fixed_height.url);
  _img.setAttribute('data-state','still');
  _img.setAttribute('class','px-1 m-1');
  // Append _cardTitle and _img to _card
  _card.append(_cardTitle);
  _card.append(_img);
  // Append _card to _col
  _col.append(_card);

//  let _innerHTMLText = `<h4 class="card-title text-center p-2 mx-2  bg-primary text-light">${animalImgObj.rating}</h4>`;
//  animalImgObj = animalImgObj.images;
//  _innerHTMLText += `<img class="px-1 m-1" src="${animalImgObj.fixed_height_still.url}" alt="${alt}" data-state="still">`;
//  _card.innerHTML = _innerHTMLText;

  // _col.appendChild(_card);

  return _col;

  /*
  <img
      src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif"
      data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif"
      data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif"
      data-state="still"
      class="gif"
    />

    if (event.target.tagName === 'img'.toUpperCase()) {
          let currentImg = event.target
          var state = currentImg.dataset.state
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === 'still') {
            currentImg.setAttribute('src', currentImg.dataset.animate)
            currentImg.setAttribute('data-state', 'animate')
          } else {
            currentImg.setAttribute('src', currentImg.dataset.still)
            currentImg.setAttributegh('data-state', 'still')
          }
        }
  */

  // // create crad header
  // let _cardHeader = document.createElement("h4");
  // // Add the clases to cardHeader
  // _cardHeader.setAttribute('class','card-header text-center p-1');/////////
  // // Create new img element
  // let _img = document.createElement("img");
  // // Add Bootstrap class to style it
  // _img.setAttribute('class', 'm-1');
  // //
  // _img.setAttribute('data-rating', animalImgObj.rating);
  // animalImgObj = animalImgObj.images;
  // _img.setAttribute('src', animalImgObj.fixed_height_still.url);
  // _img.setAttribute('data-gif', animalImgObj.fixed_height.url);
  // _img.setAttribute('alt', alt);

  // return _img;



}
/* ************************************************************* */
/* * * * * * * * * * * * * * mkImgCard() * * * * * * * * * * * * * * */
/* ************************************************************* */
function loadImages(search) {
  // remove whitespaces from search string using regex
  search = search.trim().split(/\s/).join('+');
  // API URL
  let _URL = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}d&limit=10&rating=pg13`;
  // Get the parent element
  let _parent = document.querySelector("#imgsContainer");
  // Check if fetch is available
  if (window.fetch) {
    // send request
    fetch(_URL)
      .then((_response) => _response.json())
      .then((_jsonObj) => _jsonObj.data)
      .then((_dataObj) => {
        // loop the obj and create a img for each key
        for (let _key of Object.keys(_dataObj)) {
          console.dir(_dataObj[_key]);
          _parent.append(mkImgCard(_dataObj[_key], search));
        }
      });
  }
}
/* =============================================================== */
/*                   Buttons Event listener                        */
/* =============================================================== */
function onButtonClick(event) {
  // Clear any <img> available at the parent element
  document.querySelector("#imgsContainer").innerHTML = "";
  // get the animal's name of clicked button
  let _animal = event.target.innerHTML;
  loadImages(_animal);
}

/* =============================================================== */
/*                     Image Event listener                        */
/* =============================================================== */
function onImageClick(event) {

  if (event.target.tagName === 'IMG') {
    let _currentImg = event.target;
    if(_currentImg.dataset.state === 'still'){
      _currentImg.src = _currentImg.dataset.animate;
      _currentImg.dataset.state = 'animate';
    }
    else{
      _currentImg.src = _currentImg.dataset.still;
      _currentImg.dataset.state = 'still';
    }
  }
}

/* =============================================================== */
/*                Add Animal Buttons Event listener                */
/* =============================================================== */
function onAddAnimalClick(event) {
  event.preventDefault();
  // get input element
  let _inputElement = document.querySelector('#getAnimalName');
  // Check if user input any data
  if (_inputElement.value) {
    console.log(_inputElement.value);
    animalsSet.add(_inputElement.value);
    reloadButtons();
    //document.querySelector("#btnContainer").appendChild(mkbtn(_animal));
  } else {
    console.log("Nothing!");
  }
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
reloadButtons();
document.querySelector("#btnContainer").addEventListener('click', onButtonClick);
document.querySelector('#imgsContainer').addEventListener('click', onImageClick);
document.querySelector("#btnAddAnimal").addEventListener('click', onAddAnimalClick);




/**
 *
 <div class="card border-light mb-3" >
     <div class="card-header text-center p-1">Header</div>
     <img class="mx-auto p-1" src="https://media2.giphy.com/media/dchERAZ73GvOE/200_s.gif" alt="">
</div>
 *
 */
