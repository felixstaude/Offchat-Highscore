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
        checkSessionLogin();
    }
}

function acceptCookies(x) {
    let onlaodTime = new Date().getTime();
    let expireTime = onlaodTime + 30000000;
    document.cookie = `cookies=${x};expires=${expireTime};path=/`;
    window.location.reload();
}

function resetCookiePref() {
    document.cookie = `cookies=;path=/`;
    window.location.reload();
}

let spLoggedIn;

// check sessionID via cookie
function checkSessionLogin() {

    //database
    let sessionID = getCookieValue('sessionID');
    let usernameCookie = getCookieValue('username');

    fetch('http://88.99.161.170:8080/api/checksession', {
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
            getProfileData();
        } else {
            console.log(usernameCookie);
            console.log(data.username);
            console.log('anfrage kam durch, aber falsche id zurück');
            // window.location.replace('/login/?source=loginfail');
        }
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        window.location.replace('/login/?source=loginfail');
    })
}

function getProfileData() {
    information.classList.add('loading');

    let sessionID = getCookieValue('sessionID');
    let userURL = `http://88.99.161.170:8080/api/user/data?sessionId=${sessionID}`;
    let usernameCookie = getCookieValue('username');

    fetch(userURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        information.classList.remove('loading');
        
        let username = document.getElementById('usernameHeader');
        let name = document.getElementById('nameHeader');
        let profilePicture = document.getElementById('profilePictureHeader');
        username.innerHTML = usernameCookie;
        name.innerHTML = data.customName;
        if (data.profilePicture) {
            profilePicture.src = data.profilePicture;
        }
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        information.classList.remove('loading');
        information.classList.add('error');
        showError.innerHTML = 'Profildaten konnten nicht geladen werden. Probiere es bitte erneut oder teile es uns mit.';
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


document.addEventListener('DOMContentLoaded', function () {
    adjustContent();
    
    // profile information on hover
    let namesWrapper = document.getElementById('namesWrapper');
    let usernameHeader = document.getElementById('usernameHeader');
    let nameHeader = document.getElementById('nameHeader');

    document.getElementById('penis').addEventListener('mouseover', function() {
        addClasses(namesWrapper, 'namesWrapperShow');
        addClasses(usernameHeader, 'usernameHeaderShow');
        addClasses(nameHeader, 'nameHeaderShow');
    });
    document.getElementById('penis').addEventListener('mouseout', function() {
        removeClasses(namesWrapper, 'namesWrapperShow');
        removeClasses(usernameHeader, 'usernameHeaderShow');
        removeClasses(nameHeader, 'nameHeaderShow');
    });

    // sidebar movement
    document.getElementById('sidebarArrow').addEventListener('click', sidebarMovement);

    let hoverOverSidebarHover;
    document.getElementById('sidebarHoverArea').addEventListener('mouseout', function () {
        hoverOverSidebarHover = false;
    });
    document.getElementById('sidebarHoverArea').addEventListener('mouseover', function () {
        hoverOverSidebarHover = true;
        setTimeout(() => {
            if (hoverOverSidebarHover === true) {
                addClasses(sidebar, 'sidebarShow');
                addClasses(sidebarArrow, 'sidebarArrowShow');
                addClasses(sidebarHoverArea, 'sidebarHoverAreaHide')
            }
        }, 200);
    });

    function sidebarMovement() {
        toggleClasses(sidebar, 'sidebarShow');
        toggleClasses(sidebarArrow, 'sidebarArrowShow');
        toggleClasses(sidebarHoverArea, 'sidebarHoverAreaHide')
    }

    function addClasses(x,y) {
        x.classList.add(y);
    }

    function removeClasses(x,y) {
        x.classList.remove(y);
    }

    function toggleClasses(x,y) {
        x.classList.toggle(y);
    }

    // check scroll
    document.addEventListener('scroll', function() {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let width = window.innerWidth;
        // console.log(currentScroll + " | " + documentHeight + " | " + (currentScroll - documentHeight)); //Falls es nochmal kaputt geht

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

window.addEventListener('resize', adjustContent);
function adjustContent() {
    // top for main | margin, height aside
    let windowHeight = window.innerHeight;
    let hoehevonheader = document.getElementById('header').offsetHeight;
    let sideHeight = windowHeight - hoehevonheader - 50;
    let main = document.getElementById('main');
    let sidebar = document.getElementById('sidebar');
    let sidebarcontent = document.getElementById('sidebarContent');
    // console.log(sideHeight);

    // height und spacing
    sidebar.style.top = `${hoehevonheader + 20}px`;
    sidebar.style.maxHeight = `${sideHeight}px`;
    sidebarcontent.style.maxHeight = `${sideHeight}px`;
    sidebarHoverArea.style.maxHeight = `${sideHeight - 20}px`;
    main.style.marginTop = `${hoehevonheader + 20}px`;

    // width 
    let windowWidth = window.innerWidth;
    if (windowWidth < 540) {
        sidebar.style.width = `${windowWidth - 50}px`;
        sidebar.style.marginLeft = `-${windowWidth - 40}px`;
    }
}


//refresh spotify token 
async function refreshToken(){
    let refreshTime = parseInt(getCookieValue('spRefreshAccessToken'));
    let onloadTime = new Date().getTime();
    let timeLeft = refreshTime - onloadTime;
    let loggedIn = getCookieValue('spLogin');


    if (loggedIn === 'true' && timeLeft <= 0) {
        let url = "https://accounts.spotify.com/api/token";
        let refreshToken = getCookieValue('spRefreshToken');
        let clientID = '04ea98b78463480aaa84230ec3e319aa';
        console.log(loggedIn)
        console.log(refreshTime);
        console.log(timeLeft);
        
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientID
            }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let expireTime = onloadTime + (data.expires_in * 1000);
            let expireDate = new Date(expireTime);
            let refreshTime = onloadTime + ((data.expires_in - 30) * 1000);
            document.cookie = `spAccessToken=${data.access_token};expires=${expireDate};path=/`;
            document.cookie = `spRefreshAccessToken=${refreshTime};expires=${expireDate};path=/`;
            document.cookie = `spRefreshToken=${data.refresh_token};expires=${expireDate};path=/`;
            document.cookie = `spLogin=true;expires=${expireDate};path=/`;
            localStorage.setItem('spAccessToken', data.access_token);
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch: ', error);
        });
    }
    setTimeout(refreshToken, 10000);
}

refreshToken();


function ping() {
    return 'pong';
}