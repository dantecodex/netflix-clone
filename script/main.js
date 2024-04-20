const apiKey = "1edd9b2dcc777867c2fe3f5da9049109";
getMovies();

async function getMovies() {
    const response = await fetch('https://api.themoviedb.org/3/movie/550?api_key=1edd9b2dcc777867c2fe3f5da9049109');
    const data = await response.json();
    console.log(data.title);
}