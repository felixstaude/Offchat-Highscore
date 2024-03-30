function submitForm() {
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
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Failed to fetch: ', error));
}

document.addEventListener('DOMContentLoaded', function() {
        let pag = document.getElementById('pag');
 
        pag.addEventListener('click', function() {
            document.getElementById('author').classList.toggle('authorShow');
        });

        pag.addEventListener('mouseover', function() {
            //let pag = document.getElementById('pag');
            pag.classList.add('paghover');
        });

        pag.addEventListener('mouseout', function() {
            let pag = document.getElementById('pag');
            pag.classList.remove('paghover');
        });
});