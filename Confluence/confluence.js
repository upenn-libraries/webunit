/**
* Refined Toolkit Class Script
*
* Author: Dana Berkowitz
* Gives unique class names to the page nodes on page load
* and after observed changes to title.
*/

let checkInterval = setInterval(checkWrapper, 10);
function checkWrapper() {
  if (document.head.contains(document.getElementsByTagName("TITLE")[0])) {
    let pageTitle = document.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    let bodyClass = pageTitle.replace(/\s+/g, '');
    addBodyClass(bodyClass);
    addNodeClass(bodyClass);
    titleObserver();
    clearInterval(checkInterval);
  }
}

function titleObserver() {
  const targetNode = document.getElementsByTagName("TITLE")[0];
  // Options for the observer (which mutations to observe)
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  };
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      console.log(mutation.addedNodes.length + ' nodes added');
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        console.log('  "' + mutation.addedNodes[i].textContent + '" added');
        let pageTitle = mutation.addedNodes[i].textContent
        let str = pageTitle.replace(/\s+/g, '');
        addBodyClass(str);
        addNodeClass(str);
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function addNodeClass(bodyClass) {
  const collection = document.getElementById("rw_wrapper").querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (let i = 0; i < collection.length; i++) {
     let nodeText = collection[i].innerText;
     let anchorText = encodeURIComponent(nodeText);
     collection[i].id = anchorText;
    }
}
function addBodyClass(title) {
  document.getElementsByTagName("BODY")[0].className = title;
}
