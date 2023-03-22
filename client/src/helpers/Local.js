class Local {

  static updateUserInfo(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static saveUserInfo(token, user) {
    console.log("localuser:", user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
  static updateUserInfo(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  static removeUserInfo(token, user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static getToken() {
    return localStorage.getItem("token") || "";
  }

  static getUser() {
    let userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  }

  static getUserId() {
    let userjson = localStorage.getItem("user");
    if (!userjson) {
      return "";
    }
    let user = JSON.parse(userjson);
    return user.userId;
  }

  static getUserName() {
    let userjson = localStorage.getItem("user");
    if (!userjson) {
      return "";
    }
    let user = JSON.parse(userjson);
    return user.username;
  }
}

export default Local;
