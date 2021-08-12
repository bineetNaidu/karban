import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '../generated/graphql';
import useForm from '../hooks/useForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const EditDrawer: FC<Props> = ({ isOpen, onClose, projectId }) => {
  const toast = useToast();
  const [projectName, handleProjectname, resetName, setName] = useForm('');
  const [projectDescription, handleProjectDesc, resetDesc, setDesc] =
    useForm('');

  const [updateProject] = useUpdateProjectMutation();
  const { data, loading } = useGetProjectByIdQuery({
    variables: {
      id: projectId,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await updateProject({
      variables: {
        id: projectId,
        projectDescription,
        projectName,
      },
      update: (cache) => {
        cache.evict({
          id: 'Project:' + projectId,
        });
      },
    });

    toast({
      title: `${data.updateProject.projectName} updated!`,
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top-right',
    });

    resetName();
    resetDesc();
    onClose();
  };

  useEffect(() => {
    if (data) {
      setName(data.getProjectById.projectName);
      setDesc(data.getProjectById.projectDescription);
    }
  }, [loading]);

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerCloseButton />
          <DrawerHeader>Edit Project</DrawerHeader>
          <DrawerBody>
            <Text mt="2" mb="1">
              Project Name
            </Text>
            <Input
              disabled={loading}
              value={projectName}
              onChange={handleProjectname}
              placeholder="Project Name"
            />
            <Text mt="2" mb="1">
              Project Description
            </Text>
            <Input
              disabled={loading}
              value={projectDescription}
              onChange={handleProjectDesc}
              placeholder="Project Description"
            />
          </DrawerBody>
          <DrawerFooter>
            <Button type="submit">Save</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDrawer;
