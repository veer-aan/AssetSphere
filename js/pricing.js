// AssetSphere — pricing toggle

(function () {
  const toggle = document.querySelector(".billing-toggle");
  const plansSection = document.querySelector(".plans");
  if (!toggle || !plansSection) return;

  const buttons = toggle.querySelectorAll("button[data-period]");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const period = btn.dataset.period;
      buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
      plansSection.classList.toggle("monthly", period === "monthly");
      plansSection.classList.toggle("annual", period === "annual");
    });
  });
})();
