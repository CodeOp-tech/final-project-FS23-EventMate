import Local from "./Local";

class ClientAPI {
  // To be updated later to actually get matched users for now it just gets all users
  static async getMatchedUsers() {
    return await this._doFetch("/users/matched");
  }

  //register
  static async registerUser(username, email, password) {
    let body = { username, password, email };
    return await this._doFetch("/register", "POST", body);
  }

  //Update User (more details)
  static async updateUser(body, userId) {
    return await this._doFetch(`/users/${userId}`, "PUT", body);
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

  //get event details from db
  static async getEventDetails(ticketMasterId){
    return await this._doFetch(`/events/ticketmaster/${ticketMasterId}`)
  }
  //get events by userID
  static async getUserEvents(userId){
    return await this._doFetch(`/events/user/${userId}`)
  }

  //add event - detailed entry
  static async addEventDetails( ticketmasterid, eventname, eventdate, starttime, 
    imageurl, eventlocation, venue, currency, startingprice, ticketurl, genre, 
    subgenre, host, eventtype) {
    let body = {  ticketmasterid, eventname, eventdate, starttime, imageurl, 
      eventlocation, venue, currency, startingprice, ticketurl, genre, 
      subgenre, host, eventtype};
    return await this._doFetch("/events", "POST", body);
  }

  //add event for user
  static async addToUserEvents (userid, ticketmasterid){
   let body = {userid, ticketmasterid}
   return await this._doFetch("/events/user", "POST", body);
  }

  //delete events by for individual user
  static async deleteUserEvents(eventId){
    return await this._doFetch(`/events/${eventId}`, "DELETE");
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
        //uresponse.data = await response.json(); //check error messages on all of them or none of them
      }
    } catch (err) {
      uresponse.error = err.message;
    }

    return uresponse;
  }
}

export default ClientAPI;
