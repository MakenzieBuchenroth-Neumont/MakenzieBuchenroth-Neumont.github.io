'use strict';

// Utility Functions
const toggleClass = (element, className = 'active') => element.classList.toggle(className);
const addClass = (element, className = 'active') => element.classList.add(className);
const removeClass = (element, className = 'active') => element.classList.remove(className);
const scrollToTop = () => window.scrollTo(0, 0);

// DOM Elements
const elements = {
    sidebar: document.querySelector('[data-sidebar]'),
    sidebarBtn: document.querySelector('[data-sidebar-btn]'),
    select: document.querySelector('[data-select]'),
    selectValue: document.querySelector('[data-select-value]'),
    selectItems: document.querySelectorAll('[data-select-item]'),
    filterItems: document.querySelectorAll('[data-filter-item]'),
    filterBtns: document.querySelectorAll('[data-filter-btn]'),
    form: document.querySelector('[data-form]'),
    formInputs: document.querySelectorAll('[data-form-input]'),
    formBtn: document.querySelector('[data-form-btn]'),
    navLinks: document.querySelectorAll('[data-nav-link]'),
    pages: document.querySelectorAll('[data-page]')
};

// Sidebar Toggle
elements.sidebarBtn.addEventListener('click', () => toggleClass(elements.sidebar));

// Filter Functionality
const filterItems = (selectedValue) => {
    elements.filterItems.forEach(item => {
        const shouldShow = selectedValue === 'all' || selectedValue === item.dataset.category;
        shouldShow ? addClass(item) : removeClass(item);
    });
};

// Select Dropdown
elements.select.addEventListener('click', () => toggleClass(elements.select));

elements.selectItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedValue = item.innerText.toLowerCase();
        elements.selectValue.innerText = item.innerText;
        toggleClass(elements.select);
        filterItems(selectedValue);
    });
});

// Filter Buttons
let lastClickedBtn = elements.filterBtns[0];

elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedValue = btn.innerText.toLowerCase();
        elements.selectValue.innerText = btn.innerText;
        filterItems(selectedValue);
        
        removeClass(lastClickedBtn);
        addClass(btn);
        lastClickedBtn = btn;
    });
});

// Contact Form Validation
elements.formInputs.forEach(input => {
    input.addEventListener('input', () => {
        elements.formBtn.disabled = !elements.form.checkValidity();
    });
});

// Navigation
elements.navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        const targetPage = navLink.dataset.navLink;
        
        // Reset all pages and nav links
        elements.pages.forEach(page => removeClass(page));
        elements.navLinks.forEach(link => removeClass(link));
        
        // Activate target page and nav link
        const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetElement) {
            addClass(targetElement);
            addClass(navLink);
        } else {
            console.error(`Page not found: ${targetPage}`);
        }
        
        scrollToTop();
    });
});
