document.addEventListener('DOMContentLoaded', function() {
    // Function to handle search form submission
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetchDestinationData();
        });
    }

    // Function to fetch data based on the search query
    function fetchDestinationData() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value;

        fetch(`/search-data?query=${encodeURIComponent(query)}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error fetching search data:', error);
            displaySearchResults([]);
        });
    }

    // Function to display search results
    function displaySearchResults(results) {
        const resultsContainer = document.getElementById('featuredDestinations');
        resultsContainer.innerHTML = ''; // Clear previous results

        results.forEach(result => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h4>${result.name}</h4>
                <p>${result.description}</p>
            `;
            resultsContainer.appendChild(card);
        });

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});
