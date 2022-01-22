export default class UserInfo {
    constructor({userName, userBio}) {
        this._userName = document.querySelector(userName);
        this._userBio = document.querySelector(userBio);
    }

    getUserInfo() {
        const userInfo = {
            name: this._userName.textContent,
            bio: this._userBio.textContent
        };
        return userInfo;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userBio.textContent = data.bio;
    }
}