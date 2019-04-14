import Cookie from '../Utils/Cookie';
import Encode from '../Utils/Encode';

export default class Auth {

    auth = null;
    cookie_name = 'auth_session';

    constructor() {
        // try to load the session from the cookie
        this.loadFromCookie();
    }

    loadFromCookie() {
        let value = Cookie.getCookie(this.cookie_name);
        try {
            if (value !== '' && typeof value !== 'undefined') {
                value = JSON.parse(Encode.base64decode(value));
                this.auth = value;
            }
        } catch (e) {
            console.error('Fail during session reading');
            console.error(e);
        }
    }

    loadToCookie() {
        let value = JSON.stringify(this.auth);
        value = Encode.base64encode(value);
        Cookie.setCookie(this.cookie_name, value, 30);
    }

    destroyCookie() {
        Cookie.deleteCookie(this.cookie_name);
    }

    login(form, callback = () => {}) {
        // todo maybe update this for a bit more of security :D
        if (form.username === 'zeklouis' && form.password === 'zeklouis') {
            this.auth = {
                username: form.username
            }

            this.loadToCookie();

            callback(true);
        } else {
            callback(false);
        }
    }

    logout() {
        this.auth = null;
        this.destroyCookie();
    }

    isAuth() {
        return this.auth !== null;
    }

    getAuth() {
        return this.auth;
    }
}