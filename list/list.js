document.addEventListener('DOMContentLoaded', async function() {
    // get user data from api
    async function getUsersData() {
        information.classList.add('loading');

        let sessionID = getCookieValue('sessionID');
        let userlistURL = `http://localhost:8080/api/userlist/data?sessionId=${sessionID}`;

        const usersData = fetch(userlistURL, {
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

        let test1 = [{"username":"test1","profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":"felix","solo":"123","soloSession":"123","duo":"123","duoSession":"123","bodycountMale":"123","bodycountFemale":"213","bodycountDiverse":"3123","weaponBraSize":"5","single":true,"favoritePornCategory":"6123132","favoritePornVideo":"https://youtube.com","sexuality":"bi"},{"username":"test2","profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":null,"solo":null,"soloSession":null,"duo":null,"duoSession":null,"bodycountMale":null,"bodycountFemale":null,"bodycountDiverse":null,"weaponBraSize":null,"single":false,"favoritePornCategory":null,"favoritePornVideo":null,"sexuality":null}];
        console.log(test1)

        return await usersData;
    }

    // create first column
    function createUsernameTable(users) {
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
            
            const desiredOrder = ['customName', 'solo', 'soloSession', 'duo', 'duoSession', 'bodycountMale', 'bodycountFemale', 'bodycountDiverse', 'sexuality', 'weaponBraSize', 'single', 'favoritePornCategory', 'favoritePornVideo'];

            desiredOrder.forEach(key => {
                if (user.hasOwnProperty(key)) {
                    let cell = document.createElement('td');
                    cell.title = key;
                    let className = `${key}`;
                    cell.classList.add(className);

                    switch(key) {
                        case 'customName':
                            cell.textContent = user['customName'];
                            break;
                        case 'solo':
                        case 'soloSession':
                        case 'duo':
                        case 'duoSession':
                        case 'bodycountMale':
                        case 'bodycountFemale':
                        case 'bodycountDiverse':
                        case 'sexuality':
                        case 'weaponBraSize':
                            cell.textContent = user[key];
                            break;
                        case 'single':
                            cell.textContent = user[key] ? 'single' : 'together';
                            className = 'single|together';
                            break;
                        case 'favoritePornCategory':
                            cell.textContent = user[key];
                            break;
                        case 'favoritePornVideo':
                            if (user[key]) {
                                let linkToVideo = `<a class="phLink" id="${user.username}-Link" href="${user[key]}" target="_blank"><img src="phLinkArrow.webp"/> ${user[key]}</a>`;
                                cell.innerHTML = linkToVideo;
                            }
                            break;
                        default:
                            break;
                    }
                    
                    row.appendChild(cell);
                }
            });
            const ratingStars = document.createElement('td');
            ratingStars.innerHTML = `
                <span class="ratingStar starRating5" id="star_5_${user.username}" onclick="chooseStar(star_5_${user.username})"></span>
                <span class="ratingStar starRating4" id="star_4_${user.username}" onclick="chooseStar(star_4_${user.username})"></span>
                <span class="ratingStar starRating3" id="star_3_${user.username}" onclick="chooseStar(star_3_${user.username})"></span>
                <span class="ratingStar starRating2" id="star_2_${user.username}" onclick="chooseStar(star_2_${user.username})"></span>
                <span class="ratingStar starRating1" id="star_1_${user.username}" onclick="chooseStar(star_1_${user.username})"></span>`;
            ratingStars.classList.add('ratingStars');
            
            const ratingSend = document.createElement('td');
            ratingSend.id = `ratingSend${user.username}`;
            ratingSend.classList.add('ratingSend');
            ratingSend.setAttribute('onclick', `sendStarRating('${user.username}')`);
            
            row.appendChild(ratingStars);
            row.appendChild(ratingSend);
            
            tbody.appendChild(row);
        });
    }
    
    // Tabelle erstellen und in das Element mit der ID "tableWrapper" einfügen
    const usersData = await getUsersData();
    createUsernameTable(usersData);
    createUserTable(usersData);

    adjustScrollbar();

    // scroll with inputbar
    document.getElementById('scrollTable').addEventListener('input', function() {
        let scrollInput = document.getElementById('scrollTable').value * 0.01;
        let tableWidth = document.getElementById('tableUserdata').offsetWidth;
        let viewablePart = document.getElementById('tableWrapper').offsetWidth;
        let maxScroll = tableWidth - viewablePart;
        document.getElementById('tableWrapper').scroll(scrollInput * maxScroll,0);
    });

    // set inputbar when user scrolls manually
    document.getElementById('tableWrapper').addEventListener('scroll', function() {
        let scrollInput = document.getElementById('scrollTable');
        let tableWidth = document.getElementById('tableUserdata').offsetWidth;
        let viewablePart = document.getElementById('tableWrapper').offsetWidth;
        let maxScroll = tableWidth - viewablePart;
        let currentScroll = document.getElementById('tableWrapper').scrollLeft;
        let cSP = currentScroll / maxScroll * 100;
        scrollInput.value = cSP;
    });

    // scroll via dragging
    let point1;
    let currentScroll = 0;
    let endScroll;
    document.getElementById('tableWrapper').addEventListener('mousedown', function(e) {
        endScroll = false;
        point1 = e.pageX;
        currentScroll = document.getElementById('tableWrapper').scrollLeft;

        document.getElementById('tableWrapper').style.cursor = 'grabbing';
    });

    document.getElementById('tableWrapper').addEventListener('mousemove', function(e) {
        if(!endScroll) {
            let point2 = e.pageX;
            let diff = point1 - point2;
            document.getElementById('tableWrapper').scroll(currentScroll + diff,0);
        }
    });

    document.getElementById('tableWrapper').addEventListener('mouseup', function() {
        document.getElementById('tableWrapper').style.cursor = '';
        endScroll = true;
    });
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

function sendStarRating(usernameRated) {
    let rating1 = document.getElementById(`star_1_${usernameRated}`).classList;
    let rating2 = document.getElementById(`star_2_${usernameRated}`).classList;
    let rating3 = document.getElementById(`star_3_${usernameRated}`).classList;
    let rating4 = document.getElementById(`star_4_${usernameRated}`).classList;
    let rating5 = document.getElementById(`star_5_${usernameRated}`).classList;

    
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

    let submitCell = document.getElementById(`ratingSend${usernameRated}`);
    let username = getCookieValue('username');

    const finalRating = {username: username, usernameRated: usernameRated, ratingValue: submittedRating};
    console.log(finalRating);

    let sessionID = getCookieValue('sessionID');

    if (sessionID && submittedRating && !submitCell.classList.contains('ratingError') && !submitCell.classList.contains('ratingSuccess')) {
        information.classList.remove('error');
        information.classList.add('loading');
        showError.style.display = '';
        errorCross1.classList.remove('errorCross1');
        errorCross2.classList.remove('errorCross2');

        submitCell.classList.add('ratingSending');

        let sessionID = getCookieValue('sessionID');
        let addRatingURL = `http://localhost:8080/api/rating/add?sessionId=${sessionID}`;

        fetch(addRatingURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: finalRating,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }-
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

function adjustScrollbar() {
    // fit bar to screen
    let userTable = document.getElementById('userTable');
    let scrollTable = document.getElementById('scrollTable');

    if (touchScreen() === true) {
        scrollTable.style.display = "none";
    } else {
        let marginLeft = userTable.offsetWidth;

        scrollTable.style.marginLeft = `${marginLeft}px`;
        scrollTable.style.width = `calc(100% - ${marginLeft}px)`;
    }
}

function touchScreen() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
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