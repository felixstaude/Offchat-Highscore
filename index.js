window.addEventListener('DOMContentLoaded', async function() {
    
    // get user data from api
    let sessionID = getCookieValue('sessionID');
    
    async function getUsersData() {
        let usersURL = `http://88.99.161.170:8080/api/userlist/data?sessionId=${sessionID}`;
        information.classList.add('loading');

        try {
            let response = await fetch(usersURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            let data = await response.json();
            information.classList.remove('loading');
            return data;
        } catch (error) {
            console.error('Failed to fetch: ', error);
            information.classList.remove('loading');
            information.classList.add('error');
            showError.innerHTML = 'Fehler beim Laden der Daten. Probiere es bitte erneut oder teile es uns mit.';
            showError.style.display = 'block';
            errorCross1.classList.add('errorCross1');
            errorCross2.classList.add('errorCross2');
        }
    }
    // create list
    function createUserList(users) {
        users.forEach(user => {
            const listWrapper = document.getElementById('allUsers');

            const profileItem = document.createElement('li');
            profileItem.classList.add('profileListItem');

            const userImg = document.createElement('img');
            userImg.src = user['profilePicture'];
            userImg.alt = 'Profilbild';
            userImg.classList.add('userProfilePicture');

            const username = document.createElement('h4')
            username.textContent = `${user.username} | ${user.customName}`;

            profileItem.appendChild(userImg);
            profileItem.appendChild(username);

            listWrapper.appendChild(profileItem);
        });
    }
    let test1 = [{"username":"test1","profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":"felix","solo":"123","soloSession":"123","duo":"123","duoSession":"123","bodycountMale":"123","bodycountFemale":"213","bodycountDiverse":"3123","weaponBraSize":"5","single":true,"favoritePornCategory":"6123132","favoritePornVideo":"https://youtube.com","sexuality":"bi"},{"username":"test2","profilePicture":"https://yt3.googleusercontent.com/YNyWdRIXEgVHHNJI2q0tyrxujhmVMMRew65ybn30XO7urB_NavrIq-ubjHcgCR_PhW-7Y2OH4w=s176-c-k-c0x00ffffff-no-rj","customName":null,"solo":null,"soloSession":null,"duo":null,"duoSession":null,"bodycountMale":null,"bodycountFemale":null,"bodycountDiverse":null,"weaponBraSize":null,"single":false,"favoritePornCategory":null,"favoritePornVideo":null,"sexuality":null}];

    const usersData = await getUsersData();
    createUserList(await usersData);
});

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