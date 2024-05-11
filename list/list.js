document.addEventListener('DOMContentLoaded', async function() {
    // get user data from api
    async function getUsersData() {
        information.classList.add('loading');
        
        let usersURL = 'http://localhost:8080/api/userlist/data';

        const usersData = fetch(usersURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                information.classList.remove('loading');
                return response.json();
            })
            .catch(error => {
                console.error('Failed to fetch: ', error);
                information.classList.remove('loading');
                information.classList.add('error');
                showError.innerHTML = 'Fehler beim Laden der Daten. Probiere es bitte erneut oder teile es uns mit.';
                showError.style.display = 'block';
                errorCross1.classList.add('errorCross1');
                errorCross2.classList.add('errorCross2');    
            });

        //console.log(await usersData);

        let test1 = [{"username":"test1","passwordHash":"d46342243ae1d19335ab91026a831e50410dfbe6a5ddac3f66f5b2ec37c47bde5515c1f123ca5a2fc921689fef9766e4e3ad1d6456eaac5ccc98c97e32c5e4a3","passwordSalt":"69f9419df0910033a86b36ae53d21084","sessionID":"bbce15d4fab4455b9bf3185ad75ad871356fdff0fd6e46fe9d85a11405833782","profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":"felix","solo":"123","soloSession":"123","duo":"123","duoSession":"123","bodycountMale":"123","bodycountFemale":"213","bodycountDiverse":"3123","weaponBraSize":"5","single":true,"favoritePornCategory":"6123132","favoritePornVideo":null,"sexuality":"bi"},{"username":"test2","passwordHash":"dd9ee55ffd1fbfd315bc4798d9ff63c53fd2ce37a437c5b5e369fa45b10c48897371e0f867525f7db5069656a1bb7ee10d67d33f471deac9971c8f66bc5a622d","passwordSalt":"363aa7c79679fc5a59b7e8663714610e","sessionID":null,"profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":null,"solo":null,"soloSession":null,"duo":null,"duoSession":null,"bodycountMale":null,"bodycountFemale":null,"bodycountDiverse":null,"weaponBraSize":null,"single":false,"favoritePornCategory":null,"favoritePornVideo":null,"sexuality":null}];
        console.log(test1)

        return await usersData;
    }

    // create first column
    function createUserameTable(users) {
        let tbody = document.getElementById('tableUsername');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add('rowUsername');
            const profileCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = user['profilePicture'];
            img.alt = 'Profilbild';
            img.style.maxWidth = '50px'; // max width for the picture
            profileCell.appendChild(img);
            row.appendChild(profileCell);
            for (const key in user) {
                if (user.hasOwnProperty(key) && key === 'username') {
                    const cell = document.createElement('td');
                    cell.textContent = user[key];
                    // add id and class to every cell
                    const className = `${user.username}-username`;
                    cell.id = className;
                    cell.classList.add(className);
                    row.appendChild(cell);
                }
            }
            tbody.appendChild(row);
        });
    }

    // create table
    function createUserTable(users) {
        let tbody = document.getElementById('tableUserdata');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add('rowUserdata');
            
            for (const key in user) {
                if (user.hasOwnProperty(key) && key != 'username' && key != 'profilePicture' && key != 'favoritePornVideo' && key != 'single' && key != 'together') {
                    const cell = document.createElement('td');
                    cell.textContent = user[key];
                    // add id and class to cell
                    let className = `${key}`;
                    // cell.id = className;
                    cell.classList.add(className);
                    cell.title = key;
                    row.appendChild(cell);
                } else if (user.hasOwnProperty(key) && key === 'favoritePornVideo') {
                    const cell = document.createElement('td');
                    let linkToVideo = `<a class="phLink" id="${user.username}-Link" href="${user[key]}" target="_blank"><img src="phLinkArrow.webp"/> ${user[key]}</a>`
                    cell.innerHTML = linkToVideo;
                    // ID und Klasse für die Zelle hinzufügen
                    let className = `${key}`;
                    // cell.id = className;
                    cell.classList.add(className);
                    cell.title = key;
                    row.appendChild(cell);
                } else if (user.hasOwnProperty(key) && key === 'single') {
                    const cell = document.createElement('td');
                    cell.textContent = 'single';
                    let className = `single|together`;
                    // cell.id = className;
                    cell.classList.add(className);
                    cell.title = key;
                    row.appendChild(cell);
                } else if (user.hasOwnProperty(key) && key === 'together') {
                    const cell = document.createElement('td');
                    cell.textContent = 'together';
                    let className = `single|together`;
                    // cell.id = className;
                    cell.classList.add(className);
                    cell.title = key;
                    row.appendChild(cell);
                }
            }
            const ratingStars = document.createElement('td');
            ratingStars.innerHTML = `
            <span class="ratingStar starRating5" id="star_5_${user.username}" onclick="chooseStar(star_5_${user.username})"></span>
            <span class="ratingStar starRating4" id="star_4_${user.username}" onclick="chooseStar(star_4_${user.username})"></span>
            <span class="ratingStar starRating3" id="star_3_${user.username}" onclick="chooseStar(star_3_${user.username})"></span>
            <span class="ratingStar starRating2" id="star_2_${user.username}" onclick="chooseStar(star_2_${user.username})"></span>
            <span class="ratingStar starRating1" id="star_1_${user.username}" onclick="chooseStar(star_1_${user.username})"></span>`;
            ratingStars.classList.add('ratingStars');

            const ratingSend = document.createElement('td');      // change color when hovering, when send and when sumbission successfull -- airplane starting, flying and landing
            ratingSend.id = `ratingSend${user.username}`
            ratingSend.classList.add('ratingSend');
            ratingSend.setAttribute('onclick', `sendStarRating('${user.username}')`);

            row.appendChild(ratingStars);
            row.appendChild(ratingSend);

            tbody.appendChild(row);
        });
    }
    
    
    // Tabelle erstellen und in das Element mit der ID "tableWrapper" einfügen
    const usersData = await getUsersData();
    createUserTable(usersData);
    createUserameTable(usersData);
    setSameHeight(usersData);


    // set same height for td from username und userdata
    function setSameHeight(users) {
        users.forEach(user => {
            let heightUsername = document.getElementById(`${user.username}-username`);
            let heightUserdata = document.getElementById(`${user.username}-Link`).offsetHeight;
            let widthStarSend = document.getElementById(`ratingSend${user.username}`);

            widthStarSend.style.width = `${heightUserdata}px`;
            heightUsername.style.height = `${heightUserdata}px`;
        });
    }
});


// logic for rating --> change style and submission
function chooseStar(element) {

    let elementID = element.id;
    let regex1 = /star_1_.*/;
    let regex2 = /star_2_.*/;
    let regex3 = /star_3_.*/;
    let regex4 = /star_4_.*/;
    let regex5 = /star_5_.*/;

    let regexSplitter = /_\d_/;
    const idArray = elementID.split(regexSplitter);
    let username = idArray[1];

    let submitCell = document.getElementById(`ratingSend${username}`);
    submitCell.classList.remove('ratingSuccess');
    submitCell.classList.remove('ratingError');

    let star1 = document.getElementById(`star_1_${username}`);
    let star2 = document.getElementById(`star_2_${username}`);
    let star3 = document.getElementById(`star_3_${username}`);
    let star4 = document.getElementById(`star_4_${username}`);
    let star5 = document.getElementById(`star_5_${username}`);

    if (!element.classList.contains('starSelected')) {
        if (regex1.test(elementID)) {
            element.classList.add('starSelected');
        } else if (regex2.test(elementID)) {
            star1.classList.add('starSelected');
            element.classList.add('starSelected');
        } else if (regex3.test(elementID)) {
            star1.classList.add('starSelected');
            star2.classList.add('starSelected');
            element.classList.add('starSelected');
        } else if (regex4.test(elementID)) {
            star1.classList.add('starSelected');
            star2.classList.add('starSelected');
            star3.classList.add('starSelected');
            element.classList.add('starSelected');
        } else if (regex5.test(elementID)) {
            star1.classList.add('starSelected');
            star2.classList.add('starSelected');
            star3.classList.add('starSelected');
            star4.classList.add('starSelected');
            element.classList.add('starSelected');
        }
    } else {
        if (regex4.test(elementID)) {
            star5.classList.remove('starSelected');
        } else if (regex3.test(elementID)) {
            star4.classList.remove('starSelected');
            star5.classList.remove('starSelected');
        } else if (regex2.test(elementID)) {
            star3.classList.remove('starSelected');
            star4.classList.remove('starSelected');
            star5.classList.remove('starselected');
        } else if (regex1.test(elementID)) {
            star2.classList.remove('starSelected');
            star3.classList.remove('starSelected');
            star4.classList.remove('starSelected');
            star5.classList.remove('starSelected');
        }
    }
}

function sendStarRating(username) {
    let rating1 = document.getElementById(`star_1_${username}`).classList;
    let rating2 = document.getElementById(`star_2_${username}`).classList;
    let rating3 = document.getElementById(`star_3_${username}`).classList;
    let rating4 = document.getElementById(`star_4_${username}`).classList;
    let rating5 = document.getElementById(`star_5_${username}`).classList;

    
    let submittedRating;
    if (rating5.contains('starSelected')) {
        submittedRating = 5;
    } else if (rating4.contains('starSelected')) {
        submittedRating = 4;
    } else if (rating3.contains('starSelected')) {
        submittedRating = 3;
    } else if (rating2.contains('starSelected')) {
        submittedRating = 2;
    } else if (rating1.contains('starSelected')) {
        submittedRating = 1;
    } else {
        console.log('error, please choose rating');
    }

    let submitCell = document.getElementById(`ratingSend${username}`);

    let sessionID = getCookieValue('sessionID');
    const finalRating = {sessionid: sessionID, username: username, rating: submittedRating};

    console.log(sessionID, finalRating);
    if (sessionID && submittedRating && !submitCell.classList.contains('ratingError') && !submitCell.classList.contains('ratingSuccess')) {
        information.classList.remove('error');
        information.classList.add('loading');
        showError.style.display = '';
        errorCross1.classList.remove('errorCross1');
        errorCross2.classList.remove('errorCross2');


        submitCell.classList.add('ratingSending');

        fetch('http://localhost:8080/api/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(finalRating),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                information.classList.remove('loading');
                return response.json();
            })
            .then(data => {
                if (data.success === true) {
                    console.log(finalRating);
                    submitCell.classList.remove('ratingSending');
                    submitCell.classList.add('ratingSuccess');
                }
            })
            .catch(error => {
                console.error('Failed to fetch: ', error);
                submitCell.classList.remove('ratingSending');
                submitCell.classList.add('ratingError');

                information.classList.add('error');
                showError.innerHTML = 'Fehler beim Senden. Probiere es bitte erneut oder teile es uns mit.'
                showError.style.display = 'block';
                errorCross1.classList.add('errorCross1');
                errorCross2.classList.add('errorCross2');        
            })
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