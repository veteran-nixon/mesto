export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    getObject() {
        return fetch(this._url, { headers: this._headers })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        })
    }

    createNewCard(data) {
        return fetch(this._url, { 
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }

    editProfile(data) {
        return fetch(this._url, { 
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }

    editAvatar(data) {
        return fetch(`${this._url}/avatar`, { 
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }

    deleteCard(id) {
        return fetch(`${this._url}/${id}`, { 
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }

    putLike(id) {
        return fetch(`${this._url}/${id}/likes`, { 
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }


    deleteLike(id) {
        return fetch(`${this._url}/${id}/likes`, { 
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }

    getLikes(data) {
        return fetch(`${this._url}/${data._id}/likes`, { 
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }

            return Promise.reject(`Something went wrong!`)
        });
    }
}