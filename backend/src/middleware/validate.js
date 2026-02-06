const { z } = require('zod');

const shareSchema = z.object({
  notes: z.array(z.object({
    id: z.string(),
    title: z.string().min(1),
    content: z.string().optional(),
    updatedAt: z.string()
  })).min(1).max(500) 
});

// Use named export to be safe
const validateNotes = (req, res, next) => {
  const result = shareSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Corrupted or invalid notes data" });
  }
  next();
};

module.exports = { validateNotes }; // Export as an object