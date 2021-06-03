import { FC } from 'react';
import { Card as ICard, useDeleteCardMutation } from '../generated/graphql';

interface Props {
  card: ICard;
  projectId: string;
}

export const Card: FC<Props> = ({ card, projectId }) => {
  const [deleteCard] = useDeleteCardMutation();
  return (
    <div className="px-4 py-2 border-2 border-blue-200 h-20 border-dashed relative group rounded shadow">
      <p>{card.body}</p>

      <button
        className="absolute top-0 bg-red-600 text-white px-2 py-1 right-0 font-light text-xs opacity-0 group-hover:opacity-100 transition-all"
        onClick={async () => {
          await deleteCard({
            variables: {
              cardId: card._id,
              projectId,
            },
            update: (cache) => {
              cache.evict({ id: 'Card:' + card._id });
            },
          });
        }}
      >
        X
      </button>
    </div>
  );
};
