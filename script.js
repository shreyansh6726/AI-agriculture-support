const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");
const AUTH_STORAGE_KEY = "ai-agri-farmer-id";
const SAMPLE_FARMER = {
  farmerId: "123456",
  password: "abcd",
};

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.classList.remove("open");
    });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

const animatedElements = document.querySelectorAll(
  ".feature-card, .list-card, .card"
);

animatedElements.forEach((el) => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty("--x", `${x}px`);
      btn.style.setProperty("--y", `${y}px`);
    });
  });

  const storedFarmerId = localStorage.getItem(AUTH_STORAGE_KEY);
  const navLogin = document.getElementById("nav-login");

  if (navLogin && storedFarmerId) {
    const farmerChip = document.createElement("span");
    farmerChip.className = "btn btn-outline farmer-id-chip";
    farmerChip.textContent = `Farmer ID: ${storedFarmerId}`;
    navLogin.replaceWith(farmerChip);
  }

  const loginForm = document.getElementById("login-form");
  const feedbackEl = document.querySelector(".form-feedback");

  if (loginForm) {
    if (storedFarmerId) {
      window.location.replace("index.html");
      return;
    }

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const farmerIdInput = loginForm.farmerId.value.trim();
      const passwordInput = loginForm.password.value;

      if (
        farmerIdInput === SAMPLE_FARMER.farmerId &&
        passwordInput === SAMPLE_FARMER.password
      ) {
        localStorage.setItem(AUTH_STORAGE_KEY, farmerIdInput);
        if (feedbackEl) {
          feedbackEl.textContent = "Login successful! Redirecting...";
          feedbackEl.classList.remove("error");
          feedbackEl.classList.add("success");
        }
        setTimeout(() => {
          window.location.href = "index.html";
        }, 600);
      } else {
        if (feedbackEl) {
          feedbackEl.textContent = "Invalid Farmer ID or password. Please try again.";
          feedbackEl.classList.remove("success");
          feedbackEl.classList.add("error");
        }
      }
    });
  }
});

