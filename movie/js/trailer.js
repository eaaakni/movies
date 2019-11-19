// function loadJSON(callback) {
//
//     var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("movie/json");
//     xobj.open('GET', 'movie.json', true); // Replace 'my_data' with the path to your file
//     xobj.onreadystatechange = function () {
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);
//  }
//
//
//  function init() {
//  loadJSON(function(response) {
//   // Parse JSON string into object
//     var actual_JSON = JSON.parse(response);
//  });
// }
//
// console.log()

// fetch('json/movie.json')
// .then(response=> response.json())
// .then(json => {
//   console.log(json);
//   appendMovies(json.movies)
// })

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myObj = JSON.parse(this.responseText);
//     document.getElementById("demo").innerHTML = myObj.title;
//   }
// };
// xmlhttp.open("GET", "movie.json", true);
// xmlhttp.send();
// </script>
//
// <p>Take a look at <a href="json_demo.txt" target="_blank">json_demo.txt</a></p>

var text = '{"movies":[' +
'{"title":"Rushmore","videoID":"GxCNDpvGyss", "imdbID": "tt0128445"},' +
'{"title":"The Royal Tenenbaums","videoID":"caMgokYWboU", "imdbID": "tt0265666"},' +
'{"title":"The Life Aquatic with Steve Zissou","videoID":"yh401Rmkq0o", "imdbID": "tt0362270"}]}';

obj = JSON.parse(text);
document.getElementById("demo").innerHTML =
obj.movies[1].title;
