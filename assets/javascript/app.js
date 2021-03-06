// Data Set with initial animals, Set used to void repetitive input
let animalsSet = new Set(["cow", "dog", "cat", "rat", "horse", "monkey", "bat"]);
// JSOn to hold URL parameters
let queryURL = {
  url: "https://api.giphy.com/v1/gifs/search?",
  apiKey: "GvtvtZwH7qHmYmA0qVRIs8mOOul36if",
  limit: 10,
};
/* ************************************************************* */
/* * * * * * * * * * * * * * mkbtn() * * * * * * * * * * * * * * */
/* ************************************************************* */
// function to create a new button, the argument passed to this function will                                 
// be the text displayed on button
// <button class="btn btn-primary m-2">textContent</button>
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
// function to create a new img element, the passed argument to this function                                      
// will be the JSON data object from API and innerHTML from the button 
// <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-7 p-1">
// <div class="card p-1 gif-card">
// <h4 class="card-title text-center p-2 mx-2  bg-primary text-light">raiting</h4>
// <img src="" data-still="" data-animate="" data-state="still" class="px-1 m-1" alt=${alt}>
// </div></div>
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
  _cardTitle.setAttribute('class', 'card-title text-center p-2 mx-2  bg-primary text-light');
  // Add innerHTML for card Title (Rating)
  _cardTitle.innerHTML = animalImgObj.rating;
  // Get the imgages Object
  animalImgObj = animalImgObj.images;
  // Create <img>
  let _img = document.createElement('img');
  // Add the Attributes
  _img.setAttribute('src', animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-still', animalImgObj.fixed_height_still.url);
  _img.setAttribute('data-animate', animalImgObj.fixed_height.url);
  _img.setAttribute('data-state', 'still');
  _img.setAttribute('class', 'px-1 m-1');
  _img.setAttribute('alt', alt);
  // Append _cardTitle and _img to _card
  _card.appendChild(_cardTitle);
  _card.appendChild(_img);
  // Append _card to _col
  _col.appendChild(_card);

  return _col;
}
/* ************************************************************* */
/* * * * * * * * * * * * reloadButtons() * * * * * * * * * * * * */
/* ************************************************************* */
// This function will read each element from animalsSet and create a button
// for each animal
function reloadButtons() {
  // Clean Screen to remove current buttons
  document.querySelector("#btnContainer").innerHTML = "";
  // Loop trough Set and add new Buttons
  for (let animal of animalsSet) {
    let _btn = mkbtn(animal);
    document.querySelector("#btnContainer").appendChild(_btn);
  }
}
/* ************************************************************ */
/* * * * * * * * * * * * * * loadImgs() * * * * * * * * * * * * */
/* ************************************************************ */
function loadImgs(imgObject) {
  // Get the parent element
  let _parent = document.querySelector("#imgsContainer");
  // loop the obj and create a img for each key
  for (let _key of Object.keys(imgObject)) {
    // Create a new card with the current obj
    let _newCard = mkImgCard(imgObject[_key], queryURL.q);
    // add current card to parrent
    _parent.append(_newCard);
  }
}
/* *********************************************************** */
/* * * * * * * * * * * * getImagesObject() * * * * * * * * * * */
/* *********************************************************** */
function getImagesObject() {
  // API URL
  let _url = `${queryURL.url}q=${queryURL.q}&api_key=${queryURL.apiKey}d&limit=${queryURL.limit}&rating=pg13`;
  // Check if fetch is available
  if (window.fetch) {
    // send request
    fetch(_url)
      // Parse the resonse
      .then((_response) => _response.json())
      // Get the Data object from API
      .then((_jsonObj) => _jsonObj.data)
      .then(loadImgs);
  }
  // If Fetch not Available
  else {
    // instanciate a XHR
    const xhr = new XMLHttpRequest();
    // Send the reuest
    xhr.open('GET', _url);
    // onload event listener
    xhr.onload = () => {
      // If ready state its done
      if (xhr.readyState === 4) {
        // checks if the xhr has successfully retrieved data from the API
        if (xhr.status === 200) {
          let _response = JSON.parse(xhr.responseText);
          let _result = _response.data;

          loadImgs(_result);

        } else {
          console.log("Error loadin data");
        }
      }
    };
    //
    xhr.send();
  }
}
/* =============================================================== */
/*                   Buttons Event listener                        */
/* =============================================================== */
// this will add images cards to view
function onButtonClick(event) {
  // Clear any <img> available at the parent element
  document.querySelector("#imgsContainer").innerHTML = "";
  // get the animal's name of clicked button
  let _currentAnimal = event.target.innerHTML;
  // remove whitespaces from search string using regex and add it to queryURL
  queryURL.q = _currentAnimal.trim().split(/\s/).join('+');
  // add images to view
  getImagesObject();
}
/* =============================================================== */
/*                     Image Event listener                        */
/* =============================================================== */
// this will toggle the animation on image
function onImageClick(event) {
  // check if user clicked on image
  if (event.target.tagName === 'IMG') {
    // get clicked image
    let _currentImg = event.target;
    // check state of image/gif
    // if current state is still 
    if (_currentImg.dataset.state === 'still') {
      // set it to animate 
      _currentImg.src = _currentImg.dataset.animate;
      // and set gif url
      _currentImg.dataset.state = 'animate';
    }
    // else (if current state is animate)
    else {
      // set it to still
      _currentImg.src = _currentImg.dataset.still;
      // and set img url
      _currentImg.dataset.state = 'still';
    }
  }
}
/* =============================================================== */
/*                Add Animal Buttons Event listener                */
/* =============================================================== */
// this will add the text input to button
function onAddAnimalClick(event) {
  // prevent page to reflesh
  event.preventDefault();
  // get input element
  let _inputElement = document.querySelector('#getAnimalName');
  // Check if user input any data
  if (_inputElement.value) {
    // add animal name to animalsSet
    animalsSet.add(_inputElement.value);
    // reload buttons
    reloadButtons();
  } else {
    // display error if input not available
    alert("Missing Input");
  }
  // clear text inout
  _inputElement.value = "";
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
reloadButtons();
document.querySelector("#btnContainer").addEventListener('click', onButtonClick);
document.querySelector('#imgsContainer').addEventListener('click', onImageClick);
document.querySelector("#btnAddAnimal").addEventListener('click', onAddAnimalClick);