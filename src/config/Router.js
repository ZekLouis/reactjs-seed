import Home from '../components/Home';
import About from '../components/About';

export default class Router {

	constructor(auth) {
		this.auth = auth;
	}

	getDefaultRoute() {
		return {
			'path': '/',
			'component': Home,
			'name': 'home',
			'text': 'Home'
		}
	}

	getRoutes() {
		let routes = [];
        if ( this.auth.isAuth() ) {
            routes = this.getAuthRoutes();
        } else {
            routes = this.getPublicRoutes();
        }
        return routes;
	}

	getAuthRoutes() {
		return [
			{
				'path': '/',
				'component': Home,
				'name': 'home',
				'text': 'Home',
				'icon': 'user'
			},
			{
				'path': '/about',
				'component': About,
				'name': 'about',
				'text': 'About',
				'icon': 'video-camera'
			},
		];
	}

	getPublicRoutes() {
		return [
			{
				'path': '/',
				'component': Home,
				'name': 'home',
				'text': 'Home',
				'icon': 'video-camera'
			},
		];
	}

}