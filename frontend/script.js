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

function submitForm() {
    console.log('submit');
    let information = document.getElementById('information');
    let usernameC = getCookieValue('username');
    information.classList.add('loading');

    let nameV = document.getElementById('name').value;
    let profilePictureV = document.getElementById('profilePicture').value;
    let soloV = document.getElementById('solo').value;
    let soloSessionsV = document.getElementById('soloSessions').value;
    let duoV = document.getElementById('duo').value;
    let duoSessionsV = document.getElementById('duoSessions').value;
    let bodycountV = document.getElementById('bodycount').value;
    let bcmV = document.getElementById('bcmale').value;
    let bcfV = document.getElementById('bcfemale').value;
    let bcdV = document.getElementById('bcdiverse').value;
    let sexualityV = document.getElementById('sexuality').value;
    let weaponV = document.getElementById('weapon-bra-size').value;
    let singleV = document.getElementById('single').value;
    let togetherV = document.getElementById('together').value;
    let favePornCategoryV = document.getElementById('favePornCategory').value;
    let favePornVidV = document.getElementById('favePornVid').value;
    
    if (nameV != null && profilePictureV != null && soloV != null && soloSessionsV != null && duoV != null && duoSessionsV != null && bodycountV != null && bcmV != null && bcfV != null && bcdV != null && sexualityV != null && weaponV !=null && singleV != null && togetherV != null && favePornCategoryV != null && favePornVidV != null) {
        const formData = {
            username: usernameC,
            name: nameV,
            profilePicture: profilePictureV,
            solo: soloV,
            soloSessions: soloSessionsV,
            duo: duoV,
            duoSessions: duoSessionsV,
            bodycount: bodycountV,
            bcm: bcmV,
            bcf: bcfV,
            bcd: bcdV,
            sexuality: sexualityV,
            weapon: weaponV,
            single: singleV,
            together: togetherV,
            favePornCategory: favePornCategoryV,
            favePornVid: favePornVidV
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
    } else {
        information.classList.remove('loading');
        information.classList.add('error');
        information.title = "Bitte fülle alle Felder aus 🤖"
    }
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

    // color radio listener to hide input
    function checkRadio(a, b) {
        return function() {
            let x = document.getElementById(a);
            let y = document.getElementById(b);
            x.classList.add('selected');
            y.classList.remove('selected');
        };
    }

    document.getElementById('lSingle').addEventListener('click', checkRadio('lSingle', 'lTogether'));
    document.getElementById('lTogether').addEventListener('click', checkRadio('lTogether', 'lSingle'));


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