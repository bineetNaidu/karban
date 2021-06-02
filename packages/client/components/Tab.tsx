import { FC } from 'react';
import { Tab as TabType, useDeleteCardMutation } from '../generated/graphql';
import useToggle from '../hooks/useToggle';
import { useProjectStore } from '../lib/project.store';
import AddCardModal from './AddCardModal';
import AddTabModal from './AddTabModal';

interface IProps {
  tab?: TabType;
  addTab?: boolean;
}

const Tab: FC<IProps> = ({ tab, addTab }) => {
  const [isAddTabModalOpen, toggleAddTabModal] = useToggle(false);
  const [isAddCardModalOpen, toggleAddCardModal] = useToggle(false);
  const [deleteCard] = useDeleteCardMutation();
  const { _id } = useProjectStore();

  if (addTab) {
    return (
      <>
        <AddTabModal open={isAddTabModalOpen} toggle={toggleAddTabModal} />
        <div
          className="hover:shadow-lg rounded-lg cursor-pointer"
          onClick={toggleAddTabModal}
        >
          <span className="hover:border-transparent hover:shadow-xs w-full h-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
            Add Tab
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <AddCardModal
        open={isAddCardModalOpen}
        toggle={toggleAddCardModal}
        tabId={tab._id}
      />
      <div className="border-2 border-gray-200 border-dashed px-4 py-2 rounded mx-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-medium">{tab.tabName}</h1>

          <button onClick={toggleAddCardModal}>+</button>
        </div>
        <hr />
        <div>
          {!tab
            ? null
            : tab.cards.map((c) => (
                <div
                  key={c._id}
                  className="relative bg-gray-200 px-2 py-1 my-1 rounded h-20 group"
                >
                  <p>{c.cardBody}</p>

                  <button
                    className="absolute top-0 right-0 bg-red-400 px-2 py-1 text-white text-xs opacity-0 group-hover:opacity-100 transition-all"
                    onClick={async () =>
                      await deleteCard({
                        variables: {
                          cardId: c._id,
                          projectId: _id,
                          tabId: tab._id,
                        },
                      })
                    }
                  >
                    X
                  </button>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Tab;
