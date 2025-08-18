document.addEventListener("DOMContentLoaded", () => {
  // Só estoura confetti se estivermos na página 1 (index.html)
  if (
    document.body.classList.contains("pagina1") ||
    window.location.pathname.includes("index.html")
  ) {
    estourarConfetti();
  }

  // Função confetti
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

  const audio = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("playPauseBtn");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const progress = document.getElementById("progressBar");
  const musicBtn = document.getElementById("musicOptionsBtn");
  const musicMenu = document.getElementById("musicMenu");
  const downloadBtn = document.getElementById("downloadBtn");

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

  if (musicBtn && musicMenu) {
    musicBtn.addEventListener("click", () => {
      musicMenu.classList.toggle("hidden");
    });

    musicMenu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const newSrc = item.getAttribute("data-src");
        audio.pause();
        audio.src = newSrc;
        audio.load();
        audio.play();

        iconPlay.style.display = "none";
        iconPause.style.display = "inline";

        if (downloadBtn) {
          downloadBtn.href = newSrc;
        }

        musicMenu.classList.add("hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!musicBtn.contains(e.target) && !musicMenu.contains(e.target)) {
        musicMenu.classList.add("hidden");
      }
    });
  }
});
