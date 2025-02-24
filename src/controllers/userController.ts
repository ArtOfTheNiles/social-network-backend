import User from '../models/user';
import { Request, Response } from 'express';

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const users = Array.isArray(req.body) ? req.body : [req.body];
    const newUsers = await User.insertMany(users);
    res.status(201).json(newUsers);
  } catch (error) {
    res.status(400).json({ 
      error: 'Failed to create user(s)', 
      details: error instanceof Error ? error.message : 'Unknown error when creating user(s)'
    });
  }
};

// /:userId
// GET user by _id
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// PUT update user by _id
export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
    } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
    }
};

// DELETE user by _id
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.status(200).json([{ deletedUser }, { message: 'User deleted successfully!' }]);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};

// POST add a friend to user friend list
// DELETE remove a friend from user friend list