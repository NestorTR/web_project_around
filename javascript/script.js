let editButtonOpen = document.querySelector("#edit-button-open");
let editButtonClose = document.querySelector("#edit-button-close");
let profileEdit = document.querySelector("#edit");
let profileNameElement = document.getElementById("profile-name");
let profileJobElement = document.getElementById("profile-job");

editButtonOpen.addEventListener("click", () => {
  inputFieldName.value = profileNameElement.textContent;
  inputFieldJob.value = profileJobElement.textContent;

  toggleSaveButton();

  profileEdit.show();
  document.querySelector(".header").style.opacity = "0.5";
  document.querySelector(".profile").style.opacity = "0.5";
  document.querySelector(".elements").style.opacity = "0.5";
  document.querySelector(".footer").style.opacity = "0.5";
});

editButtonClose.addEventListener("click", () => {
  profileEdit.close();
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
});

let inputFieldName = document.querySelector(".profile__edit-form-input_name");
let inputFieldJob = document.querySelector(".profile__edit-form-input_job");
let saveButton = document.getElementById("save-button");

function toggleSaveButton() {
  if (inputFieldName.value.trim() !== "" && inputFieldJob.value.trim() !== "") {
    saveButton.style.backgroundColor = "black";
    saveButton.style.color = "white";
  } else {
    saveButton.style.backgroundColor = "transparent";
    saveButton.style.color = "#c4c4c4";
  }
}
inputFieldName.addEventListener("input", toggleSaveButton);
inputFieldJob.addEventListener("input", toggleSaveButton);
toggleSaveButton();

let formElement = document.querySelector("#profile-form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.getElementById("name");
  let jobInput = document.getElementById("job");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector("#profile-name");
  let profileJob = document.querySelector("#profile-job");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  profileEdit.close();
  document.querySelector(".header").style.opacity = "1";
  document.querySelector(".profile").style.opacity = "1";
  document.querySelector(".elements").style.opacity = "1";
  document.querySelector(".footer").style.opacity = "1";
}

formElement.addEventListener("submit", handleProfileFormSubmit);
