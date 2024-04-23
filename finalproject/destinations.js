// Fetch the JSON data
fetch('travel_destinations.json')
    .then(response => response.json())
    .then(data => {
        // Get the destination list container
        const destinationList = document.getElementById('destination-list');

        // Loop through the data and create HTML for each destination
        data.forEach(destination => {
            // Create destination card
            const card = document.createElement('div');
            card.classList.add('card');

            // Set destination image
            const image = document.createElement('img');
            image.src = `images/${destination.img_name}`;
            image.alt = destination.name;
            card.appendChild(image);

            // Set destination name
            const name = document.createElement('h3');
            name.textContent = destination.name;
            card.appendChild(name);

            // Set destination description
            const description = document.createElement('p');
            description.textContent = destination.description;
            card.appendChild(description);

            // Append card to destination list
            destinationList.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching destinations:', error));
