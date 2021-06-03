import { FC, useState } from 'react';
import { useCreateCardMutation } from '../generated/graphql';
import useForm from '../hooks/useForm';

interface Props {
  projectId: string;
}

const CreateCard: FC<Props> = ({ projectId }) => {
  const [showInput, setShowInput] = useState(false);
  const [body, handleBody, resetBody] = useForm('');
  const [createCard] = useCreateCardMutation();

  const toggleView = () => {
    setShowInput((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCard({
      variables: {
        input: { body },
        projectId,
      },
    });
    resetBody();
    toggleView();
  };

  return (
    <div className="hover:shadow-lg flex rounded-lg cursor-pointer">
      {showInput ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col justify-center rounded-lg border-2 border-blue-200 text-sm font-medium py-4 w-full"
        >
          <h2 className="mb-2 text-base">Card Body</h2>
          <textarea
            className=" outline-black"
            value={body}
            onChange={handleBody}
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white w-10/12 mt-2 rounded py-1"
          >
            Add
          </button>
        </form>
      ) : (
        <span
          className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-blue-200 text-sm font-medium py-4"
          onClick={toggleView}
        >
          Add Card
        </span>
      )}
    </div>
  );
};

export default CreateCard;
