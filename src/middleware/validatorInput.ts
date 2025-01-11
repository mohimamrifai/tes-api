import { Request, Response, NextFunction } from "express";

export const validatorInput = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, age } = req.body;

    // Check if required fields exist
    if (!name || !email || !age) {
        res.status(400).json({
            status: "error",
            message: "Name, email, and age are required",
        });
        return;
    }

    // Validate name
    if (typeof name !== 'string' || name.trim().length < 1) {
        res.status(400).json({
            status: "error", 
            message: "Name must be a non-empty string"
        });
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        res.status(400).json({
            status: "error",
            message: "Invalid email format"
        });
        return;
    }

    // Validate age
    if (typeof age !== 'number' || age <= 0) {
        res.status(400).json({ message: 'Age must be an integer and positive number' });
        return;
    }

    next();
};