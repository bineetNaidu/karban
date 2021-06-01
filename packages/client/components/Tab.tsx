import { FC } from 'react';
import { Tab as TabType } from '../generated/graphql';

interface IProps {
  tab?: TabType;
  addTab?: boolean;
}

const Tab: FC<IProps> = ({ tab, addTab }) => {
  if (addTab) {
    return (
      <div className="hover:shadow-lg rounded-lg cursor-pointer h-5/6">
        <span className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
          Add Tab
        </span>
      </div>
    );
  }

  return (
    <div>
      <h1>{tab.tabName}</h1>
      <div>
        {tab.cards.map((c) => {
          <div key={c.cardId}>
            <p>{c.cardBody}</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Tab;
