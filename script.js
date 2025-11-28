document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault(); // Empêche le comportement de saut immédiat
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if(target){

            target.scrollIntoView({ behavior: 'smooth', block: 'start'}); 
            // Met à jour l'URL sans recharger la page
            history.replaceState(null, '', '#' + id); 
        }
    })
});

const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

// Sélectionne toutes les sections de contenu qui ont un ID
const sections = Array.from(document.querySelectorAll('main [id]'));

function updateActiveLink() {
    let currentSectionId = ''; 

    const scrollPosition = window.scrollY + 120; 

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
            // Si oui, on stocke son ID. Comme on boucle de haut en bas, 
            // le dernier ID stocké sera la section la plus basse/récente 
            // qui est en haut de la fenêtre.
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        // Vérifie si le lien correspond à l'ID de la section la plus visible
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
        }
    });
}


updateActiveLink(); 

window.addEventListener('scroll', updateActiveLink);



//Dark & Light features
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const localStorageKey = 'user-theme';
const savedTheme = localStorage.getItem(localStorageKey);
console.log(savedTheme);

function initTheme(){
    
    if(savedTheme === 'light' || savedTheme === 'dark'){
        changeTheme(savedTheme);
    } else {
        changeTheme('dark');
    }
}

function changeTheme(themeName){
    if(themeName === 'light'){
        body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        //sauvegarder le theme 
        localStorage.setItem(localStorageKey, 'light');
    } else {
        body.classList.remove('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem(localStorageKey, 'dark');
    }
}


initTheme();

themeToggleBtn.addEventListener('click', () =>{
    if(body.classList.contains('light-theme')){
        changeTheme('dark');
    } else {
        changeTheme('light');
    }
});
