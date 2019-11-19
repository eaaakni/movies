// Get the modal
var modal;
var trailer_Json;
//We use an onLoad to set up the design of the website first thing as the website loads.
window.onload = function () {
    //Here we get the modal ready for when users click a button
    modal = document.getElementById("myModal");
    //Here we call our local JSON file with the youtubeId's for the movies
    loadLocalJSON(function(response) {
        // Parse JSON string into object
        trailer_Json = JSON.parse(response);
    });
    //Here we get the website design
    var htmlContent = DesignSetup();
    //Here we apply the design
    document.getElementById("content").innerHTML = htmlContent;
}
// When the user clicks on the button, open the modal
function OpenModal(json) {
    modal.style.display = "block";
    //Here we set up the different elements with their information
    document.getElementById("itemModalImg").innerHTML = "<img width='350px' height='350px' src='"+ json.Poster + "'/>";
    document.getElementById("itemModalTitle").innerHTML =  "Title: "  + json.Title;
    document.getElementById("itemModalRating").innerHTML = "Rating: "  + json.imdbRating;
    document.getElementById("itemModalAge").innerHTML = "Release date: "  +  json.Released + " (" + calculateMovieAge(json.Released) + " Years old)";
    document.getElementById("itemModalDesc").innerHTML = json.Plot;

    //Here we query our JSON file to find the object that contains the trailer
    //we want to get by using the imdbID as the unique identifier
    videoID =trailer_Json.Search.find(x => x.imdbID == json.imdbID).Trailer;
    //Here we load the video while also passing the video the id of the video we want
    player.loadVideoById(new String(videoID));

}

// When the user clicks on <span> (x), close the modal
function CloseModal() {
    modal.style.display = "none";
    stopVideo();
}

// When the user clicks anywhere outside of the modal, close it as well as stop the video
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        stopVideo();
    }
}
//This function sets up the design
function DesignSetup() {
    //Here we call the Json file from omdb
    loadJson();
    //Here we set up the tiles with each of the movies
    var htmlContent = "<table cellspacing='10'><tr>";
    for (var i = 0; i < 9; i++)
    {
        //If we have reached 3 tiles, then we switch line so
        //we wont end up with one single row of tiles, every third
        //tile we switch row
        var thirdTime = (i+3) % 3 === 0;

        if (thirdTime)
        {
            htmlContent += "</tr>";
            htmlContent += "<tr>";
            //Here we set up the title with a unique ID to future proof the site incase we might need the id of each tile
            htmlContent += "<td id='ContentDesign' style='vertical-align: text-top;'><div class='grid-child' id='TileID"+ i +"' ></div></td>"

        }
        else
        {
            htmlContent += "<td id='ContentDesign'style='vertical-align: text-top;'><div class='grid-child' id='TileID"+ i +"'></div></td>"
        }
    }
    htmlContent += "</tr></table>";

    return htmlContent;
}

//Here we create the design for each tile, while also sending along the JSON object
function tileDesign(json)
{

    for (var i = 0; i < 9; i++)
    {
        //Here we create a variable to easily find the tile ID we created earlier in our design
        var tileid = "TileID" + i;
        //Here we apply the poster
        document.getElementById(tileid).innerHTML += "<div class='itemChild1'><img width='150px' height='150px' src='"+ json[i].Poster + "'/></div>";
        //Here we add in the title
        document.getElementById(tileid).innerHTML += "<div class='itemChild2'>"+ json[i].Title +"</div>";
        //Here we create the button that allows us to open a overlay with all the information about the movie
        document.getElementById(tileid).innerHTML += "<div class='itemChild3' align='center'><button id='ShowMore' class='MoreInfoBtn' onclick='singleJsonLoad("+"\"" + json[i].imdbID + "\""+");'><p>Read more</p></button></div>";
    }

}

//Here we have an async function that loads the JSON, we use Async to
//Make sure we receive some sort of response by the end of the function.
//This can either be that it failed or that it worked
async function loadJson() {

    //URL to get the Json from, in this case, we get any movie
    //we can find, using "men" as the search term
    let url = 'https://www.omdbapi.com/?s=men&apikey=1d9678d0';
    //Here we wait for the url to get gotten in a JSON format
    let obj = await (await fetch(url)).json();
    //Here we use what we found to design our tile
    tileDesign(obj.Search);


}

//In this function we narrow down our search from anything to do with "men"
//To any movie with the imdbID we sent along, since the id is unique, we will
//only receive a single result, we then use that to populate our modal with info
async function singleJsonLoad(imdbID) {
    let url = 'https://www.omdbapi.com/?i='+ imdbID +'&apikey=1d9678d0&plot=full';
    let obj = await (await fetch(url)).json();

    OpenModal(obj);

}

//In this function we call a local JSON file that contains both an imdbID and
//a youtube id. We use this to get the youtube trailer that shows the chosen
//movie's trailer.
function loadLocalJSON(callback) {
    //Using XMLHttpRequest we can receive data without refreshing our page
    var xobj = new XMLHttpRequest();
    //Here we override the default MIME type, telling it that wha we're getting
    //is a JSON
    xobj.overrideMimeType("application/json");
    //Here, we open our file, in this case, its a local file called Trailers
    xobj.open('GET', 'Trailers.json', true);
    //Once we get a response, we fire off a function that sends callback with the response
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
//Here we calculate how old the movie is
function calculateMovieAge(movieRelease) {
    //Find the amount of seconds the movie is old
    var ageDiff = Date.now() - new Date(movieRelease);
    var ageDate = new Date(ageDiff); // miliseconds from epoch
    //Here we do the math to actually find the age
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
var videoID;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoID,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
