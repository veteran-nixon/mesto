export default class UserInfo {
    constructor({userName, userBio, userAvatar}) {
        this._userName = userName;
        this._userBio = userBio;
        this._userAvatar = userAvatar;
    }

    getUserInfo(data) {
        const userInfo = {
            name: data.name,
            about: data.about,
            avatar: data.avatar
        };
        return userInfo;
    }

    setUserInfo(data) {
        this._userName = data.name;
        this._userBio = data.about;
    }

    setUserAvatar(data) {
        this._userAvatar = data.avatar;
    }
}