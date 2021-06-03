import Project from '../../../models/Project';
import Card, { CardDoc } from '../../../models/Card';
import { ContextType } from '../../../utils/createContext';

interface ArgsType {
  projectId: string;
  cardId: string;
  input: {
    category: string;
    body: string;
  };
}

export const updateCard = async (
  _parent: any,
  args: ArgsType,
  ctx: ContextType
): Promise<CardDoc> => {
  if (!ctx.hasAuth) {
    throw new Error('Please Login First!');
  }

  const user = await ctx.getUser();
  const project = await Project.findById(args.projectId);

  if (!project) {
    throw new Error('Project with then given ID was not found');
  }

  if (!user!.projects.includes(project._id)) {
    throw new Error('Not Authorized to perform this task into this field!');
  }

  const card = await Card.findById(args.cardId);

  if (!card) {
    throw new Error('Card with then given ID was not found');
  }

  card.set(args.input);
  const updatedCard = await card.save();

  return updatedCard;
};
