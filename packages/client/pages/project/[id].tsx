import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Spinner from '../../components/Spinner';
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from '../../generated/graphql';
import { withApollo } from '../../lib/withApollo';
import { useProjectStore } from '../../lib/project.store';
import { useEffect } from 'react';

const Project = () => {
  const router = useRouter();

  const { data, loading } = useGetProjectByIdQuery({
    variables: { id: router.query.id as string },
  });

  const { setProject, projectName, tabs, reset } = useProjectStore();

  const [deleteProject] = useDeleteProjectMutation();

  if (loading) return <Spinner />;

  if (!data && !loading) return <h1>Somthing went wrong</h1>;

  useEffect(() => {
    const unsub = setProject({
      __typename: 'Project',
      _id: data.getProjectById._id,
      projectName: data.getProjectById.projectName,
      projectDescription: data.getProjectById.projectDescription,
      tabs: data.getProjectById.tabs,
    });
    return () => {
      unsub;
    };
  }, []);

  const handleDeleteProject = async () => {
    const id = data.getProjectById._id;
    await deleteProject({ variables: { id } });
    reset();
    router.push('/dashboard');
  };

  return (
    <div>
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 w-4/6 m-auto">
        <header className="flex">
          <h1 className="text-4xl font-bold uppercase flex-1">{projectName}</h1>

          <div>
            <button className="py-2 px-4 border-black border-1 bg-green-600 rounded mx-2 text-white">
              Add Card
            </button>
            <button
              onClick={handleDeleteProject}
              className="py-2 px-4 border-black border-1 bg-red-600 rounded mx-2 text-white"
            >
              Delete
            </button>
            <button className="py-2 px-4 border-black border-1 bg-blue-600 rounded mx-2 text-white">
              Edit
            </button>
          </div>
        </header>

        <hr />

        <section className="flex">
          {tabs.map((p) => (
            <div key={p._id}>
              <h1>{p.tabName}</h1>
              <div>
                {p.cards.map((c) => {
                  <div key={c.cardId}>
                    <p>{c.cardBody}</p>
                  </div>;
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Project);
