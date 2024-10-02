const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (userData) => {
    const { first_name, last_name, email, phone, address, gender, password, birthdate } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
        first_name,
        last_name,
        email,
        phone,
        address,
        gender,
        password: hashedPassword,
        birthdate,
        role: 'patient', 
    });

    
    await newUser.save();

    return newUser;
};
