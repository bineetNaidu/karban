import { FC } from 'react';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  description: string;
}

const ProjectCard: FC<Props> = ({ description, id, name }) => {
  return (
    <Link href={`/project/${id}`}>
      <div className="hover:bg-blue-400 cursor-pointer hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
        <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="group-hover:text-white leading-6 font-medium text-black">
              {name}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Description</dt>
            <dd className="group-hover:text-white text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
              {description}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
};

export default ProjectCard;
