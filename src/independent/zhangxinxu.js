/**
 * How to block Ad? Just remove those doms
 * #headerimg -- header img
 * #sidebar -- siderbar
 * .colAside -- homepage aside
 */

let headerImg = document.getElementById('headerimg');
let sidebar = document.getElementById('sidebar');

let colAside = document.querySelector('.col-aside');

let cleanStack = [
  headerImg,
  sidebar,
  colAside
];

cleanStack.map(item => {
  if (item) {
    item.parentNode.removeChild(item);
  }
});


/**
 * And how to adjust page?
 * .col-main -- margin: 40px
 * .widecolumn -- no margin-right
 */
let colMain = document.querySelector('.col-main');
let wideColumn = document.querySelector('.widecolumn');

if (colMain) {
  colMain.style.margin = '40px';
}

if (wideColumn) {
  wideColumn.style.marginRight = '0';
}
