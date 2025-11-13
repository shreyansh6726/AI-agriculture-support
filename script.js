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
    const loginLi = navLogin.closest("li") || navLogin.parentElement;

    const userLi = document.createElement("li");
    userLi.className = "user-menu";
    userLi.innerHTML = `
      <div class="user-wrap">
        <button id="userBtn" class="user-btn btn btn-outline" aria-haspopup="true" aria-expanded="false" type="button">
          Farmer ID: ${storedFarmerId} <span class="caret">▾</span>
        </button>
        <ul id="userDropdown" class="user-dropdown" hidden>
          <li><a id="profileBtn" class="dropdown-link" href="get-started.html">Profile</a></li>
          <li><button id="logoutBtn" class="dropdown-logout" type="button">Logout</button></li>
        </ul>
      </div>
    `;

    if (loginLi && loginLi.parentElement) {
      loginLi.parentElement.replaceChild(userLi, loginLi);
    } else {
      navLogin.replaceWith(userLi);
    }

    // dropdown behavior
    const userBtn = document.getElementById("userBtn");
    const userDropdown = document.getElementById("userDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    userBtn.addEventListener("click", (e) => {
      const expanded = userBtn.getAttribute("aria-expanded") === "true";
      userBtn.setAttribute("aria-expanded", String(!expanded));
      if (userDropdown) userDropdown.hidden = expanded; // toggle
    });

    // close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userLi.contains(e.target)) {
        if (userDropdown && !userDropdown.hidden) {
          userDropdown.hidden = true;
          userBtn.setAttribute("aria-expanded", "false");
        }
      }
    });

    // create logout confirmation modal and behaviors
    const createLogoutModal = () => {
      const modal = document.createElement("div");
      modal.id = "logoutModal";
      modal.className = "modal-overlay";
      modal.hidden = true;
      modal.innerHTML = `
        <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="logoutTitle">
          <h3 id="logoutTitle">Confirm Logout</h3>
          <p>Are you sure you want to logout from Farmer ID: ${storedFarmerId}?</p>
          <div class="modal-actions">
            <button id="confirmLogout" class="btn btn-primary">Logout</button>
            <button id="cancelLogout" class="btn btn-outline">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      return modal;
    };

    const logoutModal = createLogoutModal();

    const openLogoutModal = () => {
      if (logoutModal) {
        logoutModal.hidden = false;
        // trap focus if needed later
      }
    };

    const closeLogoutModal = () => {
      if (logoutModal) {
        logoutModal.hidden = true;
      }
    };

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openLogoutModal();
      });
    }

    // modal buttons
    const confirmBtn = document.getElementById("confirmLogout");
    const cancelBtn = document.getElementById("cancelLogout");

    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        // close modal then redirect
        closeLogoutModal();
        window.location.href = "login.html";
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        closeLogoutModal();
      });
    }

    // clicking outside modal-panel closes it
    document.addEventListener("click", (e) => {
      if (!logoutModal || logoutModal.hidden) return;
      const panel = logoutModal.querySelector(".modal-panel");
      if (panel && !panel.contains(e.target) && !userLi.contains(e.target)) {
        closeLogoutModal();
      }
    });

    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && logoutModal && !logoutModal.hidden) {
        closeLogoutModal();
      }
    });
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

