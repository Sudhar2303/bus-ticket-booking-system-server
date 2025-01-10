const express = require('express')
const router = express.Router();

const { validateUserSignupInputValues, validateUserLoginInput } = require('../validators/authValidator')
const { signup, login, logout } = require('../controllers/authController')

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - User Authentication
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: Johndoe123@
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Input validation error
 *       409:
 *         description: Conflict, User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/signup', validateUserSignupInputValues(), signup)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - User Authentication
 *     summary: User login for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: Johndoe123@
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Bad Request (Validation error)
 *       401:
 *         description: Unauthorized (Invalid email or password)
 *       500:
 *         description: Internal server error
 */

router.post('/login', validateUserLoginInput(), login)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - User Authentication
 *     summary: Logout the user and clear session cookies
 *     responses:
 *       201:
 *         description: User has been logged out successfully
 *       204:
 *         description: No active session found
 *       400:
 *         description: Invalid operation, no token found
 *       500:
 *         description: Internal server error
 */

router.post('/logout',logout)

module.exports = router