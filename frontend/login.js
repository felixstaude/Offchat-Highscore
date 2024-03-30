window.onload = checkURL;

function checkURL() {
    const url = new URLSearchParams(window.location.search);
    let fail = url.get('source');
    let popupCookie = getCookieValue('popup');

    if (fail === 'loginfail' && popupCookie != 'closed') {
        let loginFailWrapper = document.getElementById('loginFailWrapper');
        loginFailWrapper.classList.add('loginFailWrapper');
    }
}

function getCookieValue(cookieName) {
    // split cookie-string into values
    let cookies = document.cookie.split(';');

    // search cookies
    for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        // check if cookie exists
        if (cookie.indexOf(cookieName + '=') === 0) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        submitForm();
    }
});

function submitForm() {
    console.log('submit');
    let information = document.getElementById('information');
    information.classList.add('loading');

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        information.classList.remove('loading');
        return response.json();
    })
    .then(data => {
        console.log(data);
        setCookies(data);
        information.classList.remove('loading');
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        information.classList.remove('loading');
        information.classList.add('error');
        information.title = "Fehler, umgehend Tech-Support aufsuchen 🤖"
    })
}

function getCookieValue(cookieName) {
    // split cookie-string into values
    let cookies = document.cookie.split(';');

    // search cookies
    for (var i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        // check if cookie exists
        if (cookie.indexOf(cookieName + '=') === 0) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}

function setCookies(data) {
    if (data === 1) {
        document.cookie = "lockedIn=true;path=/";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let pag = document.getElementById('pag');

    pag.addEventListener('click', function() {
        document.getElementById('author').classList.toggle('authorShow');
    });

    pag.addEventListener('mouseover', function() {
        pag.classList.add('paghover');
    });

    pag.addEventListener('mouseout', function() {
        pag.classList.remove('paghover');
    });

    // remove popup when source loginfail
    let closePopup = document.getElementById('closePopup');
    let loginFailWrapper = document.getElementById('loginFailWrapper');
    closePopup.addEventListener('click', function() {
        loginFailWrapper.classList.remove('loginFailWrapper');
        document.cookie = "popup=closed";
    });
});