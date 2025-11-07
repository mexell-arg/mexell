/* ================= MENÚ PRINCIPAL ================= */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

if (navMenu && navToggle) {
  const navIcon = navToggle.querySelector("i"); // ícono dentro del botón

  // Abrir/cerrar menú
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Cambiar ícono
    if (navMenu.classList.contains("active")) {
      navIcon.classList.remove("ri-apps-2-line");
      navIcon.classList.add("ri-close-line");
    } else {
      navIcon.classList.remove("ri-close-line");
      navIcon.classList.add("ri-apps-2-line");
    }
  });

  // Cerrar menú al hacer clic en enlaces (excepto dropdown padre)
  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const parent = link.closest(".dropdown");
      if (!parent || !link.classList.contains("dropdown__link")) {
        navMenu.classList.remove("active");

        // Restaurar ícono cuando se cierra
        navIcon.classList.remove("ri-close-line");
        navIcon.classList.add("ri-apps-2-line");
      }
    });
  });
}

/* ================= LINK ACTIVO (index vs subpáginas) ================= */
let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "" || currentPage === "/") {
  currentPage = "index.html";
}
const currentHash = window.location.hash;

if (currentPage === "index.html") {
  const sections = document.querySelectorAll("section[id]");
  const navLinksHighlight = document.querySelectorAll(".nav__links a");

  if (sections.length > 0 && navLinksHighlight.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.nav__links a[href="#${id}"]`);
          if (entry.isIntersecting) {
            navLinksHighlight.forEach((l) => l.classList.remove("active"));
            if (link) link.classList.add("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    document.addEventListener("DOMContentLoaded", () => {
      navLinksHighlight.forEach((l) => l.classList.remove("active"));
      if (currentHash) {
        const hashLink = document.querySelector(`.nav__links a[href="${currentHash}"]`);
        if (hashLink) hashLink.classList.add("active");
      } else {
        document.querySelector('.nav__links a[href="index.html"]')?.classList.add("active");
      }
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY < 100 && !currentHash) {
        navLinksHighlight.forEach((l) => l.classList.remove("active"));
        document.querySelector('.nav__links a[href="index.html"]')?.classList.add("active");
      }
    });
  }
} else {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav__links a").forEach((l) => l.classList.remove("active"));
    const activeLink = document.querySelector(`.nav__links a[href="${currentPage}"]`);
    if (activeLink) activeLink.classList.add("active");
  });
}

/* ================= HEADER SCROLL ================= */
const headerTop = document.getElementById("header-top");
const headerMain = document.querySelector(".header__main");
let lastScroll = 0;

if (headerTop && headerMain) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 50) {
      headerTop.style.transform = "translateY(-100%)";
      headerMain.style.top = "0";
    } else {
      headerTop.style.transform = "translateY(0)";
      headerMain.style.top = "32px";
    }
    lastScroll = currentScroll;
  });
}

/* ================= SCROLL REVEAL ================= */
if (typeof ScrollReveal !== "undefined") {
  ScrollReveal().reveal('[data-sr="fade-right"]', { origin: 'right', distance: '50px', duration: 1000, delay: 200 });
  ScrollReveal().reveal('[data-sr="fade-up"]', { origin: 'bottom', distance: '60px', duration: 1000, delay: 400 });
  ScrollReveal().reveal('[data-sr="fade-left"]', { origin: 'left', distance: '50px', duration: 1000, delay: 600 });
  ScrollReveal().reveal('.hero__content', { origin: 'left', distance: '70px', duration: 1200, delay: 200 });
}

/* ================= SWIPER ================= */
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    speed: 4000,
    autoplay: { delay: 0, disableOnInteraction: false },
    allowTouchMove: false,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 10 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 5, spaceBetween: 30 }
    }
  });
}

/* ================= ROTAR IMÁGENES CARD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".card-slider");
  if (sliders.length > 0) {
    sliders.forEach(slider => {
      const images = slider.querySelectorAll(".card__img");
      let index = 0;
      if (images.length > 0) {
        setInterval(() => {
          images[index].classList.remove("active");
          index = (index + 1) % images.length;
          images[index].classList.add("active");
        }, 3000);
      }
    });
  }
});

/* ================= MODALES ================= */
const modalBtns = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".modal__close");

if (modalBtns.length > 0 && modals.length > 0) {
  modalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.modal);
      if (target) target.classList.add("active");
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("active");
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  });
}

/* ================= BACKGROUND BURBUJAS ================= */
function createBubbles() {
  const bg = document.querySelector(".contact__background");
  if (!bg) return;
  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 60 + 20;
    const pos = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${pos}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;
    bg.appendChild(bubble);
  }
}
document.addEventListener("DOMContentLoaded", createBubbles);

/* ================= EMAIL MODAL ================= */
const emailModal = document.getElementById("emailModal");
if (emailModal) {
  const emailModalClose = emailModal.querySelector(".email-modal__close");
  const emailModalForm = document.getElementById("emailModalForm");
  const emailModalToast = document.getElementById("emailModalToast");

  function openEmailModal() {
    emailModal.classList.add("active");
  }

  emailModalClose?.addEventListener("click", () => {
    emailModal.classList.remove("active");
  });

  emailModalForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(emailModalForm.action, {
      method: "POST",
      body: new FormData(emailModalForm)
    }).then(() => {
      emailModalToast.classList.add("show");
      setTimeout(() => emailModalToast.classList.remove("show"), 3000);
      emailModalForm.reset();
      emailModal.classList.remove("active");
    }).catch(() => {
      emailModalToast.textContent = "❌ Error al enviar el mensaje.";
      emailModalToast.style.background = "#d9534f";
      emailModalToast.classList.add("show");
      setTimeout(() => {
        emailModalToast.classList.remove("show");
        emailModalToast.style.background = "#0B3558";
        emailModalToast.textContent = "✅ ¡Mensaje enviado con éxito!";
      }, 3000);
    });
  });
}

/* ================= MODAL LOCATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openLocation");
  const modal = document.getElementById("modalLocation");
  const closeBtn = document.getElementById("closeLocation");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => modal.classList.add("active"));
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
});

/* ================= SUBMENÚS MÓVILES ================= */
document.addEventListener("DOMContentLoaded", () => {
  const dropdownLinks = document.querySelectorAll(".dropdown > .dropdown__link");
  if (dropdownLinks.length > 0) {
    dropdownLinks.forEach(link => {
      link.addEventListener("click", e => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const submenu = link.nextElementSibling;
          document.querySelectorAll(".dropdown__menu.active").forEach(menu => {
            if (menu !== submenu) {
              menu.classList.remove("active");
              menu.previousElementSibling.classList.remove("active");
            }
          });
          submenu.classList.toggle("active");
          link.classList.toggle("active");
        }
      });
    });
  }
});
