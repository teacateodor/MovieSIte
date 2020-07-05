const searchMovieURL = "https://api.themoviedb.org/3/search/movie?api_key=d8bf019d0cca372bd804735f172f67e8";
const nowPlayngURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=d8bf019d0cca372bd804735f172f67e8";
const latestURL = "https://api.themoviedb.org/3/movie/latest?api_key=d8bf019d0cca372bd804735f172f67e8";
const upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=d8bf019d0cca372bd804735f172f67e8";
const infoURL = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=d8bf019d0cca372bd804735f172f67e8&";
const imageURL = "https://image.tmdb.org/t/p/w500";

function generateURL(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=d8bf019d0cca372bd804735f172f67e8`;
    return url;
}

function requestMovies(url, onComplete, onError){
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(input){
    const path = "/search/movie";
    const url = generateURL(path) + "&query=" + input;
    const render = jsonProcessing.bind({title:"Search Movies"})
    requestMovies(url, render, handleError);
}

function getUpcominghMovies(){
    const path = "/movie/upcoming";
    const url = generateURL(path);
    const render = jsonProcessingEndPoints.bind({title:"Upcoming Movies"})
    requestMovies(url, render, handleError);
}

function getTopRatedhMovies(){
    const path = "/movie/top_rated";
    const url = generateURL(path);
    const render = jsonProcessingEndPoints.bind({title:"Top Rated Movies"})
    requestMovies(url, render, handleError);
}

function getPopularMovies(){
    const path = "/movie/popular";
    const url = generateURL(path);
    const render = jsonProcessingEndPoints.bind({title:"Popular Movies"})
    requestMovies(url, render, handleError);
}

function getNowPlayngMovies(){
    const path = "/movie/now_playing";
    const url = generateURL(path);
    const render = jsonProcessingEndPoints.bind({title:"Now Playing Movies"})
    requestMovies(url, render, handleError);
}
