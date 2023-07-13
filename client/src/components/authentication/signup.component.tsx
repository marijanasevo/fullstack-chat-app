import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import cloudinary from 'cloudinary';

import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';

const toastOptions: UseToastOptions = {
  title: 'Please select an image',
  status: 'warning',
  duration: 6000,
  isClosable: true,
  position: 'bottom',
};

const API_URL = 'http://localhost:3000';

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [configmPassword, setConfigmPassword] = useState<string>();
  const [image, setImage] = useState<string>();
  const [loadingImage, setLoadingImage] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = async (image: File) => {
    setLoadingImage(true);
    if (image === undefined) {
      toast(toastOptions);

      return;
    }

    if (image.type.includes('image/')) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'fullstack-chat-app');
      data.append('cloud_name', 'dpqrn6zys');

      await fetch('https://api.cloudinary.com/v1_1/dpqrn6zys/image/upload', {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then((data: cloudinary.UploadApiResponse) => {
          console.log(data?.secure_url);
          setImage(data?.secure_url);
          setLoadingImage(false);
        })
        .catch(err => {
          console.log("Couldn't properly load the image");
        })
        .finally(() => setLoadingImage(false));
    } else {
      toast(toastOptions);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !configmPassword) {
      toast({ ...toastOptions, title: 'Please fill all the fields' });
      setLoadingImage(false);
      return;
    }

    if (password !== configmPassword) {
      toast({ ...toastOptions, title: 'Your passwords do not match' });
      setLoadingImage(false);
      return;
    }

    try {
      console.log(image);
      const formData = {
        name,
        email,
        password,
        image,
      };

      const { data } = await axios.post(API_URL + '/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast({
        ...toastOptions,
        title: 'Registration successful',
        status: 'success',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoadingImage(false);
      navigate('/chats');
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.log('Error during user register', error);
      if (axios.isAxiosError(error)) {
        toast({
          ...toastOptions,
          title: 'Uh oh, something went wrong',
          description:
            error.response?.data.message || 'An unknown error occurred',
        });
      }
    }
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
            onChange={e => setConfigmPassword(e.target.value)}
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

      <Button
        isLoading={loadingImage}
        bgColor='#C6F6D5'
        width='100%'
        mt={15}
        onClick={handleSubmit}>
        Sign Up
      </Button>
    </VStack>
  );
};
export default SignUp;
