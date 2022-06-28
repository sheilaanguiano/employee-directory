
fetch("https://randomuser.me/api/?results=12&nat=us&format=json")
    .then(checkStatus)
    .then (response => response.json())
    .then( data => generateHTML(data))

// ----------------------------
//Helper functions
//-----------------------------


/**
  * [Check status of the fetch call and handles errors] 
  * @param {Object} response - API response data
  */

function checkStatus(response){
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/**
  * [Generates the div Modal of a clicked Employee] 
  * @param {Number} index - index provided by the data-index attributed received by the click event
  * @param {Object} response - API data response
  */

function generateModal(index, data){
    const gallery = document.getElementById('gallery');
    const modal = document.createElement('div');

    //Date of Birth Rewrite
    let dateOfBirth = data.results[index].dob.date.substr(0,10);
    console.log(dateOfBirth);
    let newDoB = dateOfBirth.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');

    modal.setAttribute('class', 'modal-container');
    modal.insertAdjacentHTML("beforeend", 
        `<div class="modal">
            
            <button type="button" id="modal-close-btn" class="modal-close-btn">
                <strong>X</strong>
            </button>
            
            <div class="modal-info-container">
                <img class="modal-img" src="${data.results[index].picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.results[index].name.first} ${data.results[index].name.last}</h3>
                <p class="modal-text">${data.results[index].email}</p>
                <p class="modal-text cap">${data.results[index].location.city}</p>
                <hr>
                <p class="modal-text">${data.results[index].cell}</p>
                <p class="modal-text">
                ${data.results[index].location.street.number} ${data.results[index].location.street.name}, ${data.results[index].location.city} ${data.results[index].location.state} ${data.results[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${newDoB}</p>
            </div>
        </div>`);

        gallery.appendChild(modal);
        
        //Event listener to close the modal
        document.getElementById('modal-close-btn').addEventListener('click', e =>{
            modal.remove();
        })
}

/**
  * [Generates a card with different personal information for every object provided by the random User API] 
  * @param {Object} response - API data response
  */

function generateHTML(data){
    const gallery = document.getElementById('gallery');

    // Creates a index and iterated over each data object provided by the API
    for (let i = 0; i < data.results.length; i++) {
        let person = data.results[i];    
        person.index = i;
    
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-index', person.index);
        
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
    };

    //Iterates over each card element and add a event listener that triggers the
    // generateModal function
    [...document.getElementsByClassName('card')].forEach( card =>{
        card.addEventListener('click', e =>{
            let index = card.getAttribute('data-index');
            generateModal(index, data)
        })
    })
}









