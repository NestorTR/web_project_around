export default class UserInfo {
  constructor(usernameSelector, jobSelector) {
    this._username = document.querySelector(usernameSelector);
    this._job = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      username: this._username.textContent.trim(),
      job: this._job.textContent.trim(),
    };
  }
  setUserInfo({ username, job }) {
    this._username.textContent = username;
    this._job.textContent = job;
  }
}
