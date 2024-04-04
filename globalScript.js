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
            getProfileData();
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

function getProfileData() {
    information.classList.add('loading');

    let sessionID = getCookieValue('sessionID');
    let userURL = 'http://localhost:8080/api/user/data?sessionId=' + sessionID;
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
        name.innerHTML = data.name;
        if (data.profilepicture) {
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


window.addEventListener('load', function() {

    // margin top for main and aside
    let hoehevonheader = document.getElementById('header').offsetHeight;
    let main = document.getElementById('main');
    let sidebar = document.getElementById('sidebar');
    let sidebarcontent = document.getElementById('sidebarContent');

    sidebar.style.top = hoehevonheader + 20 + 'px';
    sidebarcontent.style.maxHeight = `calc(100vh - ${hoehevonheader - 10}px)`;
    main.style.marginTop = hoehevonheader + 20 + 'px';
    console.log(hoehevonheader + 20);
});

document.addEventListener('DOMContentLoaded', function () {
    
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
    document.getElementById('sidebarArrow').addEventListener('click', function() {
        let sidebar = document.getElementById('sidebar');
        let sidebarArrow = document.getElementById('sidebarArrow');

        toggleClasses(sidebar, 'sidebarShow');
        toggleClasses(sidebarArrow, 'sidebarArrowShow');
    });

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