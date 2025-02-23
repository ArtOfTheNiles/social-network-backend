import { Schema, model, Document, ObjectId, Types} from 'mongoose';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  id: false,
});

reactionSchema.virtual('CreatedAt_DateOnly').get(function (this: IReaction) {
  return this.createdAt.toLocaleString();
});

const Reaction = model<IReaction>('Reaction', reactionSchema);

export default Reaction;
