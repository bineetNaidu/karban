import React from 'react';
import router from 'next/router';
import useForm from '../hooks/useForm';
import { useCreateProjectMutation } from '../generated/graphql';
import { withApollo } from '../lib/withApollo';
import Wrapper from '../components/Wrapper';
import {
  Heading,
  Input,
  Textarea,
  Button,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';

const NewProjectPage = () => {
  const toast = useToast();
  const [projectName, handleProjectname] = useForm('');
  const [projectDescription, handleProjectDesc] = useForm('');
  const [createProject] = useCreateProjectMutation();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (projectDescription && projectName) {
      const { data, errors } = await createProject({
        variables: { projectName, projectDescription },
        update: (cache) => {
          cache.evict({ fieldName: 'authenticatedUser' });
        },
      });

      if (errors) {
        toast({
          title: 'Error!',
          description: 'There was an error creating your project.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }

      if (data.createProject) {
        toast({
          title: 'Project created!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/dashboard');
      }
    }
  };

  return (
    <Wrapper>
      <Box
        w="96"
        bgColor="gray.700"
        m="auto"
        mt="10"
        py="16"
        px="8"
        rounded="lg"
      >
        <form onSubmit={handleCreate}>
          <Heading mb="2">New Project</Heading>
          <Divider mb="10" />
          <FormControl my="4">
            <FormLabel>Project Name</FormLabel>
            <Input
              type="text"
              value={projectName}
              onChange={handleProjectname}
            />
          </FormControl>
          <FormControl my="4">
            <FormLabel>Project Description</FormLabel>
            <Textarea
              name="projectDescription"
              value={projectDescription}
              onChange={handleProjectDesc}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="green"
            loading={false}
            disabled={!projectName || !projectDescription}
          >
            Create Project
          </Button>
        </form>
      </Box>
    </Wrapper>
  );
};

export default withApollo()(NewProjectPage);
