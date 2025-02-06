document.addEventListener('DOMContentLoaded', function () {
    // Pop-up form logic
    const getQuoteButtons = document.querySelectorAll('.get-quote');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const talkToSalesButton = document.querySelector('.talk-sales');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactForm = document.querySelector('.contact-form');
    const formMessage = document.getElementById('form-message');
    const serviceCards = document.querySelectorAll('.service-card');
    const mindmapNodes = document.querySelectorAll('.mindmap-node');
    const servicesContainer = document.querySelector('.services-container');
    const showMoreButton = servicesContainer.querySelector('.show-more-services');
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");
    const nav = document.querySelector("nav");
    const faqTabs = document.querySelectorAll(".faq-tab");
    const faqContents = document.querySelectorAll(".faq-content");

    getQuoteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal-id') || "default-modal";
            const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`)
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
        })
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

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    faqTabs.forEach(tab => {
    tab.addEventListener("click", function() {
       const tabId = this.getAttribute('data-tab');
            faqTabs.forEach(tab => {
                tab.classList.remove('active');
            })
            this.classList.add('active')

            faqContents.forEach(content =>{
                if (content.getAttribute('data-content') == tabId){
                 content.classList.add('active')
                }
                   else{
                 content.classList.remove('active')
                   }
            })
        })
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
                        formMessage.classList.remove('loading')
                        formMessage.classList.add('show', 'success');
                        contactForm.reset();
                        setTimeout(() => {
                            formMessage.classList.remove('show', 'success');
                        }, 3000);

                    } else {
                        formMessage.textContent = `Error, form submit failed.`;
                        formMessage.classList.remove('loading')
                        formMessage.classList.add('show', 'error');
                        setTimeout(() => {
                            formMessage.classList.remove('show', 'error');
                        }, 3000);
                    }
                } catch (error) {
                    formMessage.textContent = `Error, form submit failed.`;
                    formMessage.classList.remove('loading')
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
    })
    mindmapNodes.forEach(node => {
        node.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.03)';
        });
        node.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    })
    if (hamburgerMenu){
       hamburgerMenu.addEventListener("click", () => {
           navbar.classList.toggle("active");
       });
   }

    // Services Section: Show more functionality
    const hiddenServices = servicesContainer.querySelectorAll('.service-card.hidden');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function () {
            hiddenServices.forEach(card => {
                card.classList.remove('hidden');
            });
            showMoreButton.classList.remove('show')
        })
    }

    // Services Section: Show more button if there are more services
    if (hiddenServices.length > 0) {
        showMoreButton.classList.add('show')
    }
    // Add class "active" to hero so it animates
    setTimeout(() => {
        if (hero) {
            hero.classList.add('active');
        }
    }, 100)


     // Change Navbar Style on Scroll
     const heroSection = document.querySelector('.hero');
  function updateNavbar() {
    if (heroSection) {
         if (window.scrollY > heroSection.offsetHeight) {
             nav.classList.add('scrolled');
         } else {
            nav.classList.remove('scrolled');
         }
      }
}

  window.addEventListener('scroll', updateNavbar);

  updateNavbar();
});