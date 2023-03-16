import Local from "./Local";

class ClientAPI {
  // To be updated later to actually get matched users for now it just gets all users
  static async getMatchedUsers() {
    return await this._doFetch("/users/matched");
  };

  //register
  static async registerUser(username, password, email) {
    let body = { username, password, email };
    return await this._doFetch("/register", "POST", body);
  }

  //login
  static async loginUser(username, password) {
    let body = { username, password };
    return await this._doFetch("/login", "POST", body);
  }
  //get all users
  static async getUsers() {
    return await this._doFetch("/users");
  }
  //get user by id
  static async getUser(userId) {
    return await this._doFetch(`/users/${userId}`);
  }
  //get content
  static async getContent(url) {
    return await this._doFetch(url);
  }

  static async _doFetch(url, method = "GET", body = null) {
    let options = {
      method,
      headers: {},
    };

    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    let uresponse = { ok: false, data: null, status: 0, error: "" };

    try {
      let response = await fetch("/api" + url, options); // /api/login..each route has an api before it cause it is needed for the proxy
      if (response.ok) {
        uresponse.ok = true;
        uresponse.data = await response.json();
        uresponse.status = response.status;
      } else {
        uresponse.status = response.status;
        uresponse.error = response.statusText;
      }
    } catch (err) {
      uresponse.error = err.message;
    }

    return uresponse;
  }
}

export default ClientAPI;
