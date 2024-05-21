window.addEventListener('load', cookieWindow);

let cookiePref;
function cookieWindow() {
    cookiePref = getCookieValue('cookies');
    console.log(`cookies accepted: ${cookiePref}`);
    if (cookiePref != 'all' && cookiePref != 'necessary') {
        const body = document.getElementById('bodyID');
        const popupWrapper = document.createElement('div');
        popupWrapper.id = 'cookieWrapper';
        popupWrapper.classList.add('popupWrapper');
        popupWrapper.innerHTML = 
            `<div class="background content">
                <p>Diese Website benutzt notwendige und zusätzliche Cookies. Die zusätzlichen Cookies werden von spotify.com gesetzt, falls du dich mit deinem Konto anmeldest. So kannst du während deines Aufenthalts die zusätzlichen Funktionen nutzen, die den Login bei Spotify voraussetzen. Um diese Seite nutzen zu können (bspw. für den Login, oder damit deine Cookie-Auswahl gespeichert werden kann) musst du notwendige Cookies akzeptieren. Keine Sorge, diese sind auch nur von uns.</p>
                <div>
                    <button onclick="acceptCookies('all')">Alle akzeptieren</button>
                    <button onclick="acceptCookies('necessary')">nur Notwendige akzepieren</button> 
                </div>
                <p>Hinweis: Da diese Seite "<a href="https://www.bmuv.de/themen/verbraucherschutz/digitaler-verbraucherschutz/impressumspflicht">an [...] Feunde</a>" gerichtet ist, verfügt sie nicht über ein Impressum.</p>
            </div>`;
        body.appendChild(popupWrapper);
    } else {
        checkURL();
    }
}

function acceptCookies(x) {
    let onlaodTime = new Date().getTime();
    let expireTime = onlaodTime + 30000000;
    document.cookie = `cookies=${x};expires=${expireTime};path=/`;
    window.location.reload();
}

function checkURL() {
    const url = new URLSearchParams(window.location.search);
    let fail = url.get('source');
    let popupCookie = getCookieValue('popup');

    if (fail === 'loginfail' && popupCookie != 'closed') {
        let loginFailWrapper = document.getElementById('loginFailWrapper');
        loginFailWrapper.classList.add('loginFailWrapper');
    }
}


window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        submitForm();
    }
});

function submitForm() {
    console.log('submit logindata');
    information.classList.add('loading');
    showError.style.display = '';
    errorCross1.classList.remove('errorCross1');
    errorCross2.classList.remove('errorCross2');


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
        return response.json();
    })
    .then(data => {
        information.classList.remove('loading');
        if (data.success != false && data.sessionID != null) {
            setCookies(data);
        } else {
            information.classList.add('error');
            console.log(data);
            alert('Login fehlgeschlagen, prüfe deine Angaben und versuche es erneut');
        }
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        information.classList.remove('loading');
        information.classList.add('error');
        showError.innerHTML = 'Fehler beim Überprüfen der Logindaten. Probiere es bitte erneut oder teile es uns mit.'
        showError.style.display = 'block';
        errorCross1.classList.add('errorCross1');
        errorCross2.classList.add('errorCross2');
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
    if (data.success != false && data.sessionID != null) {
        let username = document.getElementById('username').value;
        document.cookie = 'sessionID=' + data.sessionID + ';path=/';
        document.cookie = 'username=' + username + ';path=/';
        location.href = '/';
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