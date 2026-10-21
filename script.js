// 1. Эффект печатной машинки для главного заголовка
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
                setTimeout(typeWriter, 100); // Скорость печати
            }
        }
        setTimeout(typeWriter, 500);
    }
});

// 2. Космические частицы на фоне (Canvas)
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

    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            color: Math.random() > 0.5 ? "#00f3ff" : "#ff00ff" // Голубой или розовый
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Возвращаем частицы на экран, если они улетели
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
        });
    }
    animate();
}
