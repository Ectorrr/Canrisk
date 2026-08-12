// Menú hamburguesa de la barra superior
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');

if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        hamburgerBtn.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
}

// Menú lateral (sidebar)
const sidebarBtn = document.getElementById('sidebarBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const menuOverlay = document.getElementById('menuOverlay');

if (sidebarBtn && sidebarMenu && menuOverlay) {
    const toggleSidebar = () => {
        const isOpen = sidebarMenu.classList.toggle('open');
        sidebarBtn.classList.toggle('open', isOpen);
        menuOverlay.classList.toggle('show', isOpen);
    };

    sidebarBtn.addEventListener('click', toggleSidebar);
    menuOverlay.addEventListener('click', toggleSidebar);
}

// Resalta la página en la que estamos, tanto en el menú de arriba como en el lateral
const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.Info-nav a, .sidebar-list a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
        const parentBox = link.closest('.box-II');
        if (parentBox) parentBox.classList.add('active');
    }
});
