const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const center = { x: w / 2, y: h / 2 };
let lines = [];

class Line {
  constructor() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 0;
    this.speed = 1 + Math.random() * 1.5;
    this.length = 40 + Math.random() * 80;
  }

  update() {
    this.radius += this.speed;
    if (this.radius > Math.max(w, h)) {
      this.radius = 0;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = 1 + Math.random() * 1.5;
      this.length = 40 + Math.random() * 80;
    }
  }

  draw() {
    const x1 = center.x + Math.cos(this.angle) * this.radius;
    const y1 = center.y + Math.sin(this.angle) * this.radius;
    const x2 = center.x + Math.cos(this.angle) * (this.radius + this.length);
    const y2 = center.y + Math.sin(this.angle) * (this.radius + this.length);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(155, 89, 182, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

for (let i = 0; i < 100; i++) {
  lines.push(new Line());
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  lines.forEach(line => {
    line.update();
    line.draw();
  });
  requestAnimationFrame(animate);
}
animate();

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

async function connectWallet() {
  if (!window.ethereum) return alert("Установи Metamask!");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  alert("Кошелёк подключён!");
}