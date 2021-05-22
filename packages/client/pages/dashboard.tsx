import { FC, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { useStateValue } from '../data/StateContext';
import { AUTHENTICATED_USER } from '../utils/queries/authenticatedUser';
import { GetServerSideProps } from 'next';
import { ApiErrorObj, Project, User } from '../utils/types';
import { client } from '../utils/ApolloClient';

interface AuthUser extends User {
  projects: Project[];
}

type DataType = {
  authUser: AuthUser;
  errors: null | ApiErrorObj[];
};

const dashboard: FC<DataType> = ({ authUser, errors }) => {
  const [{ user, projects }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: 'SET_USER',
      payload: {
        _id: authUser._id,
        githubId: authUser.githubId,
        username: authUser.username,
        avatar: authUser.avatar,
      },
    });
    dispatch({
      type: 'SET_PROJECTS',
      payload: authUser.projects,
    });
  }, []);

  return (
    <div>
      <Navbar username={user.username} avatar={user.avatar} />

      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-black">Projects</h2>
          <button className="hover:bg-light-blue-200 hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2">
            <svg
              className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
              width="12"
              height="20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
              />
            </svg>
            New
          </button>
        </header>
        <form className="relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects"
          />
        </form>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li key={project._id}>
              <ProjectCard
                description={project.projectDescription}
                id={project._id}
                name={project.projectName}
              />
            </li>
          ))}
          <li className="hover:shadow-lg flex rounded-lg">
            <Link href="/new">
              <span className="hover:border-transparent hover:shadow-xs w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
                New Project
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authHeader = ctx.req.headers.authorization;
  const token = authHeader ? authHeader.split(' ') : null;

  if (!token) {
    return {
      props: {
        errors: [
          {
            name: 'Not authorized',
            message: 'Please login First!',
          },
        ],
      },
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data, errors } = await client.query({ query: AUTHENTICATED_USER });
  if (!errors && data) {
    const propsData: DataType = {
      errors: null,
      authUser: data.authenticatedUser,
    };

    return {
      props: propsData,
    };
  }

  return {
    props: {
      errors: errors.forEach((e) => {
        return {
          name: e.name,
          message: e.message,
        };
      }),
    },
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

export default dashboard;
