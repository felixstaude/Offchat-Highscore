window.onload = spLogin;


async function spLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    let usercode = urlParams.get('code');
    let loggedIn = getCookieValue('spLogin');
    let onloadTime = new Date().getTime();
    console.log(usercode);
    let clientId = '04ea98b78463480aaa84230ec3e319aa';
    let redirectUri = 'http://88.99.161.170/spotify/login.html';

    if (!usercode && loggedIn != 'true') {      //get usercode to url (user has to log in and allow usage)
        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }
        
        const codeVerifier  = generateRandomString(128);

        const sha256 = async (plain) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }


        const base64encode = (input) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }

        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);


        // anfrage
        const scope = 'user-read-private user-read-playback-state user-read-currently-playing user-modify-playback-state streaming playlist-modify-public playlist-modify playlist-modify-private';
        const authUrl = new URL('https://accounts.spotify.com/authorize')

        window.localStorage.setItem('code_verifier', codeVerifier);

        const params =  {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    } else if (usercode && loggedIn != 'true') {        // get token for further fun
        console.log('fetch for access token');
        let codeVerifier = localStorage.getItem('code_verifier');
        let url = 'https://accounts.spotify.com/api/token';
        
        const bodyString = new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: usercode,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
          });

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyString,
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
            window.location.replace('/spotify/?spl=true');
            return data;
        })
        .catch(error => {
            console.error('Failed to fetch: ', error);
        });
    } else {
        alert('Du bist bereits mit Spotify verbunden, was machst du hier?');
        window.location.replace('/spotify');
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