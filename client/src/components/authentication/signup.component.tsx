import { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [configmPassword, setConfigmPassword] = useState<string>();
  const [image, setImage] = useState();

  const postDetails = (image: File) => {
    console.log(image);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <VStack spacing={4}>
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          onChange={e => setName(e.target.value)}
          bgColor={'#f0f0f0'}
        />
      </FormControl>

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

      <FormControl id='password' isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Confirm Password'
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

      <FormControl id='image'>
        <FormLabel>Upoad your profile image</FormLabel>
        <Input
          type='file'
          accept='image/*'
          p='10px 0 0 0'
          border={0}
          onChange={e => {
            const image = e.target.files?.[0];
            if (image) {
              postDetails(image);
            }
          }}
        />
      </FormControl>

      <Button bgColor='#C6F6D5' width='100%' mt={15} onClick={handleSubmit}>
        Sign Up
      </Button>
    </VStack>
  );
};
export default SignUp;
