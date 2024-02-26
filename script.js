document.addEventListener('DOMContentLoaded', function() {
    const popularEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=3428728f267aa67d691f47c73d5b3008`;
    const topRatedEndpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=3428728f267aa67d691f47c73d5b3008`;
    const upcomingEndpoint = `https://api.themoviedb.org/3/movie/upcoming?api_key=3428728f267aa67d691f47c73d5b3008`;
    let currentEndpoint = popularEndpoint;
    
    // Function to fetch data and populate image grid
    function fetchData(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                const imageGrid = document.getElementById('imageGrid');
                imageGrid.innerHTML = ''; 

                movies.forEach(movie => {
                    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    const imageThumbnail = `
                        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                            <img src="${imageUrl}" class="img-thumbnail" alt="${movie.title}">
                            <p class="text-white">${movie.title}</p>
                        </div>
                    `;
                    imageGrid.innerHTML += imageThumbnail;
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Fetch data for initial endpoint (popular)
    fetchData(currentEndpoint);

    // Event listener for the "Popular" button
    const popularButton = document.getElementById('popularButton');
    popularButton.addEventListener('click', function() {
        currentEndpoint = popularEndpoint;
        fetchData(currentEndpoint);
    });

    // Event listener for the "Top Rated" button
    const topRatedButton = document.getElementById('topRatedButton');
    topRatedButton.addEventListener('click', function() {
        currentEndpoint = topRatedEndpoint;
        fetchData(currentEndpoint);
    });

    // Event listener for the "Upcoming" button
    const upcomingButton = document.getElementById('upcomingButton');
    upcomingButton.addEventListener('click', function() {
        currentEndpoint = upcomingEndpoint;
        fetchData(currentEndpoint);
    });

    // Search bar functionality 
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    function expandSearchInput() {
        searchContainer.classList.add('expanded');
    }
    function shrinkSearchInput() {
        searchContainer.classList.remove('expanded');
    }
    searchInput.addEventListener('focus', expandSearchInput);
    searchInput.addEventListener('mouseenter', expandSearchInput);
    searchInput.addEventListener('blur', shrinkSearchInput);
    searchContainer.addEventListener('mouseleave', shrinkSearchInput);
});
