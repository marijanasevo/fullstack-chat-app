import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Login from '../components/authentication/login.component';
import SignUp from '../components/authentication/signup.component';
// import SignUp from '../components/authentication/signup.component';

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box mt='40px'>
        <Text fontSize='2xl' fontFamily='Poppins' textAlign='center'>
          Dare to Explore <br />
          Conversational Depths
        </Text>
      </Box>

      <Box
        display='flex'
        p='3'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
        borderColor='white'
        bgColor='rgba(255, 255, 255, .3)'
        w='100%'>
        <Tabs w={'100%'} variant='soft-rounded' colorScheme='green'>
          <TabList mb='20px'>
            <Tab w={'50%'}>Login</Tab>
            <Tab w={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
