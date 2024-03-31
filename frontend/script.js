window.onload = checkSessionLogin;

function checkSessionLogin() {
    let sessionID = getCookieValue('sessionID');
    let usernameCookie = getCookieValue('username');

    fetch('http://localhost:8080/api/checksession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(sessionID),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        window.location('login.html?source=loginfail');
        return response.json();
    })
    .then(data => {
        if (data.username === usernameCookie) {
            loginSuccess(usernameCookie);
        } else {
            window.location.replace('login.html?source=loginfail');
        }
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        window.location.replace('login.html?source=loginfail');
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

function loginSuccess(usernameCookie) {
    let usernameShow = document soll kommen wenn man über avatar hovert;
    let profilePictureLink = getProfilePicture(usernameCookie);

    let username
    let profilePicture = document.getElementById('profilePicture');

    profilePicture.src = profilePictureLink;
    

}
function getProfilePicture(usernameCookie) {

    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(usernameCookie),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        window.location('login.html?source=loginfail');
        return response.json();
    })
    .then(data => {
        let profilePicture = data.profilePicture;
        return profilePicture;
    })
}

// form
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
        name: document.getElementById('name').value,
        solo: document.getElementById('solo').value,
        soloSessions: document.getElementById('soloSessions').value,
        duo: document.getElementById('duo').value,
        duoSessions: document.getElementById('duoSessions').value,
        bodycount: document.getElementById('bodycount').value,
        bcm: document.getElementById('bcmale').value,
        bcf: document.getElementById('bcfemale').value,
        bcd: document.getElementById('bcdiverse').value,
        sexuality: document.getElementById('sexuality').value,
        weapon: document.getElementById('weapon-bra-size').value,
        single: document.getElementById('single').value,
        together: document.getElementById('together').value,
        favePornCategory: document.getElementById('favePornCategory').value,
        favePornVid: document.getElementById('favePornVid').value
    };

    fetch('http://localhost:8080/api/stats', {
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
        information.classList.remove('loading');
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        information.classList.remove('loading');
        information.classList.add('error');
        information.title = "Fehler, umgehend Tech-Support aufsuchen 🤖"
    })
}

document.addEventListener('DOMContentLoaded', function() {

    // color and width when filling out
    let name = document.getElementById('name');
    let solo = document.getElementById('solo');
    let soloSessions = document.getElementById('soloSessions');
    let duo = document.getElementById('duo');
    let duoSessions = document.getElementById('duoSessions');
    let bodycount = document.getElementById('bodycount');
    let bcm = document.getElementById('bcmale');
    let bcf = document.getElementById('bcfemale');
    let bcd = document.getElementById('bcdiverse');
    let weapon = document.getElementById('weapon-bra-size');
    let sexuality = document.getElementById('sexuality');
    let single = document.getElementById('single');
    let together = document.getElementById('together');
    let favePornCategory = document.getElementById('favePornCategory');
    let favePornVid = document.getElementById('favePornVid');


    name.addEventListener('input', resizeInput(name));
    solo.addEventListener('input', resizeInput(solo));
    soloSessions.addEventListener('input', resizeInput(soloSessions));
    duo.addEventListener('input', resizeInput(duo));
    duoSessions.addEventListener('input', resizeInput(duoSessions));
    bodycount.addEventListener('input', resizeInput(bodycount));
    bcm.addEventListener('input', resizeInput(bcm));
    bcf.addEventListener('input', resizeInput(bcf));
    bcd.addEventListener('input', resizeInput(bcd));
    weapon.addEventListener('input', resizeInput(weapon));
    sexuality.addEventListener('click', function() {
        sexuality.classList.add('filled');
    });
    single.addEventListener('input', resizeInput(single));
    together.addEventListener('input', resizeInput(together));
    favePornCategory.addEventListener('input', resizeInput(favePornCategory));
    favePornVid.addEventListener('input', resizeInput(favePornVid));

    function resizeInput(id) {
        return function() {
            id.style.width = id.value.length + "ch";
            if (id.value.length > 0) {
                id.classList.add('filled');
                id.classList.remove('warning');
            } else if (id.value.length === 0) {
                id.classList.remove('filled');
                id.classList.add('warning');
            }
        };
    }

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

    // color radio listener to hide input
    function check(a, b) {
        return function() {
            let x = document.getElementById(a);
            let y = document.getElementById(b);
            x.classList.add('filled');
            y.classList.remove('filled');
        };
    }

    document.getElementById('lSingle').addEventListener('click', check('lSingle', 'lTogether'));
    document.getElementById('lTogether').addEventListener('click', check('lTogether', 'lSingle'));
});
