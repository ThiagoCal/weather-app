const {getUsers, insertUsers, login} = require('../modules/users.js')


const _getUsers = (req,res) =>{
  // console.log(res)
  getUsers()
  .then(data =>{
    console.log(data)
    res.json(data)
  })
  .catch(err =>{
    console.log(err)
  })
}

const _insertUsers = (req, res) =>{
  // console.log('req',req)
  insertUsers(req.body)
  .then(data =>{
    res.json(data)
  })
  .catch(err =>{
    console.log(err)
  })
}

const _login = (req, res) =>{
  console.log('req',req)
  login(req.body)
  .then(data =>{
    res.json(data)
  })
  .catch(err =>{
    console.log(err)
  })
}


module.exports = {_getUsers, _insertUsers, _login}
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const {db} = require('../config/db.js');

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// }));