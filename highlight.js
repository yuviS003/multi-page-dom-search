const fileName =
  window.location.pathname.split("/")[
    window.location.pathname.split("/").length - 1
  ];
const searchObject = JSON.parse(localStorage.getItem(fileName));
const content = document.getElementById("content");
highlight(content, searchObject.query);

const searchTimeout = setTimeout(clearSearchFromStorage, 10000);

// Functions and Handlers
function highlight(dom, query) {
  const searchTerm = query;
  // const highlights = dom.querySelectorAll(".highlight");
  // for (let i = 0; i < highlights.length; i++) {
  //   const textNode = document.createTextNode(highlights[i].textContent);
  //   highlights[i].parentNode.replaceChild(textNode, highlights[i]);
  // }
  clearExistingSearches(dom);
  const regex = new RegExp(searchTerm, "gi");
  const matches = dom.innerHTML.match(regex);
  if (matches) {
    dom.childNodes.forEach((node) => {
      if (!node.length) {
        node.innerHTML = node.innerHTML.replace(
          regex,
          '<span class="highlight">$&</span>'
        );
      }
    });
  }
}

function clearExistingSearches(dom) {
  const highlights = dom.querySelectorAll(".highlight");
  for (let i = 0; i < highlights.length; i++) {
    const textNode = document.createTextNode(highlights[i].textContent);
    highlights[i].parentNode.replaceChild(textNode, highlights[i]);
  }
}

function clearSearchFromStorage() {
  localStorage.removeItem(fileName);
  clearExistingSearches(content);
}
