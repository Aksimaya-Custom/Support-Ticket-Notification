import { React, useEffect, useState, useRef } from 'react'
import {
    SimpleGrid,
    Text,
    Box,
} from '@chakra-ui/react'
import Layout from '../components/Layout'
import axios from 'axios';
import _ from 'lodash';
import NotificationSound from '../alert.mp3'

const Homepage = () => {
    const [ isDataSame, setIsDataSame ] = useState(true)
    const audioPlayer = useRef(null);
    const [ data, setData ] = useState([
        {
            "id": 1,
            "ticketid": 1,
            "tid": "CFB-250177",
            "c": "PYaMtUqV",
            "deptid": 2,
            "deptname": "Support",
            "userid": 1,
            "contactid": 0,
            "name": "Loading",
            "owner_name": "Loading",
            "email": "gener4@kuronekosan.web.id",
            "requestor_name": "Loading",
            "requestor_email": "gener4@kuronekosan.web.id",
            "requestor_type": "Owner",
            "cc": "",
            "date": "2023-05-16 17:32:59",
            "subject": "Loading",
            "status": "Loading",
            "priority": "High",
            "lastreply": "2023-05-16 17:48:32",
        }
    ])
    
    const auth = {
        identifier: process.env.REACT_APP_IDENTIFIER,
        secret: process.env.REACT_APP_SECRET,
        action: "GetTickets",
        responsetype: "json",
        status: "Awaiting Reply",
        deptid: 2
    }

    useEffect(() => {
        const interval = setInterval(() => {
          axios.post(process.env.REACT_APP_WHMCS_URL + "/includes/api.php", null, {
            method: 'POST',
            
            params : auth
          })
            .then(res => {
                const dataNew = res.data.tickets === undefined ? data : res.data.tickets.ticket

                if (dataNew.length > data.length) {
                    setIsDataSame(false)
                    setData(dataNew)
                } else if (dataNew.length === data.length) {
                    const check = _.isEqual(data, dataNew)
                    if (check) {
                        setIsDataSame(true)
                        setData(dataNew)
                    } else {
                        setIsDataSame(false)
                        setData(dataNew)
                    }
                } else {
                    setIsDataSame(true)
                    setData(dataNew)
                }
            })
            .catch(err => console.error(err));
        }, 5000); //set your time here. repeat every 5 seconds
      
        return () => clearInterval(interval);
    }, [data]);

    if (!isDataSame) {
        audioPlayer.current.play();
    }

    return (
        <Layout>
            <audio ref={audioPlayer} src={NotificationSound} />
            <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                {data.map((x, index) => (
                    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={index}>
                        <a href={x.status === 'Loading' ? "#" : process.env.REACT_APP_WHMCS_URL + process.env.REACT_APP_PREFIX_ADMIN + '/supporttickets.php?action=view&id=' + x.id} target="_blank" rel="noopener noreferrer">
                            <Box p='6'>
                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={2}
                                >
                                    <Text>
                                        {x.name}
                                    </Text>
                                    <Text color={ x.priority === 'High' ? 'tomato' : x.priority === 'Medium' ? 'yellow.400' : 'green.400'} fontSize='sm'>
                                        {x.priority}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text>
                                        {x.subject.length > 24 ? x.subject.slice(0, 24) : x.subject}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color={ x.status === 'Customer-Reply' ? 'tomato' : x.status === 'Open' ? 'green.400' : x.status === 'Answered' ? 'gray.400' : x.status === 'On Hold' ? 'cyan' : x.status === 'In Progress' ? 'violet' : 'grey.400'} fontSize='sm'>
                                        {x.status}
                                    </Text>
                                </Box>
                            </Box>
                        </a>
                    </Box>
                ))}
            </SimpleGrid>
        </Layout>
    )

}


export default Homepage