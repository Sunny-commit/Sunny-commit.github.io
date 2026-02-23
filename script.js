// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scroll Active Link =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:sunny6866666@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Scroll Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Counter Animation =====
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            let current = 0;
            const increment = Math.ceil(target / 50);
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(counter);
                } else {
                    stat.textContent = current + '+';
                }
            }, 20);
        }
    });
};

// Trigger counter animation when stats section comes into view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// ===== Parallax Scroll Effect =====
window.addEventListener('scroll', () => {
    const heroGraphic = document.querySelector('.hero-graphic');
    if (heroGraphic) {
        heroGraphic.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// ===== Add Active Nav Link Style =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    }
});

// ===== Project Card Click Handler =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.25)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
});

// ===== Analytics (Optional - Add your tracking code) =====
// Example: Google Analytics tracking
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully');
    // Add your analytics code here
});

// ===== Redirect updated URLs =====
const updateProjectLinks = () => {
    const projects = {
        'wildfire_detection_internship': 'Sunny-commit/wildfire_detection_internship',
        'LangGraph_Projects': 'Sunny-commit/LangGraph_Projects',
        'RNN_Practice': 'Sunny-commit/RNN_Practice',
        'online-fraud-detection': 'Sunny-commit/online-fraud-detection',
        'Langchain_projects': 'Sunny-commit/Langchain_projects',
        'NLP_projects': 'Sunny-commit/NLP_projects'
    };
    
    document.querySelectorAll('.project-card').forEach(card => {
        const link = card.getAttribute('href');
        if (link && !link.includes('github.com')) {
            card.href = `https://github.com/${link}`;
        }
    });
};

updateProjectLinks();

// ===== Responsive Mobile Menu =====
const handleResize = () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
};

window.addEventListener('resize', handleResize);
handleResize(); // Initial call