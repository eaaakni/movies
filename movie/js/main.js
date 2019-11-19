//En samling af mine udvalgte film i JSON format med title, videoID og id, som bruges senere
let moviesJSON = {
  "movies": [
    {"title":"Rushmore","videoID":"GxCNDpvGyss", "id": 1},
    {"title":"The Royal Tenenbaums","videoID":"caMgokYWboU", "id": 2},
    {"title":"The Life Aquatic with Steve Zissou","videoID":"yh401Rmkq0o", "id":3},
    {"title":"Fantastic Mr. Fox", "videoID":"n2igjYFojUo", "id":4},
    {"title":"Moonrise Kingdom", "videoID":"_eOI3AamSm8", "id":5},
    {"title":"The Grand Budapest Hotel", "videoID":"1Fg5iWmQjwk", "id":6}
  ]
}
//url til omdb api'en med key, plot og gjort klar til at tilføje title
let url = "http://www.omdbapi.com/?apikey=1d9678d0&plot=full&t=";
//Tager fat i det element fra html, som skal bruges til at indsætte dataen
let container = document.getElementById("movieContainer");
//et for loop laves til at køre gennem alle filmene fra moviesJSON
for (let i = 0; i < moviesJSON.movies.length; i++) {
  //for at hente dataen fra omdb sammensættes url fra tidligere med titlerne fra json og mellemrum udskiftes med +
    let fetchUrl = url + moviesJSON.movies[i].title.replace(/( )/g, "+");
    fetch(fetchUrl)
        .then(response => {
            return response.json();
            //console.log(moviesJSON);
        })
        .then(data => {
            const box = document.createElement("section");
            box.setAttribute("class", "slide");

            const posterContainer = document.createElement("div");
            posterContainer.setAttribute("class", "posterContainer");
            const poster = document.createElement("img");
            poster.setAttribute("src", data.Poster);

            const h3 = document.createElement("h3");
            h3.setAttribute("class", "movieTitle");
            h3.innerText = data.Title;

            // const button = document.createElement("button");
            // button.setAttribute("class", "modal-button");
            // button.setAttribute("href", "#myModal" + moviesJSON.movies[i].id);
            // button.setAttribute("id", "modalBtn" + moviesJSON.movies[i].id);
            // button.innerText = "Open Modal";

            const modal = document.createElement("div");
            modal.setAttribute("class", "modal");
            modal.setAttribute("id", "myModal" + moviesJSON.movies[i].id);
            //modal.setAttribute("id", "myModal");

            var now = new Date();
            var year = now.getFullYear();
            var dateDiff = year - data.Year;
            console.log(dateDiff);

            const modalContent = document.createElement("div");
            modalContent.setAttribute("class", "modal-content");

            const video = document.createElement("iframe");
            video.setAttribute("src", "https://www.youtube.com/embed/"+moviesJSON.movies[i].videoID)
            video.setAttribute("class", "trailer");

            const information = document.createElement("div");
            information.setAttribute("class", "information");
            information.innerHTML = "<p><b>Release Year:</b> " + data.Year + " (" + dateDiff + " years old)</p><p><b>Plot:</b> "+ data.Plot +"</p><p><b>Actors:</b> " + data.Actors + "</p><p><b>Runtime:</b> " + data.Runtime + "</p><p><b>Awards:</b> " + data.Awards + "</p>";


            //const close = document.createElement("span");
            // close.setAttribute("class", "close");
            // close.innerText = "x";


            box.appendChild(posterContainer);
            posterContainer.appendChild(poster);
            box.appendChild(h3);
            //box.appendChild(button);
            box.appendChild(modal)
            //modal.appendChild(close)
            modal.appendChild(modalContent)
            modalContent.appendChild(video)
            modalContent.appendChild(information)
            container.appendChild(box);

        })
}


// console.log(document.querySelectorAll("button"));
//
// function
// //https://stackoverflow.com/questions/40645032/creating-multiple-modals-on-a-single-page
// // Get the button that opens the modal
// let btn = document.querySelectorAll("button.modal-button");
//
// // All page modals
// let modals = document.querySelectorAll('.modal');
//
// // Get the <span> element that closes the modal
// let spans = document.getElementsByClassName("close");
// window.onload = function (){
//   // When the user clicks the button, open the modal
//   for (let i = 0; i < btn.length; i++) {
//    btn[i].onclick = function(e) {
//       e.preventDefault();
//       modal = document.querySelector(e.target.getAttribute("href"));
//       modal.style.display = "block";
//       console.log("something");
//    }
//   }
// }
//
// // When the user clicks on <span> (x), close the modal
// for (let i = 0; i < spans.length; i++) {
//  spans[i].onclick = function() {
//     for (let index in modals) {
//       if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
//     }
//  }
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target.classList.contains('modal')) {
//      for (let index in modals) {
//       if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
//      }
//     }
// }
