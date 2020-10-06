class Config {
    constructor() {
      this.host = "http://127.0.0.1";
      this.port = ":5000";
  
      this.api = {
        loginWithGoogle: "/api/drive/uri",
        getAuthorisation : "/api/drive/getoauth"
      };
    }
  }
  
  var obj = new Config();
  export default obj;