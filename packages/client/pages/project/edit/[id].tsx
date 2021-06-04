import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Spinner from '../../../components/Spinner';
import Wrapper from '../../../components/Wrapper';
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '../../../generated/graphql';
import useForm from '../../../hooks/useForm';
import { withApollo } from '../../../lib/withApollo';

const EditProject = () => {
  const router = useRouter();
  const { data, loading } = useGetProjectByIdQuery({
    variables: {
      id: router.query.id as string,
    },
  });
  const [updateProject] = useUpdateProjectMutation();
  const [projectName, handleProjectname, resetName, setName] = useForm('');
  const [projectDescription, handleProjectDesc, resetDesc, setDesc] =
    useForm('');

  useEffect(() => {
    console.log(router.query.id);

    if (data) {
      setName(data.getProjectById.projectName);
      setDesc(data.getProjectById.projectDescription);
    }
  }, [loading]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateProject({
      variables: {
        id: router.query.id as string,
        projectDescription,
        projectName,
      },
    });

    resetName();
    resetDesc();
    router.push(`/project/${router.query.id}`);
  };

  return (
    <Wrapper>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg m-16 w-7/12 mx-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Update Project
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            details and application.
          </p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <form className="border-t border-gray-200" onSubmit={handleUpdate}>
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Project name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    className="mt-1 ring-indigo-500 border px-2 border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
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
                    className="shadow-sm ring-indigo-500 border px-2 border-indigo-500 mt-1 block w-full sm:text-sm rounded-md"
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
                  Update Project
                </button>
              </div>
            </dl>
          </form>
        )}
      </div>
    </Wrapper>
  );
};

export default withApollo()(EditProject);
