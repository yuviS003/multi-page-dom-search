const fileName =
  window.location.pathname.split("/")[
    window.location.pathname.split("/").length - 1
  ];
const searchObject = JSON.parse(localStorage.getItem(fileName));
highlight(document.getElementById("content"), searchObject.query);

// Functions and Handlers
function highlight(dom, query) {
  const searchTerm = query;
  const highlights = dom.querySelectorAll(".highlight");
  for (let i = 0; i < highlights.length; i++) {
    const textNode = document.createTextNode(highlights[i].textContent);
    highlights[i].parentNode.replaceChild(textNode, highlights[i]);
  }
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
