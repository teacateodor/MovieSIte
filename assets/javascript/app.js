const inputValue = document.querySelector("#input");
const buttonSearch = document.querySelector("#button");
const movieContainer = document.querySelector("#movieContainer");
const secondMovieContainer = document.querySelector("#secondMovieContainer");

function handleError(error){
    console.log(error);
}

function createIframe(video){
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe,height = 315;
    iframe.allowFullscreen

    return iframe;
}

// crearea setie in div care este apelata in createContainer
function movieSection(movies){
    const section = document.createElement("section");
    section.classList = "section";

    movies.map((movie) => {
        if (movie.poster_path){
            const img = document.createElement("img");
            img.src = imageURL + movie.poster_path;
            img.setAttribute("data-movie-id",movie.id);
            section.appendChild(img);
        }
    })
    return section;
}

// crearea elementelor containerului unde va fi stocate date
function createContainer(movies, title = ""){
    
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "allMovie"); 
    
    const header = document.createElement("h2");
    header.innerHTML = title;

    const section = movieSection(movies);

    const content = document.createElement("div"); 
    content.classList = "content"; 

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    
    return movieElement;
}

// crearea spatiului pentru reprezentarea informatiei despre video
function createVideoTemplate(data, content){
    content.innerHTML = '<p id="contentClose">CLOSE</p>'; // rescrie tot divul cu tagul p
    console.log("VIDEOS DATA",data);
    const videos = data.results;
    const length = videos.length > 1 ? 1 : videos.length;
    const iframeContainer = document.createElement("div");
        for(let i = 0; i < length; i++){
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}

// crearea spatiului pentru reprezentarea informatiei despre video
function createInfoTemplate(data, content){
    console.log("INFO DATA",data);
        // adaugarea unui div cu detalii despre film
        const movieDetails = document.createElement("div");
        movieDetails.setAttribute("class", "movieDetails");

        const movieTitle = document.createElement("p");
        movieTitle.innerHTML = data.original_title;

        const movieVoteAverage = document.createElement("p");
        movieVoteAverage.innerHTML = data.vote_average;

        const movieReleaseDate = document.createElement("p");
        movieReleaseDate.innerHTML = data.release_date;

        const movieOverview = document.createElement("p");
        movieOverview.innerHTML = data.overview;

        movieDetails.appendChild(movieTitle);
        movieDetails.appendChild(movieVoteAverage);
        movieDetails.appendChild(movieReleaseDate);
        movieDetails.appendChild(movieOverview);

        content.appendChild(movieDetails);
}



// procesarea json pentru transmiterea in container cu filme, div class MovieContainer
function jsonProcessing(data){
    movieContainer.innerHTML = "";
    const movies = data.results;
    const movieBlock = createContainer(movies, this.title);
    movieContainer.appendChild(movieBlock);
    console.log("JSON RESPONSE: ", data);
}

// procesarea json pentru transmiterea in container cu filme, div class secondMovieContainer
function jsonProcessingEndPoints(data){
    const movies = data.results;
    const movieBlock = createContainer(movies, this.title);
    secondMovieContainer.appendChild(movieBlock);
    console.log("JSON RESPONSE: ", data);
}

// procesarea apasarii butonului
buttonSearch.onclick = function(event){
    event.preventDefault();
    const input = inputValue.value;
    searchMovie(input);
    inputValue.value = "";
    console.log("THE VALUE IS: ",input);
}

// inregistrarea unui event clickable
document.onclick = function(event){
    const target = event.target; // obtinerea targhetului care a fost facut click
    // verificarea daca eventul care a fost inregistrat corespunde cu tagul img
    if(target.tagName.toLowerCase() === "img"){
        console.log("EVENT:", event);
        
        const movieId = target.dataset.movieId;
        const section = event.target.parentElement; //obtinem tagul parinte, section class singleMovie
        const content = section.nextElementSibling; // obtinem tagul div, class content
        content.classList.add("content-display"); // adaugarea clasei content inca o clasa dontent-displa
        
        // identificarea videoId si afisarea acestora
        const path = `/movie/${movieId}/videos`;
        const url = generateURL(path);
        console.log("VideoURL",url);
        fetch(url)
       .then((res) => res.json())
       .then((data) => createVideoTemplate(data, content))
       .catch((error) => {console.log(error);});    
        
       // identificare informatiei din event
       if(true){
       const path = `/movie/${movieId}`;
       const url = generateURL(path);
       console.log("InfoURL",url);
       fetch(url)
      .then((res) => res.json())
      .then((data) => createInfoTemplate(data, content))
      .catch((error) => {console.log(error);});  }
         
    }
         
    if(target.id === "contentClose"){
        const content = target.parentElement;
        content.classList.remove("content-display");
    }
}

getUpcominghMovies();
getTopRatedhMovies();
getPopularMovies();
getNowPlayngMovies();