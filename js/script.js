const gallery = document.getElementById('gallery');

fetch("https://randomuser.me/api/?results=12&nat=us&format=json")
    .then(checkStatus)
    .then (response => response.json())
    .then( data => generateHTML(data));

// ----------------------------
//Helper functions
//-----------------------------


function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateHTML(data){
    data.results.map(person => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.insertAdjacentHTML('beforeend', 
            `<div class="card-img-container">
                <img class="card-img" src=${person.picture.thumbnail} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>`);
        gallery.appendChild(card);

    });
}

