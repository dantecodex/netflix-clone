// import {accessToken} from "./main.js";
const imageURL = `https://image.tmdb.org/t/p/original/`;
const movieId = JSON.parse(localStorage.getItem("movie_ID"));
const accessToken = JSON.parse(localStorage.getItem("accessToken"));


getMovieDetails(movieId);



function printMovieDetails(data) {
    const movieBackground = document.querySelector(".background-image");
    const movieDetails = document.querySelector(".movie-details");


    movieBackground.innerHTML = `
    <img src="${imageURL}${data.backdrop_path}" alt="" srcset="">
    `

    movieDetails.innerHTML = `
    <img src="${imageURL}${data.images.logos[0].file_path}" alt="">
                    <div class="ms-md-4 ms-2 fw-light mt-4">
                        <p class="fs-4 mt-md-5">${data.title}</p>
                        <div class="d-flex column-gap-3" style="font-size: 0.88rem; color: #a3a3a3;">
                            <p class="border-end pe-2">${(data.release_date).slice(0,4)}</p>
                            <p class="border px-2" style="border-color: #a3a3a3 !important;">U/A 13+</p>
                            <p class="border-end border-start px-2">${timeConversion(data.runtime)}</p>
                            <p class="">${data.genres[0].name}</p>
                        </div>
                        <p class="">${data.overview}</p>
                        <p class=""><span style="color: #a3a3a3;">Starring:</span> ${data.credits.cast[0].name},${data.credits.cast[1].name},${data.credits.cast[2].name}</p>
                    </div>
    `


}


function timeConversion(minutes) {
 
  let hours = Math.floor(minutes / 60);  

  let min = minutes % 60;


  return hours + 'h ' + min + 'm';         
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
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%2Cvideos%2Crecommendations%2Ccredits&language=en`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        printMovieDetails(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}
applySlider();
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
