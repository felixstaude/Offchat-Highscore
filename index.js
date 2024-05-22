window.addEventListener('DOMContentLoaded', function() {
    
    // get user data from api
    let sessionID = getCookieValue('sessionID');
    
    function getUsersData() {
        let usersURL = `http://88.99.161.170:8080/api/userlist/data?sessionId=${sessionID}`;
        information.classList.add('loading');

        fetch(usersURL, {
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
            return data;
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
            username.textContent = `${user.username} | ${user.name}`;

            profileItem.appendChild(userImg);
            profileItem.appendChild(username);

            listWrapper.appendChild(profileItem);
        });
    }
  
    const usersData = getUsersData();
    createUserList(usersData.users);
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