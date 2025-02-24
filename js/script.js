document.addEventListener('DOMContentLoaded', function () {
  // Determine correct path to navbar.html based on current URL
  var fetchPath = window.location.pathname.includes('/pages/') ? '../navbar.html' : 'navbar.html';

  // Load external navbar into placeholder, then initialize navbar-dependent code
  fetch(fetchPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} for path: ${fetchPath}`);  //Added error message with path
        }
        return response.text();
      })
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
      initNavbar();
    })
    .catch(error => console.error('Error loading navbar:', error));

  function initNavbar() {
    // Mobile Menu Logic
    const menu = document.querySelector(".mobile-menu");
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const closeBtn = document.querySelector(".close-btn");
    const nav = document.querySelector("nav");

    if (hamburgerMenu && menu && closeBtn) {
      hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
        menu.classList.add("active");
        // Force menu to cover screen and be white with !important
        menu.setAttribute("style", "position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; background-color: #fff !important; z-index: 9999 !important;");
      });

      closeBtn.addEventListener("click", () => {
        menu.classList.remove("active");
        menu.removeAttribute("style"); // Remove inline styles on close
      });
    }

    // Smooth scrolling to sections (ADDED)
    const getQuoteButton = document.querySelector('.hero-buttons button:first-child');
    const ourServicesButton = document.querySelector('.hero-buttons button:last-child');

    // Force buttons to appear on mobile with !important
    if (getQuoteButton) {
      getQuoteButton.setAttribute("style", "display: inline-block !important;");
      getQuoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (ourServicesButton) {
      ourServicesButton.setAttribute("style", "display: inline-block !important;");
      ourServicesButton.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
      });
    }

    function openCalendlyModal() {
      Calendly.initPopupWidget({ url: 'https://calendly.com/salesteam-sc/interview-with-mudassir' });
      return false;
    }

    // Pop-up form logic
    const getQuoteButtons = document.querySelectorAll('.get-quote');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const talkToSalesButton = document.querySelector('.talk-sales');
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');
    const serviceCards = document.querySelectorAll('.service-card');
    const mindmapNodes = document.querySelectorAll('.mindmap-node');
    const servicesContainer = document.querySelector('.services-container');
    const showMoreButton = servicesContainer ? servicesContainer.querySelector('.show-more-services') : null;
    const faqTabs = document.querySelectorAll(".faq-tab");
    const faqContents = document.querySelectorAll(".faq-content");
    
    // **NEW: Centralized Navbar Button Handling**
    const navbar = document.querySelector('nav.navbar'); // Or however you select the navbar

    if (navbar) {
        // **Talk to Sales Button (Calendly)**
        const talkToSalesButtons = navbar.querySelectorAll('.talk-to-sales-button');
        talkToSalesButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent potential link behavior
                openCalendlyModal();
            });
        });

        // **Our Services Button (Scroll to Services Section)**
        const ourServicesButtons = navbar.querySelectorAll('.our-services-button');
        ourServicesButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent potential link behavior

                // Check if we're on the index page
                if (window.location.pathname === '/' || window.location.pathname.includes("index.html")) {
                    // Already on the index page, scroll to the services section
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Not on the index page, navigate to index and then scroll
                    window.location.href = '/index.html#services';  // Adjust if your index.html is in a subdirectory
                }
            });
        });
    }

    getQuoteButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-modal-id') || "default-modal";
        const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);
        if (modal) {
          modal.style.display = 'flex';
        }
      });
    });

    closeModalButtons.forEach(closeBtn => {
      closeBtn.addEventListener('click', function () {
        const modal = this.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });

    if (modals) {
      modals.forEach(modal => {
        window.addEventListener('click', function (event) {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        });
      });
    }

    if (talkToSalesButton) {
      talkToSalesButton.addEventListener('click', function () {
        window.open("https://calendly.com/muddassir-starconsultants", "_blank", "width=600,height=800");
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });

    faqTabs.forEach(tab => {
      tab.addEventListener("click", function() {
        const tabId = this.getAttribute('data-tab');
        faqTabs.forEach(tab => tab.classList.remove('active'));
        this.classList.add('active');
        faqContents.forEach(content => {
          if (content.getAttribute('data-content') == tabId) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });

    if (contactForm) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        contactForm.addEventListener('submit', async function (event) {
          event.preventDefault();
          formMessage.textContent = 'Submitting...';
          formMessage.classList.add('show', 'loading');
          try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
              method: 'POST',
              body: formData,
            });
            if (response.ok) {
              formMessage.textContent = 'Form submitted successfully!';
              formMessage.classList.remove('loading');
              formMessage.classList.add('show', 'success');
              contactForm.reset();
              setTimeout(() => {
                formMessage.classList.remove('show', 'success');
              }, 3000);
            } else {
              formMessage.textContent = 'Error, form submit failed.';
              formMessage.classList.remove('loading');
              formMessage.classList.add('show', 'error');
              setTimeout(() => {
                formMessage.classList.remove('show', 'error');
              }, 3000);
            }
          } catch (error) {
            formMessage.textContent = 'Error, form submit failed.';
            formMessage.classList.remove('loading');
            formMessage.classList.add('show', 'error');
            setTimeout(() => {
              formMessage.classList.remove('show', 'error');
            }, 3000);
            console.error('Fetch Error:', error);
          }
        });
      }
    }

    serviceCards.forEach(card => {
      card.addEventListener('mouseover', function () {
        this.style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseout', function () {
        this.style.transform = 'translateY(0)';
      });
    });

    mindmapNodes.forEach(node => {
      node.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.03)';
      });
      node.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
      });
    });

    if (hamburgerMenu) {
      hamburgerMenu.addEventListener("click", () => {
        nav.classList.toggle("active");
      });
    }

    // Services Section: Show more functionality
    if (servicesContainer && showMoreButton) {
      const hiddenServices = servicesContainer.querySelectorAll('.service-card.hidden');
      showMoreButton.addEventListener('click', function () {
        hiddenServices.forEach(card => {
          card.classList.remove('hidden');
        });
        showMoreButton.classList.remove('show');
      });
      if (hiddenServices.length > 0) {
        showMoreButton.classList.add('show');
      }
    }

    // Add class "active" to hero so it animates
    setTimeout(() => {
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.classList.add('active');
      }
    }, 100);

    // Change Navbar Style on Scroll
    const heroSection = document.querySelector('.hero');
    function updateNavbar() {
      // Use heroSection's height if available; otherwise, default to 100px
      const threshold = heroSection ? heroSection.offsetHeight : 100;
      if (window.scrollY > threshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();      

    // Added Calendly Integration for specified buttons
    const calendlySelectors = [
      '.hero-buttons button:first-child',
      '.calculator-footer button.get-quote'
    ];
    calendlySelectors.forEach(selector => {
      const btn = document.querySelector(selector);
      if (btn) {
        btn.addEventListener('click', function(e){
          e.preventDefault();
          e.stopImmediatePropagation();
          openCalendlyModal();
        }, true);
      }
    });

    //Added smooth scroll for faq
    document.querySelectorAll('#faq a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    //Customer support main page integration
     // **Customer Support Modal + Calendly Integration:**
        const customerSupportButton = document.querySelector('.call-to-action .cta-button');

        if (customerSupportButton) {
            customerSupportButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent any link behavior

                // Open the modal
                const modalId = this.getAttribute('data-modal-id');
                const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);
                if (modal) {
                    modal.style.display = 'flex';
                }

                // Open Calendly (if the function is defined)
                if (typeof openCalendlyModal === 'function') {
                    openCalendlyModal();
                }
            });
        }

   
            // Select all question buttons
const faqQuestions = document.querySelectorAll('.faq-question');

// Loop through each question button
// faqQuestions.forEach(question => {
//     // Add a click event listener to each question
//     question.addEventListener('click', () => {
//         // Close any other open answers except the one clicked
//         faqQuestions.forEach(item => {
//             if (item !== question) {
//                 item.classList.remove('active'); // Remove 'active' class to reset arrow rotation
//                 item.nextElementSibling.style.maxHeight = null; // Collapse the answer
//             }
//         });

//         // Toggle 'active' class on the clicked question to rotate the arrow
//         question.classList.toggle('active');

//         // Select the corresponding answer div
//         const answer = question.nextElementSibling;

//         // Check if the answer is already open
//         if (answer.style.maxHeight) {
//             // If open, close it by resetting max-height
//             answer.style.maxHeight = null;
//         } else {
//             // If closed, set max-height to scrollHeight to expand it
//             answer.style.maxHeight = answer.scrollHeight + 'px';
//         }
//     });
// });

  } // End of initNavbar function

// ==========================================================================
//  SWIPER INITIALIZATION
//  We initialize Swiper OUTSIDE of initNavbar()
//  because Swiper doesn't depend on the navbar being loaded.
// ==========================================================================
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 5,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-nexts",
    prevEl: ".swiper-button-prevs",
  },
  mousewheel: true,
  keyboard: true,
  loop: true,
  breakpoints: {

    300: {
      slidesPerView: 1
    },

    501: {
      slidesPerView: 1
    },

    769: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 10
    },
  }
});
// ========================= END SWIPER INITIALIZATION =======================
});

$(document).ready(function() {
  console.log("")
            const faqs = document.querySelectorAll(".faq .faq-question-container");
           
            faqs.forEach(function(faq) {
              faq.addEventListener("click", function() {
                console.log(faq)
                $(faq).parent().toggleClass("active");
              });
            });
          })
