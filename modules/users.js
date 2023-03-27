const {db} = require('../db/db.js');
const bcrypt = require('bcrypt');

const getUsers = () =>{
  return db('users')
  .select('user_id', 'first_name', 'last_name', 'username', 'email', 'password')
  .orderBy('user_id')
}

const insertUsers = async(userData) =>{
  console.log('userdata',userData)
  const { username, password, email, first_name, last_name } = userData;
    
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      console.log('Username already exists.', existingUser)
      throw new Error('Username already exists.');
      // return res.status(400).json({ message: 'Username already exists.' });
    }
    const existingEmail = await db('users').where({ email }).first();
    if (existingEmail) {
      console.log('Email already exists.', existingEmail)
      throw new Error('Email already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword)
  return db('users')
  .insert({
    first_name,
    last_name,
    username,
    password: hashedPassword,
    email
    }
  )
  .returning('*')
}


const login = async(loginInfo) =>{
  try{
    const { email, password } = loginInfo;
    const user = await db('users').where({ email });
    console.log('log', user)
    if (user.lenght === 0) {
      // return false;
      throw new Error('Email not found.');
    }
    else{
      console.log(password, 'user password', user[0].password)
      const match = await bcrypt.compare(password, user[0].password);
      if(match) {
        console.log('logged-module', loginInfo)
      } else{
        throw new Error('Wrong password.');
      }
    }
  } catch(error){
    console.log(error);
  }
}

module.exports = {getUsers, insertUsers, login}