// / language change

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.menu');

    navToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
});





// function changeLanguage(language) {
//     const translations = {
//         en: {
//             home: 'Home',
//             services: 'Services',
//             aboutUs: 'About Us',
//             blog: 'Blog',
//             contactUs: 'Contact Us',
//             hero: 'Hero Section',
//             service1: 'Service 1',
//             service2: 'Service 2',
//             service3: 'Service 3',
//             service4: 'Service 4',
//             service5: 'Service 5',
//             service6: 'Service 6',
//             service7: 'Service 7',
//             service8: 'Service 8',
//             ourStory: 'Our Story',
//             latestPosts: 'Latest Posts'
//         },
//         es: {
//             home: 'Inicio',
//             services: 'Servicios',
//             aboutUs: 'Sobre Nosotros',
//             blog: 'Blog',
//             contactUs: 'Contáctenos',
//             hero: 'Sección de Héroe',
//             service1: 'Servicio 1',
//             service2: 'Servicio 2',
//             service3: 'Servicio 3',
//             service4: 'Servicio 4',
//             service5: 'Servicio 5',
//             service6: 'Servicio 6',
//             service7: 'Servicio 7',
//             service8: 'Servicio 8',
//             ourStory: 'Nuestra Historia',
//             latestPosts: 'Últimas Publicaciones'
//         },
//         fr: {
//             home: 'Accueil',
//             services: 'Services',
//             aboutUs: 'À Propos de Nous',
//             blog: 'Blog',
//             contactUs: 'Contactez-nous',
//             hero: 'Section Héros',
//             service1: 'Service 1',
//             service2: 'Service 2',
//             service3: 'Service 3',
//             service4: 'Service 4',
//             service5: 'Service 5',
//             service6: 'Service 6',
//             service7: 'Service 7',
//             service8: 'Service 8',
//             ourStory: 'Notre Histoire',
//             latestPosts: 'Derniers Articles'
//         }
//     };
    
//     document.querySelector('.menu li a.active').textContent = translations[language].home;
//     document.querySelector('.menu li:nth-child(2) a').textContent = translations[language].services;
//     document.querySelector('.menu li:nth-child(3) a').textContent = translations[language].aboutUs;
//     document.querySelector('.menu li:nth-child(4) a').textContent = translations[language].blog;
//     document.querySelector('.menu li:nth-child(5) a').textContent = translations[language].contactUs;
//     document.getElementById('hero-text').textContent = translations[language].hero;

//     const serviceDropdown = document.querySelector('.menu li:nth-child(2) .dropdown-content');
//     serviceDropdown.children[0].textContent = translations[language].service1;
//     serviceDropdown.children[1].textContent = translations[language].service2;
//     serviceDropdown.children[2].textContent = translations[language].service3;
//     serviceDropdown.children[3].textContent = translations[language].service4;
//     serviceDropdown.children[4].textContent = translations[language].service5;
//     serviceDropdown.children[5].textContent = translations[language].service6;
//     serviceDropdown.children[6].textContent = translations[language].service7;
//     serviceDropdown.children[7].textContent = translations[language].service8;

//     document.querySelector('.menu li:nth-child(3) .dropdown-content a').textContent = translations[language].ourStory;
//     document.querySelector('.menu li:nth-child(4) .dropdown-content a').textContent = translations[language].latestPosts;
// }




// // language change ends


let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})


// services cards on home page

let item2 = document.querySelectorAll('.slider2 .cards');
let active = 0; // Start with the first slide
let intervalId; // Variable to store the interval ID for automatic slide transition

function loadShow() {
    item2[active].style.transform = `none`;
    item2[active].style.zIndex = 1;
    item2[active].style.filter = 'none';
    item2[active].style.opacity = 1;

    let stt = 0;
    for (let i = active + 1; i < item2.length; i++) {
        stt++;
        item2[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        item2[i].style.zIndex = -stt;
        item2[i].style.filter = 'blur(5px)';
        item2[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        item2[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        item2[i].style.zIndex = -stt;
        item2[i].style.filter = 'blur(5px)';
        item2[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

function startAutoSlide() {
    intervalId = setInterval(() => {
        active = active < item2.length - 1 ? active + 1 : 0;
        loadShow();
    }, 2500); // Change 2500 to adjust the interval (in milliseconds)
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

// Initial load, start automatic slide transition, and add manual navigation event listeners
loadShow();
startAutoSlide();

document.getElementById('nexti').addEventListener('click', () => {
    stopAutoSlide(); // Stop automatic slide transition on manual navigation
    active = active < item2.length - 1 ? active + 1 : 0;
    loadShow();
    startAutoSlide(); // Restart automatic slide transition after manual navigation
});

document.getElementById('previ').addEventListener('click', () => {
    stopAutoSlide(); // Stop automatic slide transition on manual navigation
    active = active > 0 ? active - 1 : item2.length - 1;
    loadShow();
    startAutoSlide(); // Restart automatic slide transition after manual navigation
});

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const result = await response.text();
    alert(result);
});
