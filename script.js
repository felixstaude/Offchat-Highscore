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

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}