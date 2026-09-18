/**
 * MAIN INTERACTION CONTROLLER
 * Editorial Minimal Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initProjectShowcase();
  initProjectModal();
  initContactInteractions();
  initLiveClock();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   Sticky Header & Navbar Scroll State
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const drawerLinks = document.querySelectorAll(".mobile-nav-link");

  if (!mobileToggle || !mobileDrawer) return;

  const toggleDrawer = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains("is-open");
    mobileDrawer.classList.toggle("is-open", isOpen);
    mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  mobileToggle.addEventListener("click", () => toggleDrawer());

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => toggleDrawer(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("is-open")) {
      toggleDrawer(false);
    }
  });
}

/* --------------------------------------------------------------------------
   ScrollSpy Active Navigation Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

/* --------------------------------------------------------------------------
   Intersection Observer for Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Project Showcase Filtering & Rendering
   -------------------------------------------------------------------------- */
function initProjectShowcase() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const counterEl = document.getElementById("project-counter");

  if (!filterBtns.length || !projectCards.length) return;

  const updateCount = (visibleCount, totalCount) => {
    if (counterEl) {
      counterEl.textContent = `Showing ${visibleCount} of ${totalCount} Selected Projects`;
    }
  };

  updateCount(projectCards.length, projectCards.length);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      let visible = 0;
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          card.classList.add("is-revealed");
          visible++;
        } else {
          card.style.display = "none";
        }
      });

      updateCount(visible, projectCards.length);
    });
  });
}

/* --------------------------------------------------------------------------
   Project Case Study Modal
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modalBackdrop = document.getElementById("project-modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const viewTriggers = document.querySelectorAll("[data-open-project]");

  if (!modalBackdrop) return;

  const openModal = (projectId) => {
    const project = projectsData.find((p) => p.id === projectId);
    if (!project) return;

    // Populate modal contents
    document.getElementById("modal-category").textContent = project.categoryLabel;
    document.getElementById("modal-year").textContent = project.year;
    document.getElementById("modal-role").textContent = project.role;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-summary").textContent = project.summary;
    document.getElementById("modal-problem").textContent = project.problem;
    document.getElementById("modal-solution").textContent = project.solution;
    document.getElementById("modal-architecture").textContent = project.architecture;

    const modalHeroImg = document.getElementById("modal-hero-img");
    if (modalHeroImg) {
      modalHeroImg.src = project.thumbnail;
      modalHeroImg.alt = `${project.title} Preview`;
    }

    // Populate metrics
    const metricsContainer = document.getElementById("modal-metrics-container");
    if (metricsContainer && project.metrics) {
      metricsContainer.innerHTML = project.metrics
        .map(
          (m) => `
        <div class="modal-metric-card">
          <div class="modal-metric-num">${m.value}</div>
          <div class="modal-metric-desc">${m.label}</div>
        </div>
      `
        )
        .join("");
    }

    // Populate tech chips
    const techContainer = document.getElementById("modal-tech-stack");
    if (techContainer && project.tags) {
      techContainer.innerHTML = project.tags
        .map((tag) => `<span class="tech-chip">${tag}</span>`)
        .join("");
    }

    modalBackdrop.classList.add("is-open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove("is-open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  viewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute("data-open-project");
      openModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Contact Interactions: Copy Email & Form Validation
   -------------------------------------------------------------------------- */
function initContactInteractions() {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailVal = "alex.rivera.arch@gmail.com";

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailVal);
        showToast("Email address copied to clipboard!");
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2200);
      } catch (err) {
        // Fallback
        const tempInput = document.createElement("input");
        tempInput.value = emailVal;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Email address copied to clipboard!");
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-status-alert");
  const submitBtn = document.getElementById("contact-submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      // Email format regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please provide a valid email address.");
        return;
      }

      // Simulate sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Dispatching...
        `;
      }

      setTimeout(() => {
        if (formAlert) {
          formAlert.classList.add("success");
          formAlert.textContent = `Thank you, ${name}. Your message has been dispatched successfully. I will respond promptly.`;
        }

        showToast("Message sent successfully!");
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
        }
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   Live Clock / Availability Indicator
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;

  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    clockEl.textContent = `${timeString} (${timezone})`;
  };

  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   Smooth Scroll Utility
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3500);
}
