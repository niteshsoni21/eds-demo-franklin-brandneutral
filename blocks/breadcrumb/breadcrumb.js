import createTag from '../../utils/tag.js';
import { getMetadata } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const isDocumentationLanding = window.location.pathname === '/docs/';
  const list = createTag('ul');
  const home = createTag('li', {}, '<a href="https://publish-p71852-e1137339.adobeaemcloud.com/auto/us/en/home.html" class="breadcrumb-link-underline-effect">Home</a>');

  list.append(home);

  const category = getMetadata('category');
  const title = getMetadata('og:title');

  console.log(title);

  if (category) {
    const section = createTag(
      'li',
      {},
      `<a href="/docs/#${category.toLowerCase()}" class="breadcrumb-link-underline-effect category">${category}</a>`,
    );
    list.append(section);
  }

  if (!isDocumentationLanding) {
    const article = createTag('li', {}, `<a href="${window.location.pathname}">${title}</a>`);
    list.append(article);
  }

  // make the last item to be unclickable as already on the page
  const listLinks = list.querySelectorAll('a');
  const lastLinkItem = listLinks[listLinks.length - 1];
  lastLinkItem.classList.remove('breadcrumb-link-underline-effect');
  lastLinkItem.style.cursor = 'default';
  lastLinkItem.addEventListener('click', (e) => e.preventDefault());

  block.classList.add('contained');
  if (isDocumentationLanding) {
    block.parentElement.classList.add('no-shadow');
  }

  const innerDiv = block.querySelector(':scope > div > div');
  innerDiv.append(list);
}