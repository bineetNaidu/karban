import { useState } from 'react';
import { withApollo } from '../lib/withApollo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import useForm from '../hooks/useForm';

const Login = () => {
  const [username, handleUsername, resetUsername] = useForm('');
  const [password, handlePassword, resetPassword] = useForm('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [login] = useLoginMutation();
  const r = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { errors } = await login({
        variables: {
          username,
          password,
        },
      });
      if (errors) {
        throw errors;
      }
      resetUsername();
      resetPassword();
      toast({
        title: 'Successfully Logged you in',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
        status: 'success',
      });
      r.push((r.query.redirectUrl as string) || '/dashboard');
    } catch (err) {
      toast({
        title: 'Error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
        status: 'error',
        description: err.message,
      });
    }
    setLoading(false);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          as="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={handleUsername}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <NextLink href="/register">
                  <Link color={'blue.400'}>Need a account?</Link>
                </NextLink>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default withApollo({ ssr: false })(Login);
