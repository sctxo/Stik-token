let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let snakes = [];
let maxSnakes = 50;

class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.len = 20 + Math.random() * 40;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * this.len, this.y - this.vy * this.len);
    ctx.strokeStyle = "rgba(155, 89, 182, 0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

for (let i = 0; i < maxSnakes; i++) {
  snakes.push(new Snake());
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  snakes.forEach(s => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

async function connectWallet() {
  if (!window.ethereum) return alert("Установи Metamask!");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  alert("Кошелёк подключён!");
}