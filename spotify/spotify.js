window.addEventListener('DOMContentLoaded', function() {

    // check cookie
    let cookiePref = getCookieValue('cookies');
    if (cookiePref === 'all') {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        head.appendChild(script);
        spLoginReferer();
    } else if (cookiePref === 'necessary') {
        alert('Bitte aktualisiere deine Cookie-Preferenzen, damit du diesen Service nutzen kannst.')
        document.cookie = `cookies=;path=/`;
        window.location.reload();
    }

    function spLoginReferer() {
        // check spotify login, else refer to login
        let spLoggedIn = getCookieValue('spLogin');
        if (spLoggedIn != 'true') {
            window.location.replace('/spotify/login.html');
        }

        // when coming back
        const urlParams = new URLSearchParams(window.location.search);
        let referer = urlParams.get('spl');

        spLoggedIn = getCookieValue('spLogin');
        if (referer === 'true' && spLoggedIn === 'true') {
            alert('spotify login success');
            window.location.replace('/spotify/');
        }

        //check for userlogin to offchathighscore
        let sessionID = getCookieValue('sessionID');
        if (sessionID) {
            invLink.href = 'https://open.spotify.com/playlist/1SeTD8IwM7nFwMiWx0Hkjh?si=12d96bf99c77485c&pt=55334ab84a23fc3a830394b237063f6e';
        }
        getPlaylistTracks();
        getCurrentUser();
    }

    unlinkSpotifyHeadline.addEventListener('click', function() {
        unlinkSpotify.classList.toggle('unlinkSpotifyShow');
    });

    // resize and color url input
    let addSong = document.getElementById('addSong');
    addSong.addEventListener('input', resizeInput(addSong));

    function resizeInput(id) {
        return function() {
            id.style.width = id.value.length + 'ch';
            if (id.value.length > 0) {
                id.classList.add('filled');
                id.classList.remove('warning');
            } else if (id.value.length === 0) {
                id.classList.remove('filled');
                id.classList.add('warning');
            }
        };
    }

    //
});

async function getPlaylistTracks() {
    let url = 'https://api.spotify.com/v1/playlists/1SeTD8IwM7nFwMiWx0Hkjh/tracks';
    let spAccessToken = localStorage.getItem('spAccessToken');
    return await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + spAccessToken
        } 
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        //console.log(data);
        createList(data.items);
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

function createList(data) {
    let ul = document.getElementById('listWrapper');
    ul.innerHTML = '';
    data.forEach(async items => {
        const row = document.createElement('tr');
        row.classList.add('rowSong');
        row.id = items.track.id;
        row.setAttribute('onclick', `playSong('${items.track.id}')`);

        // cover with play button
        const imgTD = document.createElement('td');
        const imgContainer = document.createElement('div');
        imgContainer.innerHTML = '<div class="playArrow1"></div><div class="playArrow2"></div>';
        imgContainer.classList.add('coverContainer');

        const img = document.createElement('img');
        img.src = items.track.album.images[2].url;
        img.classList.add('trackCover');

        imgContainer.appendChild(img);
        imgTD.appendChild(imgContainer);

        // name and artists
        const information = document.createElement('td');
        const name = document.createElement('span');
        name.textContent = items.track.name;     
        information.appendChild(name);

        const artists = items.track.artists;
        artists.forEach(artists => {
            const artist = document.createElement('span');
            artist.textContent = ` - ${artists.name}`;
            information.appendChild(artist);
        });

        const userName = document.createElement('td');
        const addedBy = await getUserInfo(items.added_by.id);
        userName.innerHTML = addedBy;
        userName.classList.add('addedBy');

        // all together
        row.appendChild(imgTD);
        row.appendChild(information);
        row.appendChild(userName);
        listWrapper.appendChild(row);        
    });
}

async function getUserInfo(userID) {
    let spAccessToken = localStorage.getItem('spAccessToken');
    let userName;

    return await fetch(`https://api.spotify.com/v1/users/${userID}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + spAccessToken
        } 
    })
    .then(response => {
        return response.json();
    })
    .then(user => {
        userName = user.display_name;
        return userName;
    })
}

let currentUserID;

async function getCurrentUser() {
    let spAccessToken = localStorage.getItem('spAccessToken');

    return await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + spAccessToken
        } 
    })
    .then(response => {
        return response.json();
    })
    .then(currentUser => {
        currentUserID = currentUser.id;
        console.log(`You are currently logged in as ${currentUser.display_name} | ${currentUser.id}`);
    })
}

async function getTrackInfo(songID) {
    let spAccessToken = localStorage.getItem('spAccessToken');
    let url = `https://api.spotify.com/v1/tracks/${songID}`

    return await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + spAccessToken
        } 
    })
    .then(response => {
        return response.json();
    })
    .then(songInfo => {
        return songInfo;
    })
}

async function preparePlayer() {
    let spAccessToken = localStorage.getItem('spAccessToken');

    let response = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + spAccessToken
        }
    });

    if (!response.ok) {
        throw new Error('Failed to retrieve user playback state');
    }

    let data = response.json();

    // check if user is already listening to spotify and pause it
    if (data && data.is_playing) {
        await fetch('https://api.spotify.com/v1/me/player/pause', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + spAccessToken
            }
        });
    }
}

async function playSong(songID) {
    let spAccessToken = localStorage.getItem('spAccessToken');
    let trackURI =  [`spotify:track:${songID}`];

    await preparePlayer();

    // play song
    let playResponse = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + spAccessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: trackURI
        })
    });

    if (!playResponse.ok) {
        throw new Error('Failed to play the song');
    }
    const trackInfo = await getTrackInfo(songID);
    let trackName = trackInfo.name;
    console.log(`plays '${trackName}' with ID '${songID}'`);    
}

async function startPlaylist() {
    let spAccessToken = localStorage.getItem('spAccessToken');
    let playlistURI =  'spotify:playlist:1SeTD8IwM7nFwMiWx0Hkjh';

    await preparePlayer();

    // start playlist
    let playResponse = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + spAccessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            context_uri: playlistURI
        })
    });

    if (!playResponse.ok) {
        throw new Error('Failed to play the song');
    } else if (playResponse.ok === true) {
        console.log('started playlist');
}
}

async function changeToWebPlayer() {
    let spAccessToken = localStorage.getItem('spAccessToken');
    return await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + spAccessToken,
            'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({ device_ids: [deviceID]})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

let deviceID;

window.onSpotifyWebPlaybackSDKReady = () => {
    // connect with player
    let token = localStorage.getItem('spAccessToken');
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    })
    // Ready
    player.addListener('ready', ({ device_id }) => {
        deviceID = device_id;
        console.log('Ready with Device ID', device_id);
        changeToWebPlayer();
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // errors
    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
        alert('Du musst "Autoplay" in den Browereinstellungen aktivieren,damit Spotify Musik spielen kann.')
      });

    player.setName('Offchat-Highscore');

    player.connect();

    // once connected
    // pause/play player and next track
    window.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            event.preventDefault();
            player.togglePlay();
        } else if (event.key === 'N') {
            player.nextTrack();
        }
    });

    // change volume of the player
    volumeControl.addEventListener('input', function() {
        let volume = Math.round(volumeControl.value) * 0.01;
        changeVolume(volume);
    })

    function changeVolume(volume) {
        showVolume.innerHTML = `${Math.round(volume * 100)} %`;
        player.setVolume(volume)
    }
};

async function currentState() {
    let spAccessToken = localStorage.getItem('spAccessToken');

    if(deviceID) {
        return await fetch('https://api.spotify.com/v1/me/player', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spAccessToken
            } 
        })
        .then(response => {
            return response.json();
        })
        .then(async currentStatus => {
            if (currentStatus.is_playing === true) {
                const allRows = Array.from(document.getElementsByClassName('rowSong'));
                const playlistInfo = await getPlaylistInfo();

                let songIncluded = false;
                for (const element of playlistInfo) {
                    if (element.track.id === currentStatus.item.id) {
                        songIncluded = true;
                        break;
                    }
                }

                if (songIncluded === true) {
                    allRows.forEach(element => {
                        element.classList.remove('playingSong');
                    });
                    let trackID = document.getElementById(currentStatus.item.id);
                    trackID.classList.add('playingSong');
                    showStatus.innerHTML = `spielt ${currentStatus.item.name}`;
                } else {
                    showStatus.innerHTML = `spielt ${currentStatus.item.name}<br/>- nicht in Playlist enthalten -`;
                }
            } else if (currentStatus.is_playing === false) {
                showStatus.innerHTML = 'ist gerade pausiert';
            }
        })
    }
}

function loop() {currentState();}
setInterval(loop, 1000);

//add songs to the playlist
async function getSongID() {
    let songURL = document.getElementById('addSong').value;
    let mustFit = /\/track\/([a-z]|[A-Z]|[0-9])*/;
    if (mustFit.test(songURL)) {
        console.log('songurl correct');
        songURLInfo.innerHTML = '&nbsp;';
        const songArray1 = songURL.split('/track/');
        const songArray2 = songArray1[1].split('?');
        let songID = songArray2[0];
        
        const playlistInfo = await getPlaylistInfo();

        // check if song is already in the playlist
        let songIncluded = false;
        for (const element of playlistInfo) {
            if (element.track.id === songID) {
                songIncluded = true;
                break;
            }
        }

        // check how many songs a user has added
        let songsByUser = 0;
        let userAtLimit = false;
        for (const element of playlistInfo) {
            if (element.added_by.id === currentUserID) {
                songsByUser = songsByUser + 1;
            }
        }

        if (songsByUser >= 5) {
            userAtLimit = true;
        }

        if (songIncluded === true && userAtLimit === false) {
            songURLInfo.innerHTML = 'Dieser Song wurde bereits hinzugefügt.';
        } else if (songIncluded === true && userAtLimit === true) {
            songURLInfo.innerHTML = 'Dieser Song wurde schon hinzugefügt. Zudem hast du das Limit von fünf Songs erreicht.';
        } else if (songIncluded === false && userAtLimit === true) {
            songURLInfo.innerHTML = 'Du hast deine Limit von fünf Songs erreicht.';   
        } else if (songIncluded === false && userAtLimit === false) {

            // add song to playlist
            let url = `https://api.spotify.com/v1/playlists/1SeTD8IwM7nFwMiWx0Hkjh/tracks`;
            const body = JSON.stringify({ "uris": [`spotify:track:${songID}`] });
            console.log(body);
        
            await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + spAccessToken
                },
                body: body
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload();
            })        
        }
    } else {
        songURLInfo.innerHTML = 'die angegebene URL ist kein Song von Spotify';
    }
}

async function getPlaylistInfo() {
    let url = 'https://api.spotify.com/v1/playlists/1SeTD8IwM7nFwMiWx0Hkjh/tracks';
    let spAccessToken = localStorage.getItem('spAccessToken');
    return await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + spAccessToken
        } 
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data.items;
    })
}

function spDeleteCookies() {
    document.cookie = `spAccessToken=;path=/`;
    document.cookie = `spRefreshAccessToken=;path=/`;
    document.cookie = `spRefreshToken=;path=/`;
    document.cookie = `spLogin=;path=/`;
    window.location.replace('/');
}