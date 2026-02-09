const { z } = require('zod');

const shareSchema = z.object({
  notes: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional(), // Content can be empty
    updatedAt: z.string()
  })).min(1)
});

const validateNotes = (req, res, next) => {
  const result = shareSchema.safeParse(req.body);
  if (!result.success) {
    // This logs EXACTLY what is wrong to your terminal [cite: 55, 58]
    console.log("Validation Failed:", result.error.format());
    return res.status(400).json({ error: "Corrupted or invalid notes data" });
  }
  next();
};

module.exports = { validateNotes };