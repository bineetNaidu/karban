import { FC } from 'react';
import {
  Card as ICard,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '../generated/graphql';
import useForm from '../hooks/useForm';
import useToggle from '../hooks/useToggle';
import { Box, Text, Button, IconButton, Textarea } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface Props {
  card: ICard;
  projectId: string;
}

export const Card: FC<Props> = ({ card, projectId }) => {
  const [updateMode, toggleUpdateMode] = useToggle(false);
  const [deleteCard] = useDeleteCardMutation();
  const [body, handleBody, resetBody] = useForm(card.body);
  const [updateCard] = useUpdateCardMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCard({
      variables: {
        input: { body },
        projectId,
        cardId: card._id,
      },
      update: (cache) => {
        cache.evict({ fieldName: 'Card' });
      },
    });
    resetBody();
    toggleUpdateMode();
  };

  return (
    <Box
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
      role="group"
    >
      {updateMode ? (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Text mb="2" fontSize="md">
            Edit Card Body
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
            Update!
          </Button>
          <Button
            type="reset"
            onClick={toggleUpdateMode}
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
        <>
          <Text>{card.body}</Text>

          <Box
            position="absolute"
            top="2"
            right="0"
            opacity="0"
            display="none"
            _groupHover={{
              opacity: '1',
              display: 'block',
            }}
          >
            <IconButton
              aria-label="edit button"
              px="2"
              size="sm"
              mr="1"
              onClick={toggleUpdateMode}
              right="0"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete button"
              px="2"
              size="sm"
              mr="1"
              right="0"
              onClick={async () => {
                await deleteCard({
                  variables: {
                    cardId: card._id,
                    projectId,
                  },
                  update: (cache) => {
                    cache.evict({ id: 'Card:' + card._id });
                  },
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};
