const apiUrl = 'https://api.tvmaze.com/search/shows?q=';

// Function to fetch shows based on the search term
async function fetchShows(query) {
    const response = await fetch(apiUrl + query);
    const data = await response.json();
    return data;
}

// Function to display the shows in the UI
function displayShows(shows) {
    const showsContainer = document.getElementById("showsContainer");
    showsContainer.innerHTML = ''; // Clear previous results

    if (shows.length === 0) {
        showsContainer.innerHTML = '<p>No shows found.</p>';
        return;
    }

    shows.forEach(showData => {
        const show = showData.show;
        const card = document.createElement("div");
        card.classList.add("show-card");

        card.innerHTML = `
            <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p>${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.'}</p>
        `;

        showsContainer.appendChild(card);
    });
}

// Function to handle the search button click
async function searchShows() {
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput) {
        const shows = await fetchShows(searchInput);
        displayShows(shows);
    } else {
        alert('Please enter a search term.');
    }
}

// Initial fetch for a default search term (e.g., "avengers")
document.addEventListener('DOMContentLoaded', () => {
    fetchShows('avengers').then(displayShows);
});
