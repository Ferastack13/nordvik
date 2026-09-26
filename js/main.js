/* NORDVIK — interactions */

const HEADER_HTML = `
<header class="site-header" id="site-header" data-over-dark="false">
  <nav class="nav" aria-label="Primary">
    <a class="nav-logo" href="index.html">Nordvik</a>
    <ul class="nav-links">
      <li class="has-mega">
        <a class="nav-link" href="furniture.html" data-nav="furniture">Furniture</a>
        <div class="mega" role="region" aria-label="Furniture menu">
          <div class="mega-inner">
            <div class="mega-col">
              <h4>Shop by Room</h4>
              <a href="furniture.html#living">Living Room</a>
              <a href="furniture.html#dining">Dining</a>
              <a href="furniture.html#bedroom">Bedroom</a>
              <a href="furniture.html#office">Office</a>
              <a href="furniture.html#lighting">Lighting</a>
              <a href="furniture.html#outdoor">Outdoor</a>
            </div>
            <div class="mega-col">
              <h4>Discover</h4>
              <a href="furniture.html">New Arrivals</a>
              <a href="furniture.html#signatures">Best Sellers</a>
              <a href="collections.html">Collections</a>
              <a href="product.html">Signature Pieces</a>
            </div>
            <a class="mega-feature" href="collections.html">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Haven Collection living room" width="800" height="600" loading="lazy">
              <span class="mega-feature-caption">Haven Collection — Explore</span>
            </a>
          </div>
        </div>
      </li>
      <li><a class="nav-link" href="collections.html" data-nav="collections">Collections</a></li>
      <li><a class="nav-link" href="inspiration.html" data-nav="inspiration">Inspiration</a></li>
      <li><a class="nav-link" href="about.html" data-nav="about">About</a></li>
      <li><a class="nav-link" href="contact.html" data-nav="contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a class="nav-icon hide-mobile" href="contact.html" aria-label="Book consultation">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
  <a href="furniture.html">Furniture</a>
  <div class="mobile-sub">
    <a href="furniture.html#living">Living Room</a>
    <a href="furniture.html#dining">Dining</a>
    <a href="furniture.html#bedroom">Bedroom</a>
    <a href="furniture.html#office">Office</a>
    <a href="furniture.html#lighting">Lighting</a>
    <a href="furniture.html#outdoor">Outdoor</a>
  </div>
  <a href="collections.html">Collections</a>
  <a href="inspiration.html">Inspiration</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container-wide">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Nordvik</div>
        <p class="footer-brand-text">Timeless Scandinavian furniture designed for modern living. Crafted in the Nordic tradition since 1978.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); this.querySelector('button').textContent='Joined';">
          <label class="sr-only" for="newsletter-email">Email</label>
          <input id="newsletter-email" type="email" placeholder="Join our newsletter" required>
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="furniture.html">Furniture</a>
        <a href="collections.html">Collections</a>
        <a href="inspiration.html">Inspiration</a>
        <a href="product.html">Signature Pieces</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">Our Story</a>
        <a href="about.html#craft">Craftsmanship</a>
        <a href="about.html#sustainability">Sustainability</a>
        <a href="contact.html">Showrooms</a>
      </div>
      <div class="footer-col">
        <h4>Visit</h4>
        <a href="contact.html">Copenhagen</a>
        <a href="contact.html">Stockholm</a>
        <a href="contact.html">Oslo</a>
        <a href="contact.html">Design Consultation</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Nordvik. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </div>
</footer>
`;

function injectChrome() {
  const headerMount = document.getElementById("header-mount");
  const footerMount = document.getElementById("footer-mount");
  if (headerMount) headerMount.outerHTML = HEADER_HTML;
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;

  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach((el) => {
      el.classList.add("is-active");
    });
  }
}

function initNav() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("mobile-nav");
  if (!header) return;

  const overDark = document.body.dataset.overDark === "true";
  if (overDark) header.classList.add("is-over-dark");
  if (document.body.dataset.solidNav === "true") header.classList.add("is-solid");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }
}

function initReveals() {
  const els = document.querySelectorAll(".reveal, .reveal-img");
  if (!els.length || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function initFilters() {
  const bar = document.querySelector(".filter-bar");
  if (!bar) return;
  const buttons = bar.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll("[data-category]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
}

function initParallax() {
  const media = document.querySelector(".hero-media img");
  if (!media) return;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        media.style.transform = `scale(1) translateY(${y * 0.18}px)`;
      }
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  injectChrome();
  initNav();
  initReveals();
  initFilters();
  initParallax();
});
