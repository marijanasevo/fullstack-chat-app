import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { toastOptions } from '../../utils/toast-options';

const API_URL = 'http://localhost:3000';

type UserData = {
  name: string;
  email: string;
  password: string;
  id: string;
  token: string;
  image: string;
};

interface LoginErrorResponse {
  error: string;
}

type UserResponseType = UserData | LoginErrorResponse;

function Login() {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (): Promise<void> => {
    if (!email || !password) {
      toast({ ...toastOptions, title: 'Please fill in all the fields' });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post<UserResponseType>(
        API_URL + '/api/users/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast({ ...toastOptions, title: 'Login successful', status: 'success' });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/chats');
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.log('Error during authentication', error);
      if (axios.isAxiosError(error)) {
        toast({
          ...toastOptions,
          title: 'Uh oh, something went wrong',
          description:
            error.response?.data.message || 'An unknown error occurred',
        });
      }
    } finally {
      setLoading(false);
    }

    return;
  };

  return (
    <VStack spacing={5}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={e => setEmail(e.target.value)}
          bgColor={'#f0f0f0'}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            onChange={e => setPassword(e.target.value)}
            bgColor={'#f0f0f0'}
          />
          <InputRightElement w='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={loading}
        bgColor='#C6F6D5'
        width='100%'
        mt={15}
        onClick={handleSubmit}>
        Sign Up
      </Button>

      <Button
        bgColor='#eff6c6'
        width='100%'
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
