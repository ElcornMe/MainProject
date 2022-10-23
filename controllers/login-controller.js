const jwt = require('jsonwebtoken');
require('dotenv').config();

const Validation = require('../helpers/checkValidation');
const checkColumnInTable = require('../helpers/checkColumnTable')
const randomString = require('../helpers/randomString')

// GET METHOD
const getLogin = async (req, res) => {
  await res.render('login');
};

// POST METHOD
const postLogin = async (req, res) => {
  let { email, password } = req.body; 

  // VALIDATION FUNCTION
  const checkUser = await Validation(email, password)

  // CREATE TOKEN WITH SALT
  if(!checkUser.errorLogIn) {
    let token = jwt.sign(
      { userId: checkUser.userId,
        salt: randomString(8)},
        process.env.SECRET_KEY
    );
    
    // FUNCTION: CREATE OR UPDATE TOKEN IN DATABASE
    await checkColumnInTable(checkUser.userId, token)

    res.cookie('userId', token, {httpOnly: true});
    res.render('main', {title: 'Online Shop', name: checkUser.userName, city: checkUser.userCity});
  }else {
    res.render('error', {cap: checkUser.errorLogIn, userEmail: "Try once more"});
  };
};


module.exports = {
  getLogin,
  postLogin
};