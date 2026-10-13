
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".page-header");
  const main = document.querySelector(".main-content");

  // 1. 导航栏与主题切换
  if (header) {
    const nav = document.createElement("nav");
    nav.className = "site-actions";

    const home = document.createElement("a");
    home.href = "/";
    home.textContent = "首页";
    home.className = "nav-link";

    const isHome = location.pathname === "/" ||
      location.pathname === "/index.html";

    if (isHome) home.classList.add("active");

    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";

    const updateIcon = () => {
      const dark = root.dataset.theme === "dark";
      toggle.textContent = dark ? "☀" : "☾";
      toggle.setAttribute(
        "aria-label",
        dark ? "切换浅色模式" : "切换深色模式"
      );
      toggle.title = dark ? "浅色模式" : "深色模式";
    };

    updateIcon();

    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark"
        ? "light" : "dark";

      root.dataset.theme = next;

      try {
        localStorage.setItem("stm32-theme", next);
      } catch (e) {}

      updateIcon();
    });

    nav.append(home, toggle);
    header.appendChild(nav);

    // 用户没有手动选择时，继续跟随系统
    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    media.addEventListener("change", event => {
      let saved = null;
      try {
        saved = localStorage.getItem("stm32-theme");
      } catch (e) {}

      if (saved !== "light" && saved !== "dark") {
        root.dataset.theme = event.matches
          ? "dark" : "light";
        updateIcon();
      }
    });
  }

  // Tables retain native column layout; their outer frame handles scrolling.
  if (main) {
    main.querySelectorAll("table").forEach((table, index) => {
      if (table.closest(".table-scroll")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "表格 " + (index + 1) + "，可横向滚动");
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  // 2. 代码窗口和复制按钮
  if (main) {
    main.querySelectorAll("pre").forEach(pre => {
      if (pre.closest(".code-window")) return;

      const code = pre.querySelector("code");
      if (!code) return;

      const windowEl = document.createElement("div");
      windowEl.className = "code-window";

      const toolbar = document.createElement("div");
      toolbar.className = "code-toolbar";

      const dots = document.createElement("div");
      dots.className = "code-dots";

      for (let i = 0; i < 3; i++) {
        dots.appendChild(document.createElement("i"));
      }

      const lang = document.createElement("span");
      lang.className = "code-language";

      const langParent = pre.closest(
        '[class*="language-"]'
      );

      const match = langParent?.className.match(
        /language-([\w+-]+)/
      );

      lang.textContent = match ? match[1] : "CODE";

      const copy = document.createElement("button");
      copy.className = "copy-btn";
      copy.type = "button";
      copy.textContent = "复制";

      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(
            code.textContent
          );
          copy.textContent = "已复制 ✓";
        } catch (e) {
          copy.textContent = "复制失败";
        }

        setTimeout(() => {
          copy.textContent = "复制";
        }, 1800);
      });

      toolbar.append(dots, lang, copy);

      pre.parentNode.insertBefore(windowEl, pre);
      windowEl.append(toolbar, pre);
    });
  }

  // 3. 首页星空
  const isHome = location.pathname === "/" ||
    location.pathname === "/index.html";

  if (isHome && main) {
    document.body.classList.add("home-page");

    const stars = document.createElement("div");
    stars.className = "hero-stars";
    stars.setAttribute("aria-hidden", "true");

    ["✦", "✧", "✦", "✧"].forEach(symbol => {
      const star = document.createElement("span");
      star.textContent = symbol;
      stars.appendChild(star);
    });

    main.prepend(stars);
  }

  // 4. 鼠标轨迹星点
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let lastSpark = 0;

  document.addEventListener("pointermove", event => {
    if (!isHome || reducedMotion.matches) return;
    if (event.pointerType === "touch") return;

    const now = performance.now();
    if (now - lastSpark < 55) return;
    lastSpark = now;

    if (document.querySelectorAll(
      ".cursor-spark"
    ).length >= 24) return;

    const spark = document.createElement("span");
    spark.className = "cursor-spark";
    spark.textContent = Math.random() > .9
      ? "♥" : "✦";

    spark.style.left = event.clientX + "px";
    spark.style.top = event.clientY + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 700);
  });
});
