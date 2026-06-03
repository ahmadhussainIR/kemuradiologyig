const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("[data-menu]");
const contactForm = document.querySelector("[data-contact-form]");
const applicationForm = document.querySelector(".application-form");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  menu.classList.remove("is-open");
  header.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("[name='name']").value.trim();
    const email = contactForm.querySelector("[name='email']").value.trim();
    const subject = contactForm.querySelector("[name='subject']").value.trim();
    const question = contactForm.querySelector("[name='question']").value.trim();
    const body = [
      `Name: ${name}`,
      `Email for reply: ${email}`,
      "",
      "Question:",
      question,
    ].join("\n");

    const mailto = new URL("mailto:kemuradiologyig@gmail.com");
    mailto.searchParams.set("subject", `[KemRad] ${subject}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  });
}

if (applicationForm) {
  applicationForm.addEventListener("submit", (event) => {
    const requiredGroups = applicationForm.querySelectorAll("[data-required-checkbox-group]");
    let firstInvalidGroup = null;

    requiredGroups.forEach((group) => {
      const hasSelection = group.querySelector("input[type='checkbox']:checked");
      group.classList.toggle("is-invalid", !hasSelection);
      if (!hasSelection && !firstInvalidGroup) {
        firstInvalidGroup = group;
      }
    });

    if (firstInvalidGroup) {
      event.preventDefault();
      firstInvalidGroup.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstCheckbox = firstInvalidGroup.querySelector("input[type='checkbox']");
      firstCheckbox.focus();
    }
  });
}
