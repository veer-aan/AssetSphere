// AssetSphere — login / register tab switching

(function () {
  const tabs = document.querySelectorAll(".auth-tabs button[data-pane]");
  const panes = document.querySelectorAll(".pane[data-pane]");
  const switches = document.querySelectorAll("[data-switch-to]");

  function activate(name) {
    tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.pane === name));
    panes.forEach((p) => p.classList.toggle("is-active", p.dataset.pane === name));
    const heading = document.querySelector("[data-auth-heading]");
    if (heading) {
      heading.textContent = name === "register" ? "Create your workspace" : "Welcome back";
    }
    const sub = document.querySelector("[data-auth-sub]");
    if (sub) {
      sub.textContent =
        name === "register"
          ? "Set up AssetSphere for your team in a couple of minutes."
          : "Sign in to your organisation's asset ledger.";
    }
    const url = new URL(window.location);
    url.searchParams.set("mode", name);
    window.history.replaceState({}, "", url);
  }

  tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.pane)));
  switches.forEach((el) => el.addEventListener("click", () => activate(el.dataset.switchTo)));

  // Respect ?mode=register / ?mode=login on load
  const params = new URLSearchParams(window.location.search);
  const initialMode = params.get("mode") === "register" ? "register" : "login";
  activate(initialMode);

  // Show selected plan chip if arriving from pricing page (?plan=Team)
  const planParam = params.get("plan");
  const chip = document.querySelector("[data-plan-chip]");
  if (planParam && chip) {
    chip.hidden = false;
    const nameEl = chip.querySelector("[data-plan-name]");
    if (nameEl) nameEl.textContent = planParam;
  }

  // Prevent actual submission — this is a front-end scaffold
  document.querySelectorAll("form[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Continuing…";
        setTimeout(() => (btn.textContent = original), 1400);
      }
    });
  });
})();
