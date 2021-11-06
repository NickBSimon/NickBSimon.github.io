let ul = document.getElementsByTagName('ul')[0];
// ADD NEW ITEM TO END OF LIST
let li1 = document.createElement('li');
li1.append(document.createTextNode('cream'));
ul.append(li1);
// ADD NEW ITEM START OF LIST
let li2 = document.createElement('li');
li2.append(document.createTextNode('kale'));
ul.insertBefore(li2, ul.firstChild);
// ADD A CLASS OF COOL TO ALL LIST ITEMS
let listSize = document.querySelectorAll('li').length;
for(let i = 0; i < listSize; i++){
    ul.children.item(i).classList.add('cool');
}
// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
let h2 = document.getElementsByTagName('h2')[0];
h2.insertAdjacentHTML("beforeend", `<span>${listSize}</span>`);