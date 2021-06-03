import { FC, useState } from 'react';
import Link from 'next/link';
import { useAuthenticatedUserQuery } from '../generated/graphql';
import HamburgerMenu from './HamburgerMenu';
import Spinner from './Spinner';

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useAuthenticatedUserQuery({
    skip: typeof window === 'undefined',
  });

  const defaultAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  const handleToggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  if (!data) {
    return <h1>Hold up</h1>;
  }
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <HamburgerMenu />
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
                <p className="text-gray-300 px-3 py-2 rounded-md text-2xl font-medium hover:underline">
                  Karban Board
                </p>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loading ? (
              <Spinner />
            ) : (
              <div className="ml-3 relative flex justify-between">
                <p className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium mr-3">
                  @{data.authenticatedUser.username}
                </p>
                <button
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={handleToggleOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={data.authenticatedUser.avatar || defaultAvatar}
                    alt=""
                  />
                </button>

                {open && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link href="/profile">
                      <span
                        className={
                          'bg-gray-100 block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                        }
                      >
                        Profile
                      </span>
                    </Link>
                    <Link href="/setting">
                      <span
                        className={
                          'bg-gray-100 block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                        }
                      >
                        Settings
                      </span>
                    </Link>
                    <div
                      className={
                        'bg-gray-100 block px-4 py-2 text-sm hover:bg-gray-700 hover:text-white'
                      }
                    >
                      Sign out
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
