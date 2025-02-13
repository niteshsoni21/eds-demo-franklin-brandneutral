export default function decorate(block) {
    const blockAuthor = document.createElement('div');
    [...block.children].forEach((row) => {
        if(row.children[0].innerHTML !== "redirects"){
            const propertydiv = document.createElement('div');
            propertydiv.classList.add(`authorblock-`+row.children[0].innerHTML);
            propertydiv.innerHTML = `<p> ${row.children[1].innerHTML} </p>`;
            blockAuthor.appendChild(propertydiv);
        }else{
            const propertydiv = document.createElement('div');
            propertydiv.classList.add(`authorblock-`+row.children[0].innerHTML);

            const redirectList = document.createElement('ul');
            redirectList.classList.add('redirects-list');

            const redirectL = row.children[1].children;
            for(var link of redirectL){
                const li = document.createElement('li');
                li.innerHTML = link.innerHTML;
                redirectList.appendChild(li);
            }
            propertydiv.appendChild(redirectList);
            blockAuthor.appendChild(propertydiv);
        }
    });
        
    block.innerHTML = blockAuthor.innerHTML;
}