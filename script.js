// Html elements
const searchBtn = document.querySelector("#search-btn");
const query = document.querySelector("#search-bar");
const content = document.querySelector("#content");

// Event Listeners
searchBtn.addEventListener("click", function () {
  search(content);
});
query.addEventListener("keydown", function (e) {
  if (e.key === "Enter") search(content);
});

// Functions and Handlers
function search(dom) {
  let matchedComponents = [];
  // Get search term and reset previous highlights
  const searchTerm = query.value;
  const highlights = dom.querySelectorAll(".highlight");
  for (let i = 0; i < highlights.length; i++) {
    const textNode = document.createTextNode(highlights[i].textContent);
    highlights[i].parentNode.replaceChild(textNode, highlights[i]);
  }
  // If search term is blank, do nothing and reset previous highlights
  if (!searchTerm) {
    return;
  }
  // Search for and highlight matching content
  const regex = new RegExp(searchTerm, "gi");
  const matches = dom.innerHTML.match(regex);
  if (matches) {
    dom.childNodes.forEach((node) => {
      if (!node.length) {
        if (regex.test(node.innerHTML)) {
          matchedComponents.push(node);
        }
        node.innerHTML = node.innerHTML.replace(
          regex,
          '<span class="highlight">$&</span>'
        );
      }
    });
  }
}
