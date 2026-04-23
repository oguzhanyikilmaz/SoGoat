document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const catalogBtn = document.getElementById('catalog-btn');
    const pdfSection = document.getElementById('pdf-viewer');
    const closePdf = document.getElementById('close-pdf');
    const mainContent = document.getElementById('main-content');
    
    // Toggle PDF Viewer
    if (catalogBtn) {
        catalogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            pdfSection.classList.add('active');
            mainContent.style.transform = 'scale(0.95)';
            mainContent.style.opacity = '0.3';
        });
    }

    closePdf.addEventListener('click', () => {
        pdfSection.classList.remove('active');
        mainContent.style.transform = 'scale(1)';
        mainContent.style.opacity = '1';
    });
    
    // Subtle mouse movement parallax effect for the logo
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        
        const logo = document.querySelector('.logo-image');
        if (logo && !pdfSection.classList.contains('active')) {
            logo.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        }
    });
});
