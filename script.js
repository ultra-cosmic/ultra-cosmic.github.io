// --- 1. КАСТОМНЫЙ КУРСОР + ШЛЕЙФ ---
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorOutline.classList.add('cursor-outline');
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 300, fill: "forwards" });
});

// Ховер-эффект курсора
const interactables = document.querySelectorAll('a, button, .card');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// --- 2. МАГНИТНЫЕ ССЫЛКИ В ХЕДЕРЕ ---
const navLinks = document.querySelectorAll('.site-header a');
navLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = `translate(0px, 0px)`;
    });
});

// --- 3. ПЕЧАТНАЯ МАШИНКА ---
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById("typing-text");
    if (textElement) {
        const text = textElement.getAttribute("data-text");
        let i = 0;
        textElement.innerHTML = "";
        function typeWriter() {
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 500);
    }
});

// --- 4. КОСМИЧЕСКАЯ СЕТЬ (ФОН) ---
const canvas = document.getElementById("space-bg");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: null, y: null, radius: 200 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    let particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            color: Math.random() > 0.5 ? "#00f3ff" : "#ff00ff"
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;

            if (mouse.x != null) {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    p.x -= dx / 15;
                    p.y -= dy / 15;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dx2 = p.x - p2.x;
                let dy2 = p.y - p2.y;
                let dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist/120})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }
    animate();
}

// --- 5. 3D КАРТОЧКИ С БЛИКОМ (GLARE) ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 3D Наклон
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Блик
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
});

// --- 6. ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));
