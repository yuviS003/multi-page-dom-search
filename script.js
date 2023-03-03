// Html elements
const searchBtn = document.querySelector("#search-btn");
const fetchAnotherDomBtn = document.querySelector("#fetchAnotherDom-btn");
const query = document.querySelector("#search-bar");
const content = document.querySelector("#content");

// Event Listeners
searchBtn.addEventListener("click", function () {
  search(content);
});
fetchAnotherDomBtn.addEventListener("click", function () {
  fetchAllDoms();
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
  console.log(matchedComponents[0].getAttribute("id"));
}

const parser = new DOMParser();
function fetchAllDoms() {
  if (query.value === "") return;
  fetch("./pages")
    .then((response) => response.text())
    .then((data) => {
      const htmlFiles = data.match(/href="([^"]*\.html)"/g);
      if (htmlFiles) {
        htmlFiles.forEach((file) => {
          const fileName = file.match(/href="([^"]*\.html)"/)[1];
          fetch(fileName)
            .then((response) => response.text())
            .then((data) => {
              const dom = parser.parseFromString(data, "text/html");
              dom.body.childNodes.forEach((node) => {
                if (!node.length && node.nodeName !== "SCRIPT") {
                  searchAnotherDOM(node, fileName);
                }
              });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    })
    .catch((err) => console.error(err));
}

function searchAnotherDOM(dom, fileName) {
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
      }
    });
  }
  if (matchedComponents.length > 0) {
    matchedComponents.forEach((match) => {
      const matchID = match.getAttribute("id");
      const matchFileName = fileName.split("/")[fileName.split("/").length - 1];
      console.log(matchID, matchFileName);
    });
  }
}
