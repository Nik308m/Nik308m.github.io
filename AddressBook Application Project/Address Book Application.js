// Update progress bar based on scroll position
function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
}

// Event listener for scroll event to update progress bar
window.addEventListener('scroll', updateProgressBar);