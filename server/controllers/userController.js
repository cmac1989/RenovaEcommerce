const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = (req, res) => {
    const { email, password, username } = req.body;
    
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    userModel.findByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error checking email" });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        userModel.create(username, email, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error registering user' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        });
        
    })
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log("route hit")
    console.log(email, password);

    userModel.findByEmail(email, (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid email or password'});
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.json({ token });
        return res.status(201).json({ message: 'User successfully logged in',token });
    });
};