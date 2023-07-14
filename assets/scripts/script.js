// Takes sub-navigation elements and puts them under the right parent navigation element
const subNavElems = document.querySelectorAll(".sub-navigation");
const navDiv = document.querySelector(".navigation");

for (const subNavElem of subNavElems) {
  const parentPage = subNavElem.getAttribute("href").split("/")[1];
  const parentPageNavElem = document.getElementById(parentPage);
  navDiv.removeChild(subNavElem);
  navDiv.insertBefore(subNavElem, findNextNavElem(parentPageNavElem));
}

// Finds the next navigation element after the parent page that's not a sub-navigation element
function findNextNavElem(parentPageNavElem) {
  const navItems = Array.from(document.querySelectorAll(".navigation a"));
  const parentPageNavIndex = navItems.indexOf(parentPageNavElem);

  return navItems.slice(parentPageNavIndex + 1).find(navItem => !navItem.classList.contains("sub-navigation"));
}

// Selects current page on the navigation bar
const pageTitle = document.title.toLowerCase().replace(/\s/g, "-");
const selectedNavItem = document.getElementById(pageTitle);

if (selectedNavItem) {
  selectedNavItem.classList.add("selected");
  displaySubNavElem(selectedNavItem);
}

// Takes the selected navigation item and displays its sub-navigation elements
function displaySubNavElem(selectedNavItem) {
  const navItems = document.querySelectorAll(".navigation a");
  const parentPageId = selectedNavItem.classList.contains("sub-navigation")
    ? selectedNavItem.getAttribute("href").split("/")[1]
    : selectedNavItem.getAttribute("id");

  for (const navItem of navItems) {
    if (navItem.classList.contains("sub-navigation") && navItem.getAttribute("href").includes(parentPageId)) {
      navItem.style.display = "flex";
      document.getElementById(parentPageId).classList.add("selected-parent");
    }
  }
}

// Finds external links and attaches an arrow icon
const allAnchors = document.querySelectorAll("a");

for (const anchor of allAnchors) {
  const href = anchor.getAttribute("href");

  if (href.includes("http") || (href.includes(".pdf") && !anchor.parentNode.classList.contains("publication-item"))) {
    anchor.setAttribute("target", "_blank");
    anchor.classList.add("external-link");
  }
}
