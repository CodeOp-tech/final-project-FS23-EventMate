class Local {
  static saveUserInfo(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  static removeUserInfo(token, user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static getToken() {
    localStorage.getItem("token") || "";
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
    return user.id;
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