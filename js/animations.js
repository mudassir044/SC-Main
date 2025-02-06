document.addEventListener('DOMContentLoaded', function () {
    // Example of adding a hover animation to buttons
    document.querySelectorAll('button, .service-card').forEach(button => {
        button.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Add logic for other animations and transitions here
});