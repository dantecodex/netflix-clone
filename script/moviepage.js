// import {accessToken} from "./main.js";
const imageURL = `https://image.tmdb.org/t/p/`;


const movieId = JSON.parse(localStorage.getItem("movie_ID"));
const accessToken = JSON.parse(localStorage.getItem("accessToken"));


getMovieDetails(movieId);



function printMovieDetails(data) {
    const movieBackground = document.querySelector(".background-image");
    const movieLogo = document.querySelector(".movie-header-poster");
    const movieDetails = document.querySelector(".rest-movie-details");
    const videoTitle = document.querySelector(".video-title");
    const videoSlider = document.querySelector(".video-slider");
    const genre = document.querySelector(".genres");
    const oneLineReview = document.querySelector(".one-Line");
    const translations = document.querySelector(".translation");
    const aboutTitle = document.querySelector(".about-title");
    const recommend = document.querySelector(".recommendation");


    movieBackground.innerHTML = `
        <img src="${imageURL}w1280/${data.backdrop_path}" alt="" srcset="" onerror="this.onerror=null;this.src='images/fallback_image.png';">
        `;

    if (data.images.logos.length > 0) {
        movieLogo.innerHTML = `
        <img src="${imageURL}w500${data.images.logos[0].file_path}" alt="" width:100%>
        `;
    }
    movieDetails.innerHTML = `
                    <div class="ms-md-4 ms-2 fw-light mt-4">
                        <p class="fs-4 mt-md-5">${data.title}</p>
                        <div class="d-flex column-gap-3" style="font-size: 0.88rem; color: #a3a3a3;">
                            <p class="border-end pe-2">${(data.release_date).slice(0, 4)}</p>
                            <p class="border px-2" style="border-color: #a3a3a3 !important;">U/A 13+</p>
                            <p class="border-end border-start px-2">${timeConversion(data.runtime)}</p>
                            <p class="">${data.genres[0].name}</p>
                        </div>
                        <p class="">${data.overview}</p>
                        <p class=""><span style="color: #a3a3a3;">Starring:</span> ${data.credits.cast[0].name},${data.credits.cast[1].name},${data.credits.cast[2].name}</p>
                    </div>
    `;

    videoTitle.innerHTML = `
    <p class="fs-4 border-end pe-3">Videos</p>
    <p class="video-titile">${data.title}</p>
    `;

    if (data.videos.results.length > 0) {
        let videoCard = '';
        for (const video of data.videos.results) {
            if (video[`type`] == 'Trailer' || video[`type`] == 'Teaser') {
                videoCard += `
            <div class="">
            <div class="embed-responsive ratio ratio-16x9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${video.key}"></iframe>
            </div>
            </div>
            `;
            }
        }
        videoSlider.innerHTML = videoCard;
        applySlider();
    }


    for (const gen of data.genres) {
        genre.textContent += `${gen["name"]},`;
    }

    oneLineReview.textContent = `${data.tagline}`;

    Array.from(data.translations.translations).slice(0, 5).forEach(element => {
        translations.textContent += `${element.english_name},`
    })

    aboutTitle.textContent = `About ${data.title}`;

    recommend.innerHTML = data.recommendations.results.map(element =>

        `<div id="${element.id}" class="col-md-3 col-6 my-2 select-recommend">
        <img src="${imageURL}w500${element.poster_path}" alt="" srcset="" width="80%" style="cursor:pointer;">
    </div>`).join('');
    loadNewMovie();
}

function printUpcomingMovie(upcoming) {
    const upcomingMovie = document.querySelector(".upcoming-Movie")
    upcomingMovie.innerHTML = Array.from(upcoming).slice(0, 8).map(element => `
    <div class="col-md-3">
    <p class="upcoming-title">${element.title}</p>
    <p class="upcoming-title-data">${element.overview.split(' ', 30).join(' ')}</p>
</div>
    `).join('');
}


function timeConversion(minutes) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;
    return hours + 'h ' + min + 'm';
}


// Select Recommend Movie  ------------>>>>>>>>

function loadNewMovie() {
    document.querySelectorAll(".select-recommend").forEach(movie => {
        movie.addEventListener("click", event => {
            document.location.href = 'moviepage.html';
            localStorage.setItem("movie_ID", JSON.stringify(event.currentTarget.id));
        });
    });
}





// Fetching Movie Details from Movie ID --------->>>>>


async function getMovieDetails(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%2Cvideos%2Crecommendations%2Ccredits%2Ctranslations&language=en`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        printMovieDetails(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=US`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch upcoming movies');
        }
        const upcoming = await response.json();
        printUpcomingMovie(upcoming.results);
    }
    catch (error) {
        console.error('Error fetching Upcoming movies:', error);
        return [];
    }
}

function applySlider() {
    $(document).ready(function () {
        $(`.video-slider`).slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
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
