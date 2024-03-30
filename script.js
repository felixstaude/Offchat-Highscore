function submitForm() {
    const formData = {
        name: document.getElementById('name').value,
        solo: document.getElementById('solo').value,
        soloSessions: document.getElementById('soloSessions').value,
        duo: document.getElementById('duo').value,
        duoSessions: document.getElementById('duoSessions').value,
        bodycount: document.getElementById('bodycount').value,
        bcm: document.getElementById('bcm').value,
        bcf: document.getElementById('bcf').value,
        bcd: document.getElementById('bcd').value,
        weapon: document.getElementById('weapon').value,
        braSize: document.getElementById('braSize').value,
        single: document.getElementById('single').value,
        together: document.getElementById('together').value,
        favPornCategory: document.getElementById('favPornCategory').value,
        favePornVid: document.getElementById('favePornVid').value
    };

    fetch('http://localhost:8080/api/users', {
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
