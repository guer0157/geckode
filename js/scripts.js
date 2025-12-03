const handleFormEvents = () => {
  const nameContactUs = document.getElementById("nameContactUs");
  const emailContactUs = document.getElementById("emailContactUs");
  const phoneContactUs = document.getElementById("phoneContactUs");
  const messageContactUs = document.getElementById("messageContactUs");
  const submitButtonContactUs = document.getElementById(
    "submitButtonContactUs"
  );
  const nameMailingList = document.getElementById("nameMailingList");
  const emailMailingList = document.getElementById("emailMailingList");
  const submitButtonMailingList = document.getElementById(
    "submitButtonMailingList"
  );
  submitButtonMailingList.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("https://askcharly.ca/api/email/geckodes/mailing-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameMailingList.value,
        email: emailMailingList.value,
      }),
    });
  });
  submitButtonContactUs.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("https://askcharly.ca/api/email/geckodes/contact-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameContactUs.value,
        email: emailContactUs.value,
        phone: phoneContactUs.value,
        message: messageContactUs.value,
      }),
    });
  });
};

window.addEventListener("DOMContentLoaded", (event) => {
  handleFormEvents();
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
