import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Image,
  Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Layout = (props) => {

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <Box justifySelf='flex-end'>
                        { props.guest !== true ? (
                            <a href={process.env.REACT_APP_WHMCS_URL + process.env.REACT_APP_PREFIX_ADMIN + "/supporttickets.php"} target="_blank" rel="noopener noreferrer">
                                WHMCS Ticket
                            </a>
                        ) : (
                            <Link to="/">
                                Home
                            </Link>
                        )}
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Box>
                    <VStack spacing={8}>
                        { props.guest !== true && 
                            <Link to="/">
                                <Image
                                    borderRadius='full'
                                    boxSize='150px'
                                    src='favicon2.png'
                                    alt='ticket'
                                />
                            </Link>
                        }
                        { props.guest !== true && 
                            <Link to="/">
                                <Text>Aksimaya Ticket Notification</Text>
                            </Link>
                        }
                        {props.children}
                    </VStack>
                </Grid>
            </Box>
        </ChakraProvider>
    );   
}

export default Layout;
