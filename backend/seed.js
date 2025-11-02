require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  if(await User.findOne({username:'admin'})){
    console.log('Admin exists');
    process.exit(0);
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@32789!', salt);
  await new User({username:'admin', passwordHash, role:'admin'}).save();
  console.log('Admin created: username=admin password=Admin@32789!');
  process.exit(0);
}
seed();
