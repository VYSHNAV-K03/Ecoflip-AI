// backend/routes/supplierRoutes.js
const express = require("express");
const {
  verifySupplier,
  getSuppliers,
  getUsers,
} = require("../controllers/supplierController");
const authMiddleware = require("../middlewares/authMiddleware");
const axios = require("axios");
const enrollmentModel = require("../models/Orders");

const router = express.Router();

// Route to get all suppliers
router.get("/suppliers", authMiddleware, getSuppliers);

router.post("/suppliers/verify/:id", authMiddleware, verifySupplier);

// const COHERE_API_KEY = 'EwsZMxrTB63TlwtnxzPb5KwqLBRmoNy8rla0zJve';

// router.post('/generate-abstract', async (req, res) => {
//     const { text } = req.body;

//     console.log(text);

//     try {
//         const response = await axios.post(
//             'https://api.cohere.ai/generate',
//             {
//                 model: 'command-xlarge-nightly', // You can use 'command-xlarge' or 'command-medium' based on your requirements
//                 prompt: `Generate a concise abstract for the following text: ${text}`,
//                 max_tokens: 150, // Adjust max tokens based on how long you want the abstract
//                 temperature: 0.7, // Adjust temperature for creativity (0-1 scale)
//                 stop_sequences: ['\n']
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${COHERE_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const abstract = response.data.text.trim();
//         console.log(abstract);
//         res.json({ abstract });
//     } catch (error) {
//         console.error('Error generating abstract:', error);
//         res.status(500).json({ error: 'Failed to generate abstract' });
//     }
// });

// Route to verify a supplier

module.exports = router;
