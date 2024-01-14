document.getElementById('findSets').addEventListener('click', function() {
    confirmSinglePlayer();
});

function confirmSinglePlayer() {
    if (confirm("Are you in a single-player game? Please use this extension only in single-player games.")) {
        document.dispatchEvent(new CustomEvent('runPopupJs'));
    }
}
