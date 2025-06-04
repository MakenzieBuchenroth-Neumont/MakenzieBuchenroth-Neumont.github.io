'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })
}

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select && selectItems.length && selectValue && filterBtn.length) {
  select.addEventListener('click', function () {elementToggleFunc(this); });

  for(let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener('click', function() {

          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          elementToggleFunc(select);
          filterFunc(selectedValue);

      });
  }

  const filterItems = document.querySelectorAll('[data-filter-item]');

  const filterFunc = function (selectedValue) {
      for(let i = 0; i < filterItems.length; i++) {
          if(selectedValue == "all") {
              filterItems[i].classList.add('active');
          } else if (selectedValue == filterItems[i].dataset.category) {
              filterItems[i].classList.add('active');
          } else {
              filterItems[i].classList.remove('active');
          }
      }
  }

  //Enabling filter button for larger screens

  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

      filterBtn[i].addEventListener('click', function() {

          let selectedValue = this.innerText.toLowerCase();
          selectValue.innerText = this.innerText;
          filterFunc(selectedValue);

          lastClickedBtn.classList.remove('active');
          this.classList.add('active');
          lastClickedBtn = this;

      })
  }
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length && formBtn) {
  for(let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener('input', function () {
          if(form.checkValidity()) {
              formBtn.removeAttribute('disabled');
          } else {
              formBtn.setAttribute('disabled', '');
          }
      })
  }
}

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks.length && pages.length) {
  navigationLinks.forEach(navLink => {
      navLink.addEventListener('click', function() {
          const targetPage = this.dataset.navLink; // Get target page name

          console.log(`Clicked on: ${targetPage}`); // Debugging

          // Remove 'active' from all pages and nav links
          pages.forEach(page => page.classList.remove('active'));
          navigationLinks.forEach(link => link.classList.remove('active'));

          // Add 'active' to the clicked nav link and target page
          const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
          if (targetElement) {
              targetElement.classList.add('active');
              console.log(`Activated page: ${targetPage}`);
          } else {
              console.error(`No matching page found for: ${targetPage}`);
          }

          this.classList.add('active'); // Highlight the active nav link

          // Scroll to top when navigating
          window.scrollTo(0, 0);
      });
  });
}

//const navigationLinks = document.querySelectorAll('[data-nav-link]');
//const pages = document.querySelectorAll('[data-page]');

//for(let i = 0; i < navigationLinks.length; i++) {
    //navigationLinks[i].addEventListener('click', function() {

        //for(let i = 0; i < pages.length; i++) {
            //if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                //pages[i].classList.add('active');
                //navigationLinks[i].classList.add('active');
                //window.scrollTo(0, 0);
            //} else {
                //pages[i].classList.remove('active');
                //navigationLinks[i]. classList.remove('active');
            //}
        //}

// GitHub Repo Widget Logic
document.addEventListener('DOMContentLoaded', function() {
  const widgets = document.querySelectorAll('.github-widget');
  widgets.forEach(widget => {
    const repoOwner = widget.getAttribute('data-github-owner');
    const repoName = widget.getAttribute('data-github-repo');
    if (!repoOwner || !repoName) return;
    const repoApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

    widget.querySelector('.github-repo-name').textContent = 'Loading repo...';
    widget.querySelector('.github-repo-desc').textContent = '';

    // Fetch repo info
    fetch(repoApiUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(repo => {
        const nameDiv = widget.querySelector('.github-repo-name');
        nameDiv.innerHTML = `
          <span class="github-repo-title">
            <svg class="github-logo" height="18" viewBox="0 0 16 16" width="18" aria-hidden="true" style="vertical-align:middle;margin-right:6px;"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            <a href='${repo.html_url}' target='_blank' style='color:var(--orange-yellow-crayola);font-weight:600;text-decoration:underline;vertical-align:middle;'>${repo.name}</a>
          </span>
        `;
        let desc = repo.description || '';
        if (desc.length > 100) desc = desc.slice(0, 100) + '...';
        widget.querySelector('.github-repo-desc').textContent = desc;
      })
      .catch(() => {
        widget.querySelector('.github-repo-name').textContent = 'Could not load repo info.';
        widget.querySelector('.github-repo-desc').textContent = '';
      });
  });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const button = this.querySelector('[data-form-btn]');
        const originalText = button.innerHTML;
        button.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
        button.disabled = true;

        // Get form data
        const formData = {
            from_name: this.from_name.value,
            reply_to: this.reply_to.value,
            message: this.message.value,
            to_name: 'Makenzie Buchenroth',
            to_email: this.reply_to.value  // Use the sender's email from the form
        };

        // Send email using EmailJS
        emailjs.send('service_je6nrg9', 'template_0fd75bp', formData)
            .then(function() {
                // Success
                button.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
                contactForm.reset();
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 3000);
            }, function(error) {
                // Error
                button.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon><span>Error! Try Again</span>';
                console.error('EmailJS error:', error);
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 3000);
            });
    });
}
