export default class Encode {
	static base64encode(string) {
		return btoa(string);
	}

	static base64decode(string) {
		return atob(string);
	}
}