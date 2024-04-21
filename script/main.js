const apiKey = "1edd9b2dcc777867c2fe3f5da9049109";
const posterUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face/";

trendingMovies();
topMovies();
// newReleaseMovies();
// comedyMovies();
// actionMovies();
// familyMovies();



async function trendingMovies() {
    const location = document.querySelector(".Popular-Movies");
    let trending = await getTrendingMovies();
    printMoviePoster(trending, location);
}

async function topMovies() {
    const location = document.querySelector(".Top-Movies");
    let top = await getTopMovies();
    printMoviePoster(top, location);
}


const popularMovie = document.querySelector(".Popular-Movies");



// Printing Movies ------------>>>>>>>>>

function printMoviePoster(movies, location) {
    let movieCardData = '';
    for (const movie of movies) {
        movieCardData += `
                <div id="${movie.id}" class="card bg-transparent text-light" style="width: 10rem;">
                <img src="https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}" class="card-img-top mx-auto" alt="...">
                <div class="card-body ">
                    <p class="card-title text-center m-0">${movie.title}</p>
                </div>
            </div>
                `
    }
    location.innerHTML = movieCardData;
    applySlider(location.className);
}






// Fetching Movie Data from API -------------->>>>>>>


async function getTrendingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error(error);
    }
}

async function getTopMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
        const data = await response.json();
        return data.results;
    }
    catch (error) {
        console.error(error);
    }
}




// Slider --------------------------------->>>>>>>




function applySlider(locationClassName) {
    $(document).ready(function () {
        $(`.${locationClassName}`).slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    });
}
