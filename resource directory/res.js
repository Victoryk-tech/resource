let createButton = document.getElementById("button");
let modalContainer = document.getElementById("modal-container");
let closeModalIcon = document.getElementById("close-modal-icon");
let form = document.getElementById("form");
let nameOfWebsite = document.getElementById("name-of-website");
let linkOfWebsite = document.getElementById("link-of-website");
let description = document.getElementById("description-of-wesite");
let resourcesSection = document.getElementById("resource-section");

let resources = [];

createButton.addEventListener("click", revealModalContainer);
function revealModalContainer() {
  if (modalContainer.classList.contains("modal-container")) {
    modalContainer.classList.remove("modal-container");
    modalContainer.classList.add("modal-container-visible");
  }
}
closeModalIcon.addEventListener("click", hideModalContainer);
function hideModalContainer() {
  if (modalContainer.classList.contains("modal-container-visible")) {
    modalContainer.classList.remove("modal-container-visible");
    modalContainer.classList.add("modal-container");
  }
}

form.addEventListener("submit", collectAndSaveResources);
function collectAndSaveResources(event) {
  event.preventDefault();
  let websiteName = nameOfWebsite.value;
  let websiteLink = linkOfWebsite.value;
  let websiteDescription = description.value;
  //console.log(websiteName, websiteLink, websiteDescription);

  const resourceObject = {
    nameOfWebsite: websiteName,
    linkOfWebsite: websiteLink,
    description: websiteDescription,
  };
  resources.push(resourceObject);
  localStorage.setItem("resources", JSON.stringify(resources));
  form.reset();
  hideModalContainer();
  fetchResource;
}
function fetchResource() {
  if (localStorage.getItem("resources")) {
    resources = JSON.parse(localStorage.getItem("resources"));
  }
  showResources();
}
fetchResource();

function showResources() {
  resourcesSection.innerHTML = "";
  resources.forEach(function (resourceObect, index) {
    let theWebsiteName = resourceObect.nameOfWebsite;
    let theWebsiteLink = resourceObect.linkOfWebsite;
    let theWebsiteDescription = resourceObect.description;

    let resourceDiv = document.createElement("div");
    resourceDiv.classList.add("resource");

    let nameOfWebsiteAndDeleteIconDiv = document.createElement("div");
    nameOfWebsiteAndDeleteIconDiv.classList.add(
      "name-of-ebsite-and-delete-icon"
    );
    let nameOfWebsiteText = document.createElement("a");
    nameOfWebsiteText.setAttribute("href", `${theWebsiteLink}`);
    nameOfWebsiteText.textContent = theWebsiteName;
    nameOfWebsiteText.setAttribute("target", "_blank");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash");
    deleteIcon.setAttribute("id", "delete-icon");
    deleteIcon.setAttribute("onclick", `deleteResource('${theWebsiteLink}')`);

    let descriptionOfWebsiteDiv = document.createElement("div");
    descriptionOfWebsiteDiv.classList.add("description-of-website-container");

    let descriptionText = document.createElement("p");
    descriptionText.textContent = theWebsiteDescription;

    //appending

    nameOfWebsiteAndDeleteIconDiv.append(nameOfWebsiteText, deleteIcon);
    descriptionOfWebsiteDiv.append(descriptionText);
    resourceDiv.append(nameOfWebsiteAndDeleteIconDiv, descriptionOfWebsiteDiv);
    resourcesSection.append(resourceDiv);
  });
}

function deleteResource(theWebsiteLink) {
  resources.forEach(function (resourceObject, index) {
    if (resourceObject.linkOfWebsite === theWebsiteLink) {
      resources.splice(index, 1);
    }
  });
  localStorage.setItem("resources", JSON.stringify(resources));
  fetchResource();
}
