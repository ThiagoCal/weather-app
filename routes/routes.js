const express = require('express');
const {_getUsers, _insertUsers, _login}  = require('../controllers/users.js')
const router = express.Router();

router.get('/form', _getUsers);
router.post('/formData', _insertUsers)
router.post('/login', _login)
router.get('/dashboard', (req, res) => {
  res.render('dashboard'); // render the dashboard template
});


module.exports = router