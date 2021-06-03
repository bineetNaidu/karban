import { FC } from 'react';
import Navbar from './Navbar';

const Wrapper: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <section>{children}</section>
    </div>
  );
};

export default Wrapper;
