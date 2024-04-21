const apiKey = "1edd9b2dcc777867c2fe3f5da9049109";
const posterUrl = "https://media.themoviedb.org/t/p/w220_and_h330_face/";
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZWRkOWIyZGNjNzc3ODY3YzJmZTNmNWRhOTA0OTEwOSIsInN1YiI6IjU5N2RhMjhlYzNhMzY4NTNmNjAxM2FiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mdya7liBiNI11VciUGsWMwgeXR_9Bgfsh9RWAnPuMaI";


getMovies();
// comedyMovies();
// actionMovies();
// familyMovies();

async function getMovies() {
    let location;
    location = document.querySelector(".Popular-Movies");
    let trending = await fetchMovies("movie/popular");
    printMoviePoster(trending, location);

    location = document.querySelector(".Top-Movies");
    let top = await fetchMovies("movie/top_rated");
    printMoviePoster(top, location);

    location = document.querySelector(".Indian-Movies");
    let indianMovie = await fetchMovies("movie/now_playing?page=2&region=in");
    printMoviePoster(indianMovie, location);

    location = document.querySelector(".Comedy-Movies");
    let comedyMovie = await fetchMovies("discover/movie?page=2&with_genres=35");
    printMoviePoster(comedyMovie, location);

    location = document.querySelector(".sci-fi-Movies");
    let scifiMovie = await fetchMovies("discover/movie?with_genres=14%2C878");
    printMoviePoster(scifiMovie, location);

    location = document.querySelector(".Family-Movies");
    let familyMovie = await fetchMovies("discover/movie?page=3&with_genres=10751");
    printMoviePoster(familyMovie, location);

    location = document.querySelector(".War-Movies");
    let warMovie = await fetchMovies("discover/movie?page=3&with_genres=10752");
    printMoviePoster(warMovie, location);

    location = document.querySelector(".Thriller-Movies");
    let thrillerMovie = await fetchMovies("discover/movie?page=5&with_genres=53");
    printMoviePoster(thrillerMovie, location);
}




// Printing Movies ------------>>>>>>>>>

function printMoviePoster(movies, location) {
    let movieCardData = '';
    for (const movie of movies) {
        movieCardData += `
                <div id="${movie.id}" class="card bg-transparent text-light" >
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

async function fetchMovies(category) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/${category}`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
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
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
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
            ]
        });
    });
}
