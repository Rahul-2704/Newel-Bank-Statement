const pool=require('../connection')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const getUsers=async(req,res)=>{
    pool.query('SELECT * FROM users',(error,results)=>{
        if(error) throw  error;
        res.status(200).json(results.rows);
    })
}
const loginUser=async(req,res)=>{
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Create a JWT token for the user
        const token = jwt.sign({ userId: user.id }, 'rahul27', {
            expiresIn: '1h', // Token expiration time
        });

        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const registerUser=async(req,res)=>{
    const { name,email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name,email,password) VALUES ($1, $2,$3) RETURNING id',
            [name,email, hashedPassword]
        );

        const userId = result.rows[0].id;
        const user=result.rows[0]

        // Create a JWT token for the user
        const token = jwt.sign({ userId }, 'rahul27', {
            expiresIn: '1h', // Token expiration time
        });

        res.status(201).json({ message: 'User registered successfully', token,user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports={getUsers,registerUser,loginUser}