import { FC } from 'react';
import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  id: string;
  name: string;
  description: string;
}

const ProjectCard: FC<Props> = ({ description, id, name }) => {
  return (
    <Link href={`/project/${id}`}>
      <Box
        _hover={{
          borderColor: 'transparent',
          background: 'gray.900',
          shadow: 'xl',
        }}
        cursor="pointer"
        rounded="lg"
        p="4"
        borderWidth="medium"
        borderColor="gray.200"
        borderStyle="dashed"
      >
        <Text fontWeight="bold">{name}</Text>
        <Text fontWeight="light" color="gray.500">
          {description}
        </Text>
      </Box>
    </Link>
  );
};

export default ProjectCard;
