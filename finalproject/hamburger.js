document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
});
