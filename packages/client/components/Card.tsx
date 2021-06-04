import { FC } from 'react';
import {
  Card as ICard,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '../generated/graphql';
import useForm from '../hooks/useForm';
import useToggle from '../hooks/useToggle';

interface Props {
  card: ICard;
  projectId: string;
}

export const Card: FC<Props> = ({ card, projectId }) => {
  const [updateMode, toggleUpdateMode] = useToggle(false);
  const [deleteCard] = useDeleteCardMutation();
  const [body, handleBody, resetBody] = useForm(card.body);
  const [updateCard] = useUpdateCardMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCard({
      variables: {
        input: { body },
        projectId,
        cardId: card._id,
      },
      update: (cache) => {
        cache.evict({ fieldName: 'Card' });
      },
    });
    resetBody();
    toggleUpdateMode();
  };

  return (
    <div className="px-4 py-2 border-2 border-blue-200 h-20 m-1 border-dashed relative group rounded shadow">
      {updateMode ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col justify-center rounded-lg border-2 border-blue-200 text-sm font-medium py-4 z-50"
        >
          <h2 className="mb-2 text-base">Edit Card Body</h2>
          <textarea
            className="mx-5 outline-black"
            value={body}
            onChange={handleBody}
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white w-10/12 mt-2 rounded py-1"
          >
            Update!
          </button>
          <button
            type="reset"
            onClick={toggleUpdateMode}
            className="bg-red-500 text-white w-10/12 mt-2 rounded py-1"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{card.body}</p>

          <div className="absolute top-0 right-0">
            <button
              className="bg-green-600 text-white px-2 py-1 right-0 font-light text-xs opacity-0 group-hover:opacity-100 transition-all mr-1"
              onClick={toggleUpdateMode}
            >
              <img src="/edit.svg" alt="" className="text-white h-5" />
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 right-0 font-light text-xs opacity-0 group-hover:opacity-100 transition-all"
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
              <img src="/trash.svg" alt="" className="text-white h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
