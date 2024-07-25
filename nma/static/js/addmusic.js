document.addEventListener('DOMContentLoaded', () => {
    // Get references to the radio buttons and form containers
    const artistRadio = document.getElementById('artist-radio');
    const bandRadio = document.getElementById('band-radio');
    const artistForm = document.getElementById('artist-login');
    const bandForm = document.getElementById('band-login');

    function updateForms() {
        console.log('Updating forms...');
        if (artistRadio.checked) {
            artistForm.style.display = 'block'; // Show artist form
            bandForm.style.display = 'none'; // Hide band form
        } else if (bandRadio.checked) {
            artistForm.style.display = 'none'; // Hide artist form
            bandForm.style.display = 'block'; // Show band form
        } else {
            artistForm.style.display = 'none'; // Hide artist form if none selected
            bandForm.style.display = 'none'; // Hide band form if none selected
        }
    }

    // Initialize visibility based on default checked radio button
    updateForms();

    // Add event listeners to radio buttons
    artistRadio.addEventListener('change', updateForms);
    bandRadio.addEventListener('change', updateForms);
});


function selectGenre(genre) {
    document.getElementById('dropdownButton').textContent = genre;
    document.getElementById('selectedGenre').value = genre;
}

function addEntry(type) {
    var container = document.getElementById(type + 'Container');
    var newEntry = document.createElement('div');
    newEntry.className = 'entry';
    newEntry.innerHTML = '<input type="text" name="' + type + '[]" placeholder="' + (type === 'discography' ? 'Album/Song Title' : 'Award Title') + '">';
    container.appendChild(newEntry);
}

function addPlayerEntry() {
    var container = document.getElementById('playerContainer');
    var newEntry = document.createElement('div');
    newEntry.className = 'player-entry';
    newEntry.innerHTML = '<input type="text" name="players[]" placeholder="Player Embed Code"><input type="text" name="playerDescriptions[]" placeholder="Description">';
    container.appendChild(newEntry);
}
