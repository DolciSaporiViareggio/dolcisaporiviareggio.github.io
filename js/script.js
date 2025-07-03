document.addEventListener('DOMContentLoaded', function() {

    // 1. Gestione Menu Laterale
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    openMenuBtn.addEventListener('click', () => {
        sideMenu.style.left = '0';
        overlay.style.display = 'block';
    });

    const closeMenu = () => {
        sideMenu.style.left = '-280px';
        overlay.style.display = 'none';
    };

    closeMenuBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // 2. Slider di Immagini
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;
    
    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }
    
    if (images.length > 0) {
        setInterval(showNextImage, 3000); // Cambia immagine ogni 3 secondi
    }

    // 3. Status di Apertura
    const statusContainer = document.getElementById('store-status-text');

    function isTimeInRange(now, startStr, endStr) {
        const start = new Date();
        const [startHours, startMinutes] = startStr.split(':');
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date();
        const [endHours, endMinutes] = endStr.split(':');
        end.setHours(endHours, endMinutes, 0, 0);

        return now >= start && now <= end;
    }

    function updateStoreStatus() {
        const now = new Date();
        const day = now.getDay(); // 0=Domenica, 1=Lunedì, ..., 6=Sabato
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        let isOpen = false;

        if (day >= 1 && day <= 5) { // Lun-Ven
            if (isTimeInRange(now, '06:30', '14:00') || isTimeInRange(now, '16:00', '20:00')) {
                isOpen = true;
            }
        } else if (day === 6) { // Sabato
            if (isTimeInRange(now, '06:30', '14:00')) {
                isOpen = true;
            }
        }
        // Domenica (day === 0) è sempre chiuso

        let statusText, statusClass;
        if (isOpen) {
            statusText = 'APERTI';
            statusClass = 'status-open';
        } else {
            statusText = 'CHIUSI';
            statusClass = 'status-closed';
        }

        if (statusContainer) {
            statusContainer.innerHTML = `Sono le ${timeStr} e al momento siamo <span class="${statusClass}">${statusText}</span>`;
        }
    }

    updateStoreStatus();
    setInterval(updateStoreStatus, 60000); // Aggiorna ogni minuto
});
