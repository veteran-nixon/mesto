export default class UserInfo {
    constructor({userName, userAbout, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userAbout = document.querySelector(userAbout);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() { 
        const userInfo = { 
            name: this._userName.textContent, 
            about: this._userAbout.textContent, 
            avatar: this._userAvatar.src 
        }; 

        return userInfo; 
    } 

    setUserInfo(data) {
        this._userName.textContent  = data.name;
        this._userAbout.textContent = data.about;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}