window.onload = getFormData;

function getFormData() {
    information.classList.add('loading');

    let sessionID = getCookieValue('sessionID');
    let userURL = 'http://localhost:8080/api/user/data?sessionId=' + sessionID;

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
        console.log(data);
        fillForm(data);
    })
    .catch(error => {
        console.error('Failed to fetch: ', error);
        information.classList.remove('loading');
        information.classList.add('error');
        showError.innerHTML = 'Fehler beim Laden deiner Daten. Probiere es bitte erneut oder teile es uns mit.';
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

function fillForm(data) {
    let nameV = document.getElementById('name');
    let profilePictureV = document.getElementById('profilePicture');
    let soloV = document.getElementById('solo');
    let soloSessionsV = document.getElementById('soloSessions');
    let duoV = document.getElementById('duo');
    let duoSessionsV = document.getElementById('duoSessions');
    //let bodycountV = document.getElementById('bodycount');
    let bcmV = document.getElementById('bcmale');
    let bcfV = document.getElementById('bcfemale');
    let bcdV = document.getElementById('bcdiverse');
    let sexualityV = document.getElementById('sexuality');
    let weaponV = document.getElementById('weapon-bra-size');
    let singleC = document.getElementById('single');
    let togetherC = document.getElementById('together');
    let favePornCategoryV = document.getElementById('favePornCategory');
    let favePornVidV = document.getElementById('favePornVid');

    nameV.value = data.customName;
    profilePictureV.value = data.profilePicture;
    soloV.value = data.solo;
    soloSessionsV.value = data.soloSession;
    duoV.value = data.duo;
    duoSessionsV.value = data.duoSession;
    //bodycountV.value = data.bodycount;
    bcmV.value = data.bodycountMale;
    bcfV.value = data.bodycountFemale;
    bcdV.value = data.bodycountDiverse;
    sexualityV.value = data.sexuality;
    weaponV.value = data.weaponBraSize;
    
    if (data.single === true) {
        singleC.checked = true;
        document.getElementById('lSingle').classList.add('checked');
    } else if (data.together === true) {
        togetherC.checked = true;
        document.getElementById('lSingle').classList.add('checked');
    } else {
        console.log('fehler, konnte nicht checken')
    }
    favePornCategoryV.value = data.favoritePornCategory;
    favePornVidV.value = data.favoritePornVideo;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); 

    form.addEventListener('submit', function(event) {
        console.log('Form submitted');
        event.preventDefault();
        submitForm();
    });
});

function submitForm() {
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
    let singleC = document.getElementById('single').checked;
    let togetherC = document.getElementById('together').checked;
    let favePornCategoryV = document.getElementById('favePornCategory').value;
    let favePornVidV = document.getElementById('favePornVid').value;
    
    if (nameV != '' && profilePictureV != '' && soloV != '' && soloSessionsV != '' && duoV != '' && duoSessionsV != '' && bodycountV != '' && bcmV != '' && bcfV != '' && bcdV != '' && sexualityV != '' && weaponV !='' && (singleC === true || togetherC === true) && favePornCategoryV != '' && favePornVidV != '') {
        console.log('submission correct');
        const formData = {
            username: usernameC,
            customName: nameV,
            profilePicture: profilePictureV,
            solo: soloV,
            soloSessions: soloSessionsV,
            duo: duoV,
            duoSessions: duoSessionsV,
            bodycount: bodycountV,
            bodycountMale: bcmV,
            bodycountFemale: bcfV,
            bodycountDiverse: bcdV,
            sexuality: sexualityV,
            weaponBraSize: weaponV,
            single: singleC,
            together: togetherC,
            favoritePornCategory: favePornCategoryV,
            favoritePornVideo: favePornVidV
        };

        information.classList.remove('error');
        information.classList.add('loading');
        showError.style.display = '';
        errorCross1.classList.remove('errorCross1');
        errorCross2.classList.remove('errorCross2');


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
            return response.json();
        })
        .then(data => {
            information.classList.remove('loading');
            console.log(data);
        })
        .catch(error => {
            console.error('Failed to fetch: ', error);
            information.classList.remove('loading');
            information.classList.add('error');
            showError.innerHTML = "Fehler, umgehend Tech-Support aufsuchen 🤖"
            showError.style.display = 'block';
            errorCross1.classList.add('errorCross1');
            errorCross2.classList.add('errorCross2');    
        })
    } else {
        console.log(profilePictureV);
        information.classList.remove('loading');
        information.classList.add('error');
        showError.innerHTML = 'Bitte fülle alle Felder aus 🤖"';
        showError.style.display = 'block';
        errorCross1.classList.add('errorCross1');
        errorCross2.classList.add('errorCross2');
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // color and width when filling out
    let name = document.getElementById('name');
    let profilePicture = document.getElementById('profilePicture');
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
    let favePornCategory = document.getElementById('favePornCategory');
    let favePornVid = document.getElementById('favePornVid');


    name.addEventListener('input', resizeInput(name));
    profilePicture.addEventListener('input', resizeInput(profilePicture));
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
            x.classList.add('checked');
            y.classList.remove('checked');
        };
    }

    document.getElementById('lSingle').addEventListener('click', checkRadio('lSingle', 'lTogether'));
    document.getElementById('lTogether').addEventListener('click', checkRadio('lTogether', 'lSingle'));
});