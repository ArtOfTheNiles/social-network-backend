import User from '../models/user';
import { Request, Response } from 'express';

// POST add a friend to user friend list
export const addFriend = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { friendId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add friend' });
  }
};

// DELETE remove a friend from user friend list
export const removeFriend = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { friendId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add friend' });
  }
};