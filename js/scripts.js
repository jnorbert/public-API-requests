let eeData = [];

// declaration of the necessary elements
const gallery = document.getElementById ('gallery');
const galleryCards = gallery.children;

const modalCont = document.createElement ('div');
modalCont.className = 'modal-container';
modalCont.style.display = 'none';
const modalButtons = document.getElementsByClassName ('modal-container');
const modalCards = document.getElementsByClassName ('modal');
const script = document.getElementsByTagName ('script');
document.body.insertBefore (modalCont, script[0]);

const states = {
  alabama: 'AL',
  alaska: 'AK',
  arizona: 'AZ',
  arkansas: 'AR',
  california: 'CA',
  colorado: 'CO',
  connecticut: 'CT',
  delaware: 'DE',
  florida: 'FL',
  georgia: 'GA',
  hawaii: 'HI',
  idaho: 'ID',
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  kansas: 'KS',
  kentucky: 'KY',
  louisiana: 'LA',
  maine: 'ME',
  maryland: 'MD',
  massachusetts: 'MA',
  michigan: 'MI',
  minnesota: 'MN',
  mississippi: 'MS',
  missouri: 'MO',
  montana: 'MT',
  nebraska: 'NE',
  nevada: 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': ' NC',
  'north dakota': 'ND',
  ohio: 'OH',
  oklahoma: 'OK',
  oregon: 'OR',
  pennsylvania: 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  tennessee: 'TN',
  texas: 'TX',
  utah: 'UT',
  vermont: 'VT',
  virginia: 'VA',
  washington: 'WA',
  'west virginia': 'WV',
  wisconsin: 'WI',
  wyoming: 'WY',
};

// fetch data
const profilesURL = 'https://randomuser.me/api/?results=12&&nat=us';

//fetches 12 users from api
fetch (profilesURL).then (response => response.json ()).then (profile => {
  eeData = profile.results;
  dataProfile (profile.results);
  modalWindow (profile.results);
});

//  creates the gallery
function dataProfile (profile) {
  const galleryCards = profile
    .map (
      item => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${item.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="card-text">${item.email}</p>
                <p class="card-text cap">${item.location.city}</p>
            </div>
        </div>
    `
    )
    .join ('');
  gallery.innerHTML = galleryCards;
}

// creates the modal divs, and adds to variable modalDivs
// set necessary data
function modalWindow (profile) {
  let modalDivs = profile
    .map (item => {
      let date = new Date (item.dob.date);
      let month = date.getUTCMonth () + 1;
      let day = date.getUTCDate ();
      let year = date.getUTCFullYear ();
      let dob = `${month}/${day}/${year}`;
      let itemState = item.location.state;
      let state = states[itemState];
      return `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${item.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="modal-text">${item.email}</p>
                <p class="modal-text cap">${item.location.city}</p>
                <hr>
                <p class="modal-text">${item.phone}</p>
                <p class="modal-text cap">${item.location.street} ${item.location.city}, ${state} ${item.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob}</p>
            </div>
            </div>
    `;
    })
    .join ('');
  modalDivs += ``;
  modalCont.innerHTML = modalDivs;
}

// Event Listeners

//Open Modal Window
gallery.addEventListener ('click', function (e) {
  let card;
  //if click is on the main gallery div, do nothing
  if (e.target.tagName === 'DIV' && e.target.className === 'gallery') {
  } else {
    if (e.target.tagName !== 'DIV') {
      card = e.target.parentElement.parentElement;
    } else if (
      e.target.tagName === 'DIV' &&
      (e.target.className === 'card-img-container' ||
        e.target.className === 'card-info-container')
    ) {
      card = e.target.parentElement;
    } else {
      card = e.target;
    } //displays the match and hides the rest
    let name = card.children[1].children[0].innerText.toLowerCase ();
    for (let i = 0; i < modalCards.length; i++) {
      let modalName = modalCards[
        i
      ].children[1].children[1].innerText.toLowerCase ();
      if (modalName === name) {
        modalCards[i].style.display = 'block';
      } else {
        modalCards[i].style.display = 'none';
      }
    } // sets the modal container to display
    modalCont.style.display = 'block';
  }
});

modalCont.addEventListener ('click', function (e) {
  //if the 'X' in the modal window or outside the modal window is clicked,  display = none
  if (
    e.target.className === 'modal-close-btn' ||
    e.target.tagName === 'STRONG' ||
    e.target.className === 'modal-container'
  ) {
    modalCont.style.display = 'none';
  }
});

//handling escape key to exit modal window
document.addEventListener ('keyup', function (e) {
  if (modalCont.style.display === 'block' && e.key === 'Escape') {
    modalCont.style.display = 'none';
  }
});
