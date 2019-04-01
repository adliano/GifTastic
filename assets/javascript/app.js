
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
/* * * * * * * * * * * * * * mkImg() * * * * * * * * * * * * * * */
/* ************************************************************* */
// function to create a new img element
function mkImg(animalImgObj, alt) {
    // Create new img element
    let _img = document.createElement("img");
    // Add Bootstrap class to style it
    _img.setAttribute('class', 'm-1');
    // 
    _img.setAttribute('data-rating', animalImgObj.rating);
    animalImgObj = animalImgObj.images;
    _img.setAttribute('src', animalImgObj.fixed_height_still.url);
    _img.setAttribute('data-gif', animalImgObj.fixed_height.url);
    _img.setAttribute('alt', alt);

    return _img;
}
/* ************************************************************* */
/* * * * * * * * * * * * * * mkImg() * * * * * * * * * * * * * * */
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
                    _parent.append(mkImg(_dataObj[_key], search));
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
function onImageClick(event){
    if(event.target.tagName == 'IMG'){
        alert("works");
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
    }
    else {
        console.log("Nothing!");
    }
}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
reloadButtons();
document.querySelector("#btnContainer").addEventListener('click', onButtonClick);
document.querySelector('#imgsContainer').addEventListener('click', onImageClick);
document.querySelector("#btnAddAnimal").addEventListener('click', onAddAnimalClick);