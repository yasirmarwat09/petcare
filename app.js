// =========================
// DOM Elements
// =========================
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const userIcon = document.querySelector(".user-icon");
const modal = document.getElementById("authModal");
const closeModal = document.querySelector(".close-modal");
const contactForm = document.getElementById("contactForm");

// Appointment Form Elements
const bookButton = document.getElementById("bookButton");
const bookMeButton = document.getElementById("bookMeButton");
const formContainer = document.getElementById("appointmentForm");
const petCareForm = document.getElementById("petCareForm");
const successMessage = document.getElementById("successMessage");

// Appointment Cart Elements
const appointmentCart = document.getElementById("appointmentCart");
const appointmentOverlay = document.getElementById("appointmentOverlay");
const closePanel = document.getElementById("closePanel");
const appointmentCount = document.getElementById("appointmentCount");

// =========================
// Utility: Set today's date as min for appointment input
// =========================
const today = new Date().toISOString().split("T")[0];
document.getElementById("appointmentDate").setAttribute("min", today);

// =========================
// Appointment Form Toggle
// =========================
let savedScrollPosition = 0;

function toggleForm(e) {
  e.preventDefault();

  if (formContainer.classList.contains("active")) {
    formContainer.style.opacity = "0";
    setTimeout(() => {
      formContainer.classList.remove("active");
      window.scrollTo({ top: savedScrollPosition, behavior: "instant" });
    }, 0);
  } else {
    savedScrollPosition = window.scrollY;
    formContainer.classList.add("active");
    setTimeout(() => {
      formContainer.style.opacity = "1";
      formContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  }
}

bookButton.addEventListener("click", toggleForm);
bookMeButton.addEventListener("click", toggleForm);

// =========================
// Appointment Form Submission
// =========================
petCareForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (petCareForm.checkValidity()) {
    formContainer.style.opacity = "0";
    setTimeout(() => {
      formContainer.classList.remove("active");
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.classList.add("active");
        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 10);

      petCareForm.reset();
    }, 500);

    setTimeout(() => {
      successMessage.classList.remove("active");
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 500);
    }, 5000);
  } else {
    const invalidFields = petCareForm.querySelectorAll(":invalid");
    if (invalidFields.length > 0) {
      invalidFields[0].scrollIntoView({ behavior: "smooth", block: "center" });
      invalidFields[0].focus();
    }
  }
});

// =========================
// Appointment Cart Functionality
// =========================
appointmentCart.addEventListener("click", () => {
  appointmentOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closePanel.addEventListener("click", () => {
  appointmentOverlay.style.display = "none";
  document.body.style.overflow = "auto";
});

appointmentOverlay.addEventListener("click", (e) => {
  if (e.target === appointmentOverlay) {
    appointmentOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// =========================
// Cancel Appointment
// =========================
document.querySelectorAll(".btn-cancel").forEach((button) => {
  const row = button.closest("tr");
  const statusText = row
    .querySelector(".appointment-status")
    ?.textContent.trim();

  if (statusText === "Approved") {
    button.disabled = true;
    button.style.opacity = "0.6";
    button.style.cursor = "not-allowed";
  }

  button.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const status = row.querySelector(".appointment-status")?.textContent.trim();

    if (status === "Approved") return;

    row.remove();

    // Update count
    const currentCount = parseInt(appointmentCount.textContent);
    appointmentCount.textContent = currentCount - 1;

    // Show message if empty
    const tbody = document.querySelector(".appointment-table tbody");
    if (tbody.children.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML =
        '<td colspan="6" class="empty-cart">No appointments found</td>';
      tbody.appendChild(emptyRow);
    }
  });
});

// =========================
// Navbar Scroll Behavior
// =========================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =========================
// Mobile Menu Toggle
// =========================
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// =========================
// Smooth Scrolling for Nav Links
// =========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.classList.remove("active");

    const targetId = this.getAttribute("href");
    if (targetId === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = navbar.offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  });
});

// =========================
// Modal (Login/Register) Functionality
// =========================
function openModal() {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModalFunc() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

userIcon.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFunc);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModalFunc();
});

// =========================
// Auth Tab Toggle
// =========================
document.querySelectorAll(".auth-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".auth-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".auth-form")
      .forEach((f) => f.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.form + "Form").classList.add("active");
  });
});

// =========================
// Switch Between Login/Register
// =========================
document.querySelectorAll(".switch-form").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const formType = link.dataset.form;
    document.querySelector(`.auth-tab[data-form="${formType}"]`).click();
  });
});

// =========================
// Animate on Scroll
// =========================
const animateOnScroll = () => {
  document.querySelectorAll(".animate__animated").forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.animationDelay = "0s";
    }
  });
};

window.addEventListener("load", () => {
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
});

// =========================
// Equal Height for Service Cards
// =========================
const equalizeCardHeights = () => {
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll(".service-card");
    let maxHeight = 0;

    cards.forEach((card) => (card.style.height = "auto"));
    cards.forEach((card) => {
      if (card.offsetHeight > maxHeight) {
        maxHeight = card.offsetHeight;
      }
    });
    cards.forEach((card) => (card.style.height = maxHeight + "px"));
  }
};

window.addEventListener("load", equalizeCardHeights);
window.addEventListener("resize", equalizeCardHeights);
