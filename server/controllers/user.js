const User = require("../models/user");


exports.show = function(req, res, next) {
  res.json({ user: req.user });
}

exports.update = function(req, res, next){
  const existingUser = req.user;
  const userId = req.body._id;
  if (!existingUser)
    res.status(422).send({ error: "Vous avez été déconnecté" });
  else if (existingUser._id.toString() != userId.toString())
    res.status(422).send({ error: "Vous n'êtes pas autorisé à modifier ce profil" });
  else {
    User.findByIdAndUpdate(userId, req.body, { new: true }, function (err, user) {
      if (err)
        return next(err);
      else {
        user.populate('cvs', function (err, finalUser) {
          if (err)
            return next(err);
          res.json({ user: finalUser });
        });

      }
    })

  }
}