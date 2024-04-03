document.addEventListener('DOMContentLoaded', function() {
    // get user data from api
    function getUsersData() {
        let usersURL = 'http://localhost:8080/api/userlist/data';

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
        .catch(error => {
            console.error('Failed to fetch: ', error);
        });
        return data;
    }
    // create firt column
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