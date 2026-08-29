// AssetSphere — shared behaviour for nav state, scene-linked background, reveals

(function () {
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Background "scenes": whichever [data-scene] section is most in view
  // sets body[data-scene], which retunes the animated background (see
  // css/style.css, .bg-field rules) with a slow cross-fade.
  const scenes = document.querySelectorAll("[data-scene]");
  if (scenes.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.dataset.scene = entry.target.dataset.scene;
          }
        });
      },
      { threshold: 0.45 }
    );
    scenes.forEach((s) => observer.observe(s));
  }

  // Reveal-on-scroll for content blocks
  const revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealables.forEach((el) => revealObserver.observe(el));
  }

  // Gentle scroll parallax on hero shapes (skipped for reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !prefersReduced) {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        el.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
})();
