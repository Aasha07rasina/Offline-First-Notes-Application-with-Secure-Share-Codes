const { z } = require('zod');

// This defines exactly what a Note should look like
const noteSchema = z.object({
  id: z.string().uuid().or(z.string()), // Accepts UUIDs or strings
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().optional(),
  updatedAt: z.string().or(z.date())
});

// This defines the structure for the /share/generate request
const shareSchema = z.object({
  notes: z.array(noteSchema).min(1, "At least one note is required to share")
});

const validateNotes = (req, res, next) => {
  try {
    // Check if the incoming data matches the schema
    shareSchema.parse(req.body); 
    next(); // If valid, move to the controller
  } catch (error) {
    // If invalid, stop the request and send back the error
    return res.status(400).json({ error: error.errors });
  }
};

module.exports = { validateNotes };