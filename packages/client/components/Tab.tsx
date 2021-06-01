import { FC, useState } from 'react';
import { Tab as TabType } from '../generated/graphql';
import useToggle from '../hooks/useToggle';
import { withApollo } from '../lib/withApollo';
import AddCardModal from './AddCardModal';
import AddTabModal from './AddTabModal';

interface IProps {
  tab?: TabType;
  addTab?: boolean;
}

const Tab: FC<IProps> = ({ tab, addTab }) => {
  const [isAddTabModalOpen, toggleAddTabModal] = useToggle(false);
  const [isAddCardModalOpen, toggleAddCardModal] = useToggle(false);

  if (addTab) {
    return (
      <>
        <AddTabModal open={isAddTabModalOpen} toggle={toggleAddTabModal} />
        <div
          className="hover:shadow-lg rounded-lg cursor-pointer"
          onClick={toggleAddTabModal}
        >
          <span className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
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
        tab={tab._id}
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
                <div key={c._id}>
                  <p>{c.cardBody}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default withApollo()(Tab);
