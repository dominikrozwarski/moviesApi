const API_KEY = '4ea161de4a4ec39ce17bc6711cfa0465';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovies(API_URL) {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWExNjFkZTRhNGVjMzljZTE3YmM2NzExY2ZhMDQ2NSIsInN1YiI6IjY0NzczMTQxMTJjNjA0MDEzZWQ5MDZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fw5jvQ_rtv9l-UJrCKnYd9-b1D5EILc3ln2RY8l2cGU',
		},
	};

	fetch(API_URL, options)
		.then((response) => response.json())
		.then((data) => {
			showMovier(data);
		})
		.catch((err) => console.error(err));
}

getMovies(API_URL);

function showMovier(data) {
	const newData = data.results;
	newData.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = `
        
            <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${
							movie.backdrop_path
						}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">${overview}</div>

      
        `;
		main.appendChild(movieElement);
	});
}

function getColor(vote_average) {
	if (vote_average >= 8) {
		return 'green';
	} else if (vote_average >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value;
	if (searchTerm) {
		getMovies('searchURL' + '&query=' + searchTerm);
	}
});
