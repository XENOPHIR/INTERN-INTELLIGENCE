document.addEventListener("DOMContentLoaded", function () {
    // ==========================
    // 1️ Cyberpunk Rain Effect
    // ==========================
    const bgContainer = document.querySelector(".bg-container");
    const rainCanvas = document.getElementById("rain-canvas");
    const rainCtx = rainCanvas.getContext("2d");

    function resizeCanvas() {
        rainCanvas.width = bgContainer.clientWidth;
        rainCanvas.height = bgContainer.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const raindrops = [];
    const numDrops = 80;

    for (let i = 0; i < numDrops; i++) {
        raindrops.push({
            x: Math.random() * rainCanvas.width,
            y: Math.random() * rainCanvas.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 3 + 2
        });
    }

    function drawRain() {
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        rainCtx.strokeStyle = "rgba(0, 255, 255, 0.7)";
        rainCtx.lineWidth = 2;
        rainCtx.lineCap = "round";

        for (let drop of raindrops) {
            rainCtx.beginPath();
            rainCtx.moveTo(drop.x, drop.y);
            rainCtx.lineTo(drop.x, drop.y + drop.length);
            rainCtx.stroke();

            drop.y += drop.speed;
            if (drop.y > rainCanvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * rainCanvas.width;
            }
        }

        requestAnimationFrame(drawRain);
    }

    setTimeout(drawRain, 500);

    // ==========================
    // 2️ Cyberpunk Matrix Effect
    // ==========================
    const matrixCanvas = document.getElementById("matrix-canvas");
    const matrixCtx = matrixCanvas.getContext("2d");

    function resizeMatrixCanvas() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
    resizeMatrixCanvas();
    window.addEventListener("resize", resizeMatrixCanvas);

    const matrixChars = "ZXCVBNMASDFGHJKLQWERTYUIO 010101";
    const fontSize = 18;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function drawMatrix() {
        matrixCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = "#FF00FF";
        matrixCtx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    // ==========================
    // 3️ Login Authentication
    // ==========================
    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            window.location.href = "/admin/";
        } else {
            document.getElementById("error-message").innerText = "Invalid email or password";
            document.getElementById("error-message").classList.remove("hidden");
        }
    });
});
