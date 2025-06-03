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
    const readmeApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/readme`;

    widget.querySelector('.github-repo-name').textContent = 'Loading repo...';
    widget.querySelector('.github-repo-desc').textContent = '';
    widget.querySelector('.github-readme').textContent = 'Loading README...';

    // Fetch repo info
    fetch(repoApiUrl)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(repo => {
        const nameDiv = widget.querySelector('.github-repo-name');
        nameDiv.innerHTML = `<a href='${repo.html_url}' target='_blank' style='color:var(--orange-yellow-crayola);font-weight:600;text-decoration:underline;'>${repo.name}</a>`;
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
