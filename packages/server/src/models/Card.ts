import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

export enum CategoryEnum {
  Todo = 'Todo',
  OnGoing = 'OnGoing',
  Done = 'Done',
}

export interface CardDoc extends mongoose.Document {
  category: CategoryEnum;
  body: string;
}

interface CardModel extends mongoose.Model<CardDoc> {
  build(body: string): CardDoc;
}

const CardSchema = new mongoose.Schema<CardDoc, CardModel>({
  category: {
    type: String,
    enum: CategoryEnum,
    default: CategoryEnum.Todo,
  },
  body: StringAndRequired,
});

CardSchema.statics.build = (body) => {
  return new Card({ body });
};

const Card = mongoose.model<CardDoc, CardModel>('Card', CardSchema);

export default Card;
