// var text = '{"movies":[' +
// '{"title":"Rushmore","videoID":"GxCNDpvGyss", "imdbID": "tt0128445"},' +
// '{"title":"The Royal Tenenbaums","videoID":"caMgokYWboU", "imdbID": "tt0265666"},' +
// '{"title":"The Life Aquatic with Steve Zissou","videoID":"yh401Rmkq0o", "imdbID": "tt0362270"}]}';
let moviesJSON = {
  "movies": [
    {"title":"Rushmore","videoID":"GxCNDpvGyss", "imdbID": "tt0128445"},
    {"title":"The Royal Tenenbaums","videoID":"caMgokYWboU", "imdbID": "tt0265666"},
    {"title":"The Life Aquatic with Steve Zissou","videoID":"yh401Rmkq0o", "imdbID": "tt0362270"}]};
  ]
}
//obj = JSON.parse(moviesJSON);
//document.getElementById("demo").innerHTML =
//obj.movies[1].title;
// document.getElementById("demo").innerHTML =
// for (let i = 0; i < text.length; i++) {
//   var obj = movies[i]
//   console.log(obj[i]);
// }

// En string med url til OMDB inkl. api - med helt plot og t= som mangler titlen
let url = "http://www.omdbapi.com/?apikey=1d9678d0&plot=full&t=";
//sting et array med stringe af titlen til at sætte på det forrige URL
//let movies = ["Rushmore", "The+Royal+Tenenbaums", "the+life+Aquatic+with+Steve+Zissou", "Fantastic+Mr.+Fox", "Moonrise+Kingdom", "The+Grand+Budapest+Hotel"];

let container = document.getElementById("movieContainer");

for (let i = 0; i < moviesJSON.movies.length; i++) {
    let fetchUrl = url + moviesJSON.movies[i].title.replace(/( )/g, "%20");
    fetch(fetchUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const box = document.createElement("div");
            box.setAttribute("class", "slide")
            const section = document.createElement("section");
            section.setAttribute("class", "movie");

            const poster = document.createElement("img");
            poster.setAttribute("src", data.Poster);

            const h2 = document.createElement("h2");
            h2.setAttribute("class", "movieTitle");

            const p = document.createElement("p");
            p.setAttribute("class", "description");

            h2.innerText = data.Title;
            p.innerText = data.Plot;

            box.appendChild(section);
            section.appendChild(poster);
            section.appendChild(h2);
            section.appendChild(p);

            container.appendChild(box);
        })
}


// let youtube = {
//   getIdFromUrl: function(videoIdOrUrl) {
//     if (videoIdOrUrl.indexOf('http') === 0) {
//       return videoIdOrUrl.split('v='')[1];
//     } else {
//       return videoIdOrUrl
//     }
//   }
// },
//
//
//
//
// videoID =trailer_Json.Search.find(x => x.imdbID == json.imdbID).Trailer;
//
//             player.loadVideoById(new String(videoID));
//
//<iframe width="560" height="315"
//src="https://www.youtube.com/embed/D6Ac5JpCHmI?&autoplay=1"frameborder="0"
//allowfullscreen></iframe>
//JSON movies for video IDer




// // Get the modal
// var modal = document.getElementsByClassName('modal');
// // Get the button that opens the modal
// var btn = document.getElementsByClassName("modalBtn");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close");
// // When the user clicks the button, open the modal
// btn[0].onclick = function() {
//     modal[0].style.display = "block";
//     console.log(btn);
// }
// btn[1].onclick = function() {
//     modal[1].style.display = "block";
// }
// btn[2].onclick = function() {
//     modal[1].style.display = "block";
// }
// // When the user clicks on <span> (x), close the modal
// span[0].onclick = function() {
//     modal[0].style.display = "none";
// }
// span[1].onclick = function() {
//     modal[1].style.display = "none";
// }
// span[3].onclick = function() {
//     modal[1].style.display = "none";
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// // Get the modal
// var modal;
// //We use an onLoad to set up the design of the website first thing as the website loads.
// window.onload = function () {
//     //Here we get the modal ready for when users click a button
//     modal = document.getElementById("myModal");
//     //Here we call our local JSON file with the youtubeId's for the movies
//     loadLocalJSON(function(response) {
//         // Parse JSON string into object
//         moviesJSON = JSON.parse(response);
//     });
//     //Here we get the website design
//     var htmlContent = DesignSetup();
//     //Here we apply the design
//     document.getElementById("content").innerHTML = htmlContent;
// }
// // When the user clicks on the button, open the modal
// function OpenModal(json) {
//     modal.style.display = "block";
//     //Here we set up the different elements with their information
//     document.getElementById("itemModalImg").innerHTML = "<img width='350px' height='350px' src='"+ json.Poster + "'/>";
//     document.getElementById("itemModalTitle").innerHTML =  "Title: "  + json.Title;
//     document.getElementById("itemModalRating").innerHTML = "Rating: "  + json.imdbRating;
//     document.getElementById("itemModalAge").innerHTML = "Release date: "  +  json.Released + " (" + calculateMovieAge(json.Released) + " Years old)";
//     document.getElementById("itemModalDesc").innerHTML = json.Plot;
// }
// Get the button that opens the modal
var btn = document.querySelectorAll("button.modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
 btn[i].onclick = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
 }
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
 spans[i].onclick = function() {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
    }
 }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
     for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
     }
    }
}
