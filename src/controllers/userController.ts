import { Request, Response } from "express";
import UserModel from "../models/user";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, age } = req.body;
        const id = uuidv4();
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }
        await UserModel.create({ id, name, email, age });
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOne({ id });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const user = await UserModel.findOneAndUpdate({ id }, { name, email, age });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOneAndDelete({ id });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
