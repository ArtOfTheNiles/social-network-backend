import Thought from '../models/thought';
import { Request, Response } from 'express';


// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
};

// POST a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thoughts = Array.isArray(req.body) ? req.body : [req.body];
    const newThoughts = await Thought.insertMany(thoughts);
    res.status(201).json(newThoughts);
  } catch (error) {
    res.status(400).json({ 
      error: 'Failed to create thought(s)', 
      details: error instanceof Error ? error.message : 'Unknown error when creating thought(s)'
    });
  }
};

// /:thoughtId
// GET thought by _id
export const getThoughtById = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById({ _id: thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thought' });
  }
};

// PUT update thought by _id
export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const updatedthought = await Thought.findByIdAndUpdate(thoughtId, req.body);
    if (!updatedthought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(updatedthought);
    } catch (error) {
    res.status(400).json({ error: 'Failed to update thought' });
    }
};

// DELETE thought by _id
export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const deletedthought = await Thought.findByIdAndDelete(thoughtId);
    return res.status(200).json([{ deletedthought }, { message: 'Thought deleted successfully!' }]);
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete thought' });
  }
};

// POST add a reaction to thought reaction list
export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, { $addToSet: { reactions: reactionId } }, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add reaction' });
  }
};

// DELETE remove a reaction from thought reaction list
export const removeReaction = async (req: Request, res: Response) => {
  const {  thoughtId, reactionId  } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: reactionId } }, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add reaction' });
  }
};
