import { useState } from 'react';
import { withApollo } from '../lib/withApollo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../generated/graphql';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  useBreakpointValue,
  IconProps,
  Icon,
  Link,
  useToast,
} from '@chakra-ui/react';
import useForm from '../hooks/useForm';

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

const Register = () => {
  const [username, handleUsername, resetUsername] = useForm('');
  const [password, handlePassword, resetPassword] = useForm('');
  const [avatar, handleAvatar, resetAvatar] = useForm('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [register] = useRegisterMutation();
  const r = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { errors } = await register({
        variables: {
          username,
          password,
          avatar,
        },
      });
      if (errors) {
        return;
      }
      resetUsername();
      resetPassword();
      resetAvatar();
      toast({
        title: 'Successfully registered an account!',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
        status: 'success',
      });
      r.push('/dashboard');
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
    <Box position={'relative'}>
      <Container maxW={'7xl'} py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          margin="auto"
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Register a new account
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                placeholder="Username"
                value={username}
                onChange={handleUsername}
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                type="password"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                value={avatar}
                onChange={handleAvatar}
                placeholder="Avatar URL"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              type="submit"
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              isLoading={loading}
            >
              Submit
            </Button>
            <NextLink href="/login">
              <Link color="blue.800" textAlign="center" mt="5">
                Already have an Account!
              </Link>
            </NextLink>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
};

export default withApollo({ ssr: false })(Register);
