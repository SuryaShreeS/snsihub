// src/services/api.js
const API_URL = 'http://localhost:5000/api/auth'; // Update with your actual API URL

export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to sign up'); // Handle error response
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
// router.post('/signup', async (req, res) => {
//     const { username, email, password, role } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with the role
//         const user = new User({
//             username,
//             email,
//             password: hashedPassword,
//             role: role || 'user', // Default to 'user' role if none is provided
//         });

//         await user.save();

//         // Generate a JWT token
//         const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

//         // Return the token and user data
//         res.status(201).json({
//             token,
//             user: {
//                 username: user.username,
//                 email: user.email,
//                 role: user.role,
//             },
//         });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ error: 'Server error during signup' });
//     }
// });
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Send email and password in the body
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to login');
        }

        const data = await response.json();
        return data; // Return token and user data
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};


export const fetchAllUsers = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                Authorization: token,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Fetch Users Error:', error);
        throw error;
    }
};


