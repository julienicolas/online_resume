require("./services/passport");
const passport = require("passport");
const AuthentificationController =  require("./controllers/authentification");
const UserController =              require("./controllers/user");
const CVController =                require("./controllers/cv");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = function(expressServer) {
  expressServer.post("/signup", AuthentificationController.signup);

  expressServer.post("/signin", AuthentificationController.signin);

  expressServer.get("/me", requireToken, UserController.show);
  expressServer.post('/update_user', requireToken, UserController.update);

  expressServer.get("/cvs", CVController.index);
  expressServer.post("/create_cv", requireToken, CVController.create);
  expressServer.post("/update_cv", requireToken, CVController.update);
  expressServer.post("/delete_cv", requireToken, CVController.delete);

};
