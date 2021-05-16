import React from 'react';
import router from 'next/router';
import { useMutation } from '@apollo/client';
import { useStateValue } from '../data/StateContext';
import useForm from '../hooks/useForm';
import { CREATE_PROJECT } from '../utils/queries/createProject';

const NewProjectPage = () => {
  const [projectName, handleProjectname] = useForm('');
  const [projectDescription, handleProjectDesc] = useForm('');
  const [createProject] = useMutation(CREATE_PROJECT);
  const [{ user }, dispatch] = useStateValue();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectDescription && projectName) {
      const { data, errors } = await createProject({
        variables: { projectName, projectDescription, token: user.token },
      });

      if (errors) return;

      dispatch({
        type: 'ADD_PROJECT',
        payload: {
          _id: data.createProject._id,
          projectDescription: data.createProject.projectDescription,
          projectName: data.createProject.projectName,
          tabs: data.createProject.tabs,
        },
      });

      router.push('/dashboard');
    }
  };

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
      <form className="border-t border-gray-200" onSubmit={handleCreate}>
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Project name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                className="mt-1 ring-indigo-500 border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
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
                className="shadow-sm ring-indigo-500 border-indigo-500 mt-1 block w-full sm:text-sm rounded-md"
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
