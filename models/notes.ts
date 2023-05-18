import mongoose, { Document, Model, Schema } from 'mongoose';

export interface NoteModel extends Document {
  title: string;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
}

const noteSchema: Schema<NoteModel> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note: Model<NoteModel> = mongoose.model<NoteModel>('Note', noteSchema);

export default Note;