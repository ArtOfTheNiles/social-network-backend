import { Schema, model, Document } from 'mongoose';
import Reaction from './reaction';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: string[]; // Array of reaction IDs
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date || String,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [Reaction],
},{
  toJSON: { virtuals: true },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

thoughtSchema.virtual('CreatedAt_DateOnly').get(function (this: IThought) {
  return this.createdAt.toLocaleString();
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
