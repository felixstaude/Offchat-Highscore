window.onload = checkSessionLogin;

// check sessionID via cookie
function checkSessionLogin() {
    let sessionID = getCookieValue('sessionID');
    let usernameCookie = getCookieValue('username');

    fetch('http://localhost:8080/api/checksession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({sessionID: sessionID}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.username === usernameCookie) {
            let dataUser = getProfileData(data.username);

            let username = document.getElementById('usernameHeader');
            let name = document.getElementById('nameHeader');
            let profilePicture = document.getElementById('profilePictureHeader');
            username.innerHTML = usernameCookie;
            name.innerHTML = dataUser.name;
            profilePicture.src = dataUser.profilePicture;
        } else {
            console.log(usernameCookie);
            console.log(data.username);
            // window.location.replace('login.html?source=loginfail');
            console.log('anfrage kam durch, aber falsche id zurück');
        }
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        // window.location.replace('login.html?source=loginfail');
    })
}

function getProfileData(x) {
                
    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(x),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
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
document.addEventListener('DOMContentLoaded', function() {
    let hoehevonheader = document.getElementById('header').offsetHeight;
    let main = document.getElementById('main');

    main.style.marginTop = hoehevonheader + 5 + 'px';
    console.log(hoehevonheader + 5);

    // check scroll
    document.addEventListener('scroll', function() {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let width = window.innerWidth;
        //console.log(currentScroll + " | " + documentHeight + " | " + (currentScroll - documentHeight)); Falls es nochmal kaputt geht

        let author = document.getElementById('author');
        if((width < 501) && (currentScroll - 185 > documentHeight)) {
            author.classList.add('authorShow');
        } else if ((width > 500) && (currentScroll - 92 > documentHeight)) {
            author.classList.add('authorShow');
        } else {
            author.classList.remove('authorShow');
        }
    })
});