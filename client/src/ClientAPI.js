import Local from "./helpers/Local";

class ClientAPI {
  static async commect() {
    return await this._doFetch("/api");
  }

  // To be updated later to actually get matched users for now it just gets all users
  static async getMatchedUsers() {
    return await this._doFetch(`/api/users/matched`);
  };

  
  static async _doFetch(url, method = 'GET', body = null) {

    let options = { 
      method,
      headers: {},
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    let uresponse = { ok: false, data: null, status: 0, error: "" };

    try {
      let response = await fetch(url, options);
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
