import { FC } from 'react';
import { useCreateCardMutation } from '../generated/graphql';
import useForm from '../hooks/useForm';
import useToggle from '../hooks/useToggle';
import { Flex, Text, Button, Textarea } from '@chakra-ui/react';

interface Props {
  projectId: string;
}

const CreateCard: FC<Props> = ({ projectId }) => {
  const [showInput, toggleView] = useToggle(false);
  const [body, handleBody, resetBody] = useForm('');
  const [createCard] = useCreateCardMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCard({
      variables: {
        input: { body },
        projectId,
      },
      update: (cache) => {
        cache.evict({ fieldName: 'getProjectById' });
      },
    });
    resetBody();
    toggleView();
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      px="4"
      py="2"
      border="2px"
      minH="20"
      m="1"
      borderColor="blue.100"
      borderStyle="dashed"
      position="relative"
      rounded="md"
      shadow="md"
      _hover={{
        borderColor: 'transparent',
        background: 'gray.900',
        shadow: 'xl',
      }}
      cursor="pointer"
    >
      {showInput ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text mb="2" fontSize="md">
            Card Body
          </Text>
          <Textarea value={body} onChange={handleBody}></Textarea>
          <Button
            type="submit"
            colorScheme="green"
            mt="2"
            rounded="md"
            py="1"
            w="full"
          >
            Add
          </Button>
          <Button
            type="reset"
            onClick={toggleView}
            colorScheme="red"
            mt="2"
            rounded="md"
            w="full"
            py="1"
          >
            Cancel
          </Button>
        </form>
      ) : (
        <Text fontWeight="bold" onClick={toggleView}>
          Add Card
        </Text>
      )}
    </Flex>
  );
};

export default CreateCard;
