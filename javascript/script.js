let editDialog = document.querySelector("#edit");
let profileEditButton = document.querySelector("#edit-button");
let closeDialogButton = document.querySelector(".profile__close-button");
let profileNameNode = document.querySelector("#profile-name");
let profileAboutNode = document.querySelector("#profile-job");
let inputNameNode = document.querySelector("#name");
let inputAboutNode = document.querySelector("#job");
let formProfile = document.querySelector("#profile-form");

profileEditButton.addEventListener("click", function () {
  inputNameNode.value = profileNameNode.textContent;
  inputAboutNode.value = profileAboutNode.textContent;
  editDialog.showModal();
});

closeDialogButton.addEventListener("click", function () {
  editDialog.close();
});

formProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputNameNode.value !== "" && inputAboutNode.value !== "") {
    profileNameNode.textContent = inputNameNode.value;
    profileAboutNode.textContent = inputAboutNode.value;
    editDialog.close();
  }
});
