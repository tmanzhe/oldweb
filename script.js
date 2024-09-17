const greetings = [
    "hello!", "你好!", "こんにちは!", "안녕하세요!", "hola!", "bonjour!", "ciao!", "hallo!", "olá!",
    "שלום!", "नमस्ते!", "merhaba!", "สวัสดี!", "ہیلو!", "হ্যালো!", "xin chào!", "szia!",
    "здравствуйте!", "hei!", "salam!", "aloha!", "salut!", "sveiki!", "hej!", "përshëndetje!"
];
const welcome = "welcome to my portfolio";
let currentIndex = 0;
let intervalID;

// Function to change the greeting message
function changeGreeting() {
    const helloElement = document.querySelector("#hello h1");
    const fadeDuration = 75;

    helloElement.classList.add('fade-out');
    setTimeout(() => {
        if (currentIndex < greetings.length) {
            helloElement.innerHTML = greetings[currentIndex];
            helloElement.classList.remove('fade-out');
            helloElement.classList.add('fade-in');
            currentIndex++;
        } else {
            helloElement.classList.add('fade-out');
            setTimeout(() => {
                helloElement.innerHTML = welcome;
                helloElement.classList.remove('fade-out');
                helloElement.classList.add('grow');
            }, fadeDuration);
        }
    }, fadeDuration);
}

// Function to handle the home link click
function handleHomeLinkClick(event) {
    event.preventDefault();
    window.location.href = 'index.html'; // Redirect to index.html
}

// Function to handle scroll direction for header visibility
function handleScroll() {
    let lastScrollTop = 0;
    document.addEventListener('scroll', function() {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        document.getElementById('header').style.top = currentScrollTop > lastScrollTop ? '-70px' : '0';
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}

// Ensure scripts run on page load
document.addEventListener('DOMContentLoaded', function() {
    const helloElement = document.querySelector("#hello h1");
    if (helloElement) {
        helloElement.classList.add('drop-in');
        intervalID = setInterval(changeGreeting, 75);
    }

    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', handleHomeLinkClick);
    }

    handleScroll();

    if (window.location.hash === '#') {
        window.scrollTo({ top: 0, behavior: 'auto' });
        history.replaceState(null, null, window.location.pathname);
    }

    const separatorText = document.querySelector('#seperator-text');
    if (separatorText) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    separatorText.classList.add('fade-in');
                    separatorText.classList.remove('fade-out');
                } else {
                    separatorText.classList.add('fade-out');
                    separatorText.classList.remove('fade-in');
                }
            });
        }, { threshold: 0.5 });
        observer.observe(document.querySelector('.seperator'));
    }
});

// Handle scroll event for progress bar
document.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
});
