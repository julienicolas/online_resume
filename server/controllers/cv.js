const Cv        = require("../models/cv");
const http      = require('http');
const debug     = require('debug')(http);
const fs        = require('fs');
const path      = require('path');
const multer    = require('multer');

const IMAGES_PATH = path.resolve(__dirname, 'cvs/images');
const upload = multer({
  dest: IMAGES_PATH,
  llimits: {fileSize: 1000000}
}).single('picture');

exports.index = function (req, res, next) {
  Cv.find({}).sort({ date: 1 }).exec(function (err, cvs) {
    if (err) {
      return next(err);
    } else {
      res.json({ cvs: cvs });
    }
  })
}

exports.create = function (req, res, next) {
  const title = req.body.title;
  const existingUser = req.user;
  const picture = req.body.picture ? fs.readFileSync(req.body.picture.file.path) : null;
  if (!existingUser)
    res.status(422).send({ error: "Vous avez été déconnecté" });
  const cv = new Cv({
    title: title,
    _creator: existingUser._id
  });
  if (picture) {
    cv.picture.data = picture;
    cv.picture.contentType = 'image/jpeg';
  }
  cv.save(function (err) {
    if (err) {
      return next(err);
    }
    existingUser.cvs.push(cv);
    existingUser.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ user: existingUser });
    });

  });
};


exports.update = function (req, res, next) {
  const cvId = req.body._id
  const existingUser = req.user;
  if (!existingUser)
    res.status(422).send({ error: "Vous avez été déconnecté" });
  else {
    Cv.findById(cvId, (err, cv) => {
      if (err)
        return next(err);
      else {
        if (existingUser._id.toString() != cv._creator.toString())
          res.status(422).send({ error: "Vous n'êtes pas autorisé à modifier ce cv" });
        else {

          // const picture = req.body.picture ? fs.readFileSync(req.body.picture.preview) : null;
          // req.body.picture = picture;
          upload(req, res, (multererr) => {
            if (multererr)
              return next(multererr);
            // Cv.updateOne(cv, req.body, (err, updatedCv) => {
            //   if (err)
            //     return next(err);
            //   else {
            //     existingUser.populate('cvs', function (err, user) {
            //       if (err)
            //         return next(err);
            //       res.json({ user: user });
            //     });

            //   }
            // })
          });

        }
      }
    })
  }
};

exports.delete = function (req, res, next) {
  const cvId = req.body._id;
  const existingUser = req.user;
  Cv.findById(cvId, (err, cv) => {
    debug('booting %o', cv._creator);
    if (err)
      return next(err);
    else {
      if (!existingUser)
        res.status(422).send({ error: "Vous avez été déconnecté" });
      else if (cv._creator && (existingUser._id.toString() != cv._creator.toString()))
        res.status(422).send({ error: "Vous n'êtes pas autorisé à modifier ce cv" });
      else {
        Cv.deleteOne(cv, function (err, cv) {
          if (err)
            return next(err);
          else {
            existingUser.populate('cvs', function (err, user) {
              if (err)
                return next(err);
              res.json({ user: user });
            });
          }
        })
      }
    }
  })

};

