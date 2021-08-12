import { FC } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import { withApollo } from '../lib/withApollo';
import { useAuthenticatedUserQuery } from '../generated/graphql';
import {
  Spinner,
  Heading,
  SimpleGrid,
  Divider,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const dashboard: FC = () => {
  const { data, loading } = useAuthenticatedUserQuery();

  if (!loading && !data) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <Wrapper>
      <Box py="8" px="32">
        <Heading>Your Projects</Heading>
        <Divider my="8" />
        <Input />

        <SimpleGrid py="8" px="32" columns={3} spacing={10}>
          {data?.authenticatedUser ? (
            data.authenticatedUser.projects.map((project) =>
              !project ? null : (
                <ProjectCard
                  description={project.projectDescription}
                  id={project._id}
                  name={project.projectName}
                />
              )
            )
          ) : (
            <Spinner />
          )}
          <Link href="/new">
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
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold">New Project</Text>
            </Box>
          </Link>
        </SimpleGrid>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(dashboard);
