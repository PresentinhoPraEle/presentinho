estourarConfetti();

function estourarConfetti() {
  const duracao = 2 * 1000;
  const fim = Date.now() + duracao;

  (function fogos() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ffffff", "#000000", "#f5f5dc"],
    });
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ffffff", "#000000", "#f5f5dc"],
    });

    if (Date.now() < fim) {
      requestAnimationFrame(fogos);
    }
  })();
}
