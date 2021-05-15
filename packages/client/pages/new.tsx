import useForm from '../hooks/useForm';

const NewProjectPage = () => {
  const [projectName, handleProjectname] = useForm('');
  const [projectDescription, handleProjectDesc] = useForm('');

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg m-16">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          New Project
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          details and application.
        </p>
      </div>
      <form className="border-t  border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Project name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                value={projectName}
                onChange={handleProjectname}
              />
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Project Description
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <textarea
                value={projectDescription}
                onChange={handleProjectDesc}
              ></textarea>
            </dd>
          </div>
          <div className="flex flex-col-reverse">
            <button
              type="submit"
              className="bg-green-100 text-green-700 text-base font-semibold px-6 py-2 rounded-lg"
            >
              Create Project
            </button>
          </div>
        </dl>
      </form>
    </div>
  );
};

export default NewProjectPage;
