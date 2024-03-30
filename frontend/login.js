window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        submitForm();
    }
});

function submitForm() {
    console.log('submit');
    let information = document.getElementById('information');
    information.classList.add('loading');

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/login', {
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
}

document.addEventListener('DOMContentLoaded', function() {
        let pag = document.getElementById('pag');
 
        pag.addEventListener('click', function() {
            document.getElementById('author').classList.toggle('authorShow');
        });

        pag.addEventListener('mouseover', function() {
            pag.classList.add('paghover');
        });

        pag.addEventListener('mouseout', function() {
            pag.classList.remove('paghover');
        });
});