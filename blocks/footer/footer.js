import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');    
    footer.innerHTML = html;
    
    // Editing FooterColumns DIV
    const footerColDiv = footer.querySelector('.footercolumn');
    const newDiv = document.createElement('div');
    newDiv.classList.add('footer-cols');

    [...footerColDiv.children].forEach((row) => {
      const propertydiv = document.createElement('div');
      propertydiv.classList.add(`col-`+row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase(),'col-accordion');

      const colHeading = document.createElement('p');
      colHeading.setAttribute('id',row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase());
      colHeading.classList.add('col-list-heading');
      colHeading.innerHTML = row.children[0].innerHTML;
      propertydiv.appendChild(colHeading);

      const redirectList = document.createElement('ul');
      redirectList.classList.add('col-list-content');
      
      // redirectList.id = 'col-list-content'

      const redirectL = row.children[1].children;
      for(var lists of redirectL){
        [...lists.children].forEach((li) => {
          li.classList.add("accord");
        })
        redirectList.innerHTML = lists.innerHTML;
      }
      propertydiv.appendChild(redirectList);
      newDiv.appendChild(propertydiv);
    });

    // Editing SocialBlock DIV
    const socialCol = document.createElement('div');
    socialCol.classList.add('col-social');
    const socialDiv = footer.querySelector('.socialblock');

    [...socialDiv.children].forEach((row) => {
      if(row.children[1].children.length === 0){
        const propertydiv = document.createElement('div');
        propertydiv.classList.add(row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase());
        propertydiv.innerHTML = `<p> ${row.children[1].innerHTML} </p>`;
        socialCol.appendChild(propertydiv);
      }else{
          const propertydiv = document.createElement('div');
          propertydiv.classList.add(row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase());

          const redirectList = document.createElement('ul');
          redirectList.classList.add('list-content');;

          const redirectL = row.children[1].children;
          for(var link of redirectL){
              const li = document.createElement('li');
              li.innerHTML = link.innerHTML;
              redirectList.appendChild(li);
          }
          propertydiv.appendChild(redirectList);
          socialCol.appendChild(propertydiv);
      }
    })
    //to put social col in newDiv itself.
    newDiv.appendChild(socialCol);

    // Editing Footenote DIV
    const footnoteDiv = footer.querySelector('.footnote > div > div');
    const footnoteList = footer.querySelector('.footnote > div > div > ul');
    footnoteDiv.classList.add('footnote')
    footnoteList.classList.add('footnote-list');

    [...footnoteList.children].forEach((row) => {
      const p = document.createElement('p');
      p.innerHTML = row.innerHTML;
      row.innerHTML = '';
      row.append(p);
    })

    // replace with new markup.
    footerColDiv.innerHTML = '';
    footerColDiv.append(newDiv);
    footerColDiv.append(footnoteDiv);

    // with wrapper
    const footerContent = document.createElement('div');
    footerContent.classList.add("footer-content");
    footerContent.innerHTML = footerColDiv.innerHTML;

    // Footer Bar
    const footerBar = footer.querySelector('.footerbar');
    const footBarList = footer.querySelector('.footerbar > div > div > ul');

    const footerBarDiv = document.createElement('div');
    footerBarDiv.classList.add('footer-bar');

    [...footerBar.children].forEach((row) => {
      if(row.children[1].children.length === 0){
        const propertydiv = document.createElement('div');
        propertydiv.classList.add(row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase());
        propertydiv.innerHTML = `<p> ${row.children[1].innerHTML} </p>`;
        footerBarDiv.appendChild(propertydiv);
      }else{
        const propertydiv = document.createElement('div');
        propertydiv.classList.add(row.children[0].innerHTML.replace(/\s+/g, "-").toLowerCase());

        const listDiv = document.createElement('ul');
        listDiv.classList.add('footerbar-list');

        const links = footBarList.children;
        for(var link of links){
          const li = document.createElement('li');
          li.innerHTML = link.innerHTML;
          listDiv.appendChild(li);
        }

        propertydiv.appendChild(listDiv);
        footerBarDiv.appendChild(propertydiv);
      }
    })

    // To add wrapper on footer-content div
    const footerContentWrapper = document.createElement('div');
    footerContentWrapper.classList.add("footer-content-wrapper");
    block.appendChild(footerContentWrapper);
    footerContentWrapper.appendChild(footerContent);

    // To add wrapper on footer-bar div
    const footerBarWrapper = document.createElement('div');
    footerBarWrapper.classList.add("footer-bar-wrapper");
    block.appendChild(footerBarWrapper);
    footerBarWrapper.appendChild(footerBarDiv);
    
    decorateIcons(footer);
  }
}