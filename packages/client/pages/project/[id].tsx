import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from '../../generated/graphql';
import { withApollo } from '../../lib/withApollo';
import { Card } from '../../components/Card';
import CreateCard from '../../components/CreateCard';
import Wrapper from '../../components/Wrapper';
import Link from 'next/link';

const Project = () => {
  const router = useRouter();
  const { data, loading } = useGetProjectByIdQuery({
    variables: { id: router.query.id as string },
  });
  const [deleteProject] = useDeleteProjectMutation();

  if (loading) return <Spinner />;
  if (!data && !loading) return <h1>Somthing went wrong</h1>;

  const handleDeleteProject = async () => {
    const id = data.getProjectById._id;
    await deleteProject({
      variables: { id },
      update: (cache) => {
        cache.evict({ id: 'Project:' + id });
      },
    });
    router.push('/dashboard');
  };

  return (
    <Wrapper>
      <div className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4 w-4/6 m-auto">
        <header className="flex">
          <h1 className="text-4xl font-bold uppercase flex-1">
            {data.getProjectById.projectName || ''}
          </h1>

          <div>
            <button
              onClick={handleDeleteProject}
              className="py-2 px-4 border border-red-600 border-dashed rounded mx-2 text-white"
            >
              <img src="/trash.svg" alt="" className="text-white h-6" />
            </button>
            <Link href={`/project/edit/${data.getProjectById._id}`}>
              <button className="py-2 px-4 border border-blue-600 border-dashed rounded mx-2 text-white">
                <img src="/edit.svg" alt="" className="text-white h-6" />
              </button>
            </Link>
          </div>
        </header>

        <hr />

        <section className="grid grid-cols-4">
          {data.getProjectById.cards.map((c) =>
            !c ? null : (
              <Card projectId={data.getProjectById._id} card={c} key={c._id} />
            )
          )}
          <CreateCard projectId={data.getProjectById._id} />
        </section>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Project);
