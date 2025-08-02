document.addEventListener("DOMContentLoaded", () => {
  // Só estoura confetti se estivermos na página 1 (index.html)
  if (
    document.body.classList.contains("pagina1") ||
    window.location.pathname.includes("index.html")
  ) {
    estourarConfetti();
  }

  // Função confetti pode estar fora, só a chamada dentro
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

  // Agora o código do áudio e controles, sempre dentro do DOMContentLoaded
  const audio = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("playPauseBtn");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const progress = document.getElementById("progressBar");

  if (audio && playBtn && iconPlay && iconPause && progress) {
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        iconPlay.style.display = "none";
        iconPause.style.display = "inline";
      } else {
        audio.pause();
        iconPlay.style.display = "inline";
        iconPause.style.display = "none";
      }
    });

    audio.addEventListener("timeupdate", () => {
      progress.value = audio.currentTime;
    });

    audio.addEventListener("loadedmetadata", () => {
      progress.max = audio.duration;
    });

    progress.addEventListener("input", () => {
      audio.currentTime = progress.value;
    });
  }
});
