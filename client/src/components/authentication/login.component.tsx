import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';

function Login() {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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

      <Button bgColor='#C6F6D5' width='100%' mt={15} onClick={handleSubmit}>
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
