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

}
document.addEventListener('DOMContentLoaded', function() {

    // color and width when filling out
    let name = document.getElementById('name');
    let solo = document.getElementById('solo');
    let soloSessions = document.getElementById('soloSessions');
    let duo = document.getElementById('duo');
    let duoSessions = document.getElementById('duoSessions');
    let bodycount = document.getElementById('bodycount');
    let bcm = document.getElementById('bcm');
    let bcf = document.getElementById('bcf');
    let bcd = document.getElementById('bcd');
    let weapon = document.getElementById('weapon');
    let single = document.getElementById('single');
    let together = document.getElementById('together');
    let favPornCategory = document.getElementById('favPornCategory');
    let favePornVid = document.getElementById('favePornVid');


    name.addEventListener('input', resizeInput(name));
    solo.addEventListener('input', resizeInput(solo));
    soloSessions.addEventListener('input', resizeInput(soloSessions));
    duo.addEventListener('input', resizeInput(duo));
    duoSessions.addEventListener('input', resizeInput(duoSessions));
    bodycount.addEventListener('input', resizeInput(duoSessions));
    bcm.addEventListener('input', resizeInput(bcm));
    bcf.addEventListener('input', resizeInput(bcf));
    bcd.addEventListener('input', resizeInput(bcd));
    weapon.addEventListener('input', resizeInput(weapon));
    single.addEventListener('input', resizeInput(single));
    together.addEventListener('input', resizeInput(together));
    favPornCategory.addEventListener('input', resizeInput(favPornCategory));
    favePornVid.addEventListener('input', resizeInput(favePornVid));

    function resizeInput(id) {
        return function() {
            id.style.width = id.value.length + 2 + "ch";
            if (id.value.length > 0) {
                id.classList.add('filled');
                id.classList.remove('warning');
            } else if (id.value.length === 0) {
                id.classList.remove('filled');
                id.classList.add('warning');
            }
        };
    }

    // check scroll
    document.addEventListener('scroll', function() {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let width = window.innerWidth;

        let author = document.getElementById('author');
        if((width < 501) && (currentScroll - 190 === documentHeight)) {
            author.classList.add('authorShow');
        } else if ((width > 500) && (currentScroll - 95 === documentHeight)) {
            author.classList.add('authorShow');
        } else {
            author.classList.remove('authorShow');
        }
    })
});