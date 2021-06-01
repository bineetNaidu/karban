import { FC } from 'react';
import { useCreateTabMutation } from '../generated/graphql';
import useForm from '../hooks/useForm';
import { useProjectStore } from '../lib/project.store';
import { withApollo } from '../lib/withApollo';

interface Props {
  open: boolean;
  toggle: () => void;
}

const AddTabModal: FC<Props> = ({ open, toggle }) => {
  const [createTab] = useCreateTabMutation();
  const { addTab, _id } = useProjectStore();
  const [tabName, handleTabname, resetTabname] = useForm('');

  const handleCreateTab = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createTab({
      variables: { id: _id, tabName },
    });
    if (data.createTab) {
      addTab(data.createTab);
      resetTabname();
      toggle();
    }
  };

  return open ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Tab</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={toggle}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form className="relative p-6 flex-auto" onSubmit={handleCreateTab}>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Tab name
              </p>
              <input
                type="text"
                onChange={handleTabname}
                value={tabName}
                className="border border-black rounded px-2 py-1"
              />
              <button
                className="bg-emerald-500 text-green-800 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};

export default withApollo()(AddTabModal);
