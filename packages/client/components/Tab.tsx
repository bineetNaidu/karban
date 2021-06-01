import { FC } from 'react';
import { Tab as TabType } from '../generated/graphql';
import useToggle from '../hooks/useToggle';
import { withApollo } from '../lib/withApollo';
import AddTabModal from './AddTabModal';

interface IProps {
  tab?: TabType;
  addTab?: boolean;
}

const Tab: FC<IProps> = ({ tab, addTab }) => {
  const [isAddCardModalOpen, toggleAddCardModal] = useToggle(false);

  if (addTab) {
    return (
      <>
        <AddTabModal open={isAddCardModalOpen} toggle={toggleAddCardModal} />
        <div
          className="hover:shadow-lg rounded-lg cursor-pointer"
          onClick={toggleAddCardModal}
        >
          <span className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
            Add Tab
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="border-2 border-gray-200 border-dashed px-4 py-2 rounded mx-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-medium">{tab.tabName}</h1>

        <button>+</button>
      </div>
      <hr />
      <div>
        {tab.cards.map((c) => {
          <div key={c._id}>
            <p>{c.cardBody}</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default withApollo()(Tab);
