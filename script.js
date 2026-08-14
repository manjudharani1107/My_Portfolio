// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
    
    function updateIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const scrollContainer = document.querySelector('.scroll-container');

    function switchSection(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        sections.forEach(section => {
            section.classList.remove('active-section');
            if ('#' + section.getAttribute('id') === targetId) {
                section.classList.add('active-section');
            }
        });

        const targetSection = document.querySelector(targetId);
        if (targetSection && scrollContainer) {
            scrollContainer.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            switchSection(targetId);
            history.pushState(null, null, window.location.pathname);
        });
    });

    if (window.location.hash) {
        history.pushState(null, null, window.location.pathname);
    }
    
    setTimeout(function() {
        switchSection('#home');
    }, 50);

    function updateActiveOnScroll() {
        if (!scrollContainer) return;
        
        const scrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.clientHeight;
        const scrollPosition = scrollTop + (containerHeight / 2);
        
        let currentId = '#home';

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            
            if (scrollPosition >= top && scrollPosition < bottom) {
                currentId = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentId) {
                link.classList.add('active');
            }
        });

        sections.forEach(section => {
            section.classList.remove('active-section');
            if ('#' + section.getAttribute('id') === currentId) {
                section.classList.add('active-section');
            }
        });
    }

    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateActiveOnScroll);
        setTimeout(updateActiveOnScroll, 300);
    }
});

// Scroll to Projects
document.addEventListener('DOMContentLoaded', function() {
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('projects');
            if (target) {
                document.querySelectorAll('.nav-links a').forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === '#projects');
                });
                document.querySelectorAll('.section').forEach(s => {
                    s.classList.toggle('active-section', s.getAttribute('id') === 'projects');
                });
                document.querySelector('.scroll-container').scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
                history.pushState(null, null, window.location.pathname);
            }
        });
    }
});

// Scroll Down Button
document.addEventListener('DOMContentLoaded', function() {
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const target = document.getElementById('about');
            if (target) {
                document.querySelectorAll('.nav-links a').forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === '#about');
                });
                document.querySelectorAll('.section').forEach(s => {
                    s.classList.toggle('active-section', s.getAttribute('id') === 'about');
                });
                document.querySelector('.scroll-container').scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
                history.pushState(null, null, window.location.pathname);
            }
        });
    }
});

// Email Button - Force open mail client
document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.querySelector('.social-link[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'manjudharani1107@gmail.com';
            window.location.href = 'mailto:' + email;
        });
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Contact Form - Using Button Click (NO POPUP)
// Force Download Resume - JavaScript
// Force Download Resume
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'resume.pdf';  // Your PDF file name
        link.download = 'Manjudharani_R_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});