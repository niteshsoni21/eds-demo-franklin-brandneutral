// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

function executeAccordion() {
  const mediaQuery = window.matchMedia('(max-width: 1023px)');
  const accordionSections = document.querySelectorAll('.col-accordion');
  accordionSections.forEach((section, index) => {
    const heading = section.querySelector('.col-list-heading');
    const content = section.querySelector('.col-list-content');
    if (mediaQuery.matches && index !== 0) {
      heading.classList.remove('active');
      content.style.display = 'none';
      if (heading.getAttribute("init") !== "true") {
        heading.addEventListener('click', () => {
          heading.classList.toggle('active');
          content.style.display = content.style.display !== 'block' ? 'block' : 'none';
        });
        heading.setAttribute("init", "true");
      }
    } else {
      content.style.display = 'block';
    }
  });
}

window.addEventListener('resize', (event) => {
  executeAccordion();
});
executeAccordion();

var checkboxes = document.querySelectorAll('input[type=checkbox][name=compare]');
var compareButtonParent = document.querySelector('.recommendedvariants-container');
var compareButton = compareButtonParent.querySelector('[title="Compare Variants"]');

compareButton.classList.add('isDisabled');
for (var checkbox of checkboxes) {
  checkbox.addEventListener('change', function (event) {
    if (event.target.checked) {
      event.target.nextSibling.innerHTML = 'Added To Compare';
    }
    else {
      event.target.nextSibling.innerHTML = 'Add To Compare';
    }
    if (document.querySelectorAll('input[type=checkbox][name=compare]:checked').length >= 2) {
      compareButton.classList.remove('isDisabled');
      document.querySelectorAll('input[type=checkbox][name=compare]:not(:checked)').forEach((item) => item.disabled = true)
    }
    else {
      compareButton.classList.add('isDisabled');
      checkboxes.forEach((item) => item.disabled = false)
    }
  });
}

const tagList = document.getElementById("tags-list");
if (tagList) {
  tagList.addEventListener("click", function (e) {
    if (e.target.nodeName === 'LI') {
      e.target.classList.toggle("bg-blue");
    }
  });
}