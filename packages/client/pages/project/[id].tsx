import { useRouter } from 'next/router';
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from '../../generated/graphql';
import { withApollo } from '../../lib/withApollo';
import { Card } from '../../components/Card';
import CreateCard from '../../components/CreateCard';
import Wrapper from '../../components/Wrapper';
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Divider,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import LoadingOverlay from '../../components/LoadingOverlay';
import EditDrawer from '../../components/EditDrawer';

const Project = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, loading } = useGetProjectByIdQuery({
    variables: { id: router.query.id as string },
  });
  const [deleteProject] = useDeleteProjectMutation();

  if (loading) return <LoadingOverlay />;
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
      <EditDrawer
        isOpen={isOpen}
        onClose={onClose}
        projectId={data.getProjectById._id}
      />
      <Box px={['6', '12', '20', '28']} py="6" m="auto">
        <Flex alignItems="center">
          <Heading fontWeight="bold" textTransform="uppercase" flex="1" py="5">
            {data.getProjectById.projectName || ''}
          </Heading>

          <Box>
            <IconButton
              aria-label="delete button"
              onClick={handleDeleteProject}
              py="2"
              px="4"
              colorScheme="red"
              borderRadius="md"
              mx="2"
              variant="outline"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit button"
              py="2"
              px="4"
              colorScheme="green"
              borderRadius="md"
              mx="2"
              variant="outline"
              onClick={onOpen}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Flex>

        <Divider mb="6" />

        <SimpleGrid columns={4} spacing={10}>
          {data.getProjectById.cards.map((c) =>
            !c ? null : (
              <Card projectId={data.getProjectById._id} card={c} key={c._id} />
            )
          )}
          <CreateCard projectId={data.getProjectById._id} />
        </SimpleGrid>
      </Box>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Project);
