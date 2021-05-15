import { FC, useState } from 'react';
import Link from 'next/link';
import router from 'next/router';
import useForm from '../hooks/useForm';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/queries/login';
import { useStateValue } from '../data/StateContext';

const Login: FC = () => {
  const [username, handleUsername] = useForm('');
  const [password, handlePassword] = useForm('');
  const [remember, setRemember] = useState(false);
  const [login] = useMutation(LOGIN);
  const [, dispatch] = useStateValue();

  const findKarbanHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      const { errors, data } = await login({
        variables: { username, password },
      });

      if (errors) return; // !FIX: better error handlings

      localStorage.setItem('KARBAN_TOKEN', data.login.token);
      dispatch({
        type: 'SET_USER',
        payload: {
          _id: data.login._id,
          email: data.login.email,
          token: data.login.token,
          username: data.login.username,
          avatar: data.login.avatar,
        },
      });
      router.push('/dashboard');
    }
  };

  return (
    <section className="container mx-auto lg:px-96 md:px-40 my-16">
      <div>
        <img className="mx-auto h-12 w-auto" src="brand.svg" alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to Your Karban account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={findKarbanHandler}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label className="sr-only">Username</label>
            <input
              value={username}
              onChange={handleUsername}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="sr-only">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              name="remember_me"
              checked={remember}
              onChange={() => setRemember(!remember)}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="/forgot">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Log in!
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
