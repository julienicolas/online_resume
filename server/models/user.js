const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//création de model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: {type: String, select: false},
  firstName: String,
  lastName: String,
  cvs: [{type: Schema.Types.ObjectId, ref: 'cv'}]
}, {timestamps: true});

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordEqualTo = function(externalPassword, done){
  bcrypt.compare(externalPassword,this.password,function( err, isMatch){
    if(err){
      return done(err)
    }
    done(null,isMatch)
  })
}
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
