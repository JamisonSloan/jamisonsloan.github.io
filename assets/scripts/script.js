// Selects current page on the navigation bar

const pageTitle = document.title.toLowerCase();

const nav = document.getElementsByClassName("navigation");

const selectedNavItem = document.getElementById(pageTitle);

if (selectedNavItem) {
  selectedNavItem.classList.add("selected");
}

// finds external links and attaches an arrow icon
const allAnchors = document.getElementsByTagName("a");

for (const anchor of allAnchors) {
  if (
    anchor.getAttribute("href").includes("http") &&
    !anchor.parentNode.classList.contains("publication-item")
  ) {
    anchor.setAttribute("target", "_blank");
    anchor.classList.add("external-link");
  }
}

// const contentAnchors = document.querySelectorAll(".franklin-content a");

// var subNavigation = document.createElement('div');
// subNavigation.className = 'sub-navigation';

// for (const anchor of contentAnchors) {

//   if (anchor.getAttribute("href").includes(pageTitle +"/")) {
//     const title = anchor.innerHTML;
//     console.log(title);
//     var subNavigationItem = document.createElement('a');
//     subNavigationItem.setAttribute('href', anchor.getAttribute("href"));
//     subNavigationItem.appendChild(document.createTextNode(title));
//     subNavigation.appendChild(subNavigationItem);
//     selectedNavItem.after(subNavigation);
//   }

// }

// find internal links and attaches them to navigation bar
