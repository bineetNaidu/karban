import { FC, Fragment, useEffect } from 'react';
import NextLink from 'next/link';
import {
  useAuthenticatedUserQuery,
  useLogoutMutation,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';

const MenuItemsLists = [
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'Settings',
    path: '/settings',
  },
];

const Navbar: FC = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data, loading } = useAuthenticatedUserQuery();
  const client = useApolloClient();

  const handleLogout = async () => {
    const loggedout = await logout();
    if (loggedout) {
      await client.resetStore();
      router.replace('/');
    } else {
    }
  };

  const defaultAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  useEffect(() => {
    if (!loading && data?.authenticatedUser === null) {
      router.replace(`/login?redirectUrl=${router.asPath}`);
    }
  }, [data, loading, handleLogout]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} as="nav">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
          </HStack>
          <Flex alignItems={'center'}>
            {data?.authenticatedUser ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={data.authenticatedUser.avatar || defaultAvatar}
                  />
                </MenuButton>
                <MenuList>
                  {MenuItemsLists.map(({ label, path }) => (
                    <Fragment key={label}>
                      <NextLink href={path} passHref>
                        <MenuItem>{label}</MenuItem>
                      </NextLink>
                    </Fragment>
                  ))}
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Spinner />
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
