import { useQuery } from '@apollo/client';
import Navbar from '../components/Navbar';
import { useStateValue } from '../data/StateContext';
import { GET_PROJECTS } from '../utils/queries/getProjects';

const dashboard = () => {
  const [{ user }] = useStateValue();
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { token: user.token },
  });

  loading && <h1>Loading...</h1>;

  return (
    <div>
      <Navbar username={user.username} avatar={user.avatar} />
      <h1>Dashboard</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default dashboard;
