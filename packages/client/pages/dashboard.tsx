import { FC } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import { withApollo } from '../lib/withApollo';
import { useAuthenticatedUserQuery } from '../generated/graphql';
import Spinner from '../components/Spinner';
import Wrapper from '../components/Wrapper';

const dashboard: FC = () => {
  const { data, loading } = useAuthenticatedUserQuery();
  if (!loading && !data) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <Wrapper>
      <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 w-4/6 m-auto">
        <header className="flex items-center justify-between">
          <h2 className="text-lg leading-6 font-medium text-black">
            Your Projects
          </h2>
        </header>
        <form className="relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
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
          {loading ? (
            <Spinner />
          ) : (
            data.authenticatedUser.projects.map((project) => (
              <li key={project._id}>
                <ProjectCard
                  description={project.projectDescription}
                  id={project._id}
                  name={project.projectName}
                />
              </li>
            ))
          )}
          <Link href="/new">
            <li className="hover:shadow-lg flex rounded-lg cursor-pointer">
              <span className="hover:border-transparent hover:shadow-xs w-full hover:bg-blue-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-sm font-medium py-4">
                New Project
              </span>
            </li>
          </Link>
        </ul>
      </section>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(dashboard);
