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
    console.log('GET CVS', cvs.length, cvs, err)
    if (err) {
      return next(err);
    } else {
      res.json({ cvs: cvs });
    }
  })
}

exports.create = function (req, res, next) {
  console.log('CV CREATE', req.body);
  const title = req.body.title;
  const existingUser = req.user;
  console.log('PICTURE IS 1', req.body.picture ? req.body.picture.file : '');
  const picture = req.body.picture ? fs.readFileSync(req.body.picture.file.path) : null;
  console.log('PICTURE IS', picture);
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
  console.log('COUCOU CV UPDATE', req.body)
  console.log('PICTURE IS 1', req.body.picture.file);
  if (!existingUser)
    res.status(422).send({ error: "Vous avez été déconnecté" });
  else {
    console.log('ON VEUT TROUVER LE CV');
    Cv.findById(cvId, (err, cv) => {
      if (err)
        return next(err);
      else {
        console.log('ON A TROUVE LE CV SUPER', cv)
        if (existingUser._id.toString() != cv._creator.toString())
          res.status(422).send({ error: "Vous n'êtes pas autorisé à modifier ce cv" });
        else {
          console.log('COUCOU ICI LA', req.body.picture.file)

          // const picture = req.body.picture ? fs.readFileSync(req.body.picture.preview) : null;
          // req.body.picture = picture;
          upload(req, res, (multererr) => {
            console.log('AFTER UPLOAD', multererr, req.body);
            if (multererr)
              return next(multererr);
            // Cv.updateOne(cv, req.body, (err, updatedCv) => {
            //   if (err)
            //     return next(err);
            //   else {
            //     console.log('ONA UPDATE LE CV SUCCESSFULLY');
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
  console.log('CV DELETE CONTROLLER', req.body, req.body._creator)
  Cv.findById(cvId, (err, cv) => {
    console.log('TEST', err, cv)
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

