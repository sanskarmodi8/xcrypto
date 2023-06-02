import {
  Container,
  HStack,
  Heading,
  VStack,
  Image,
  Text,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);

  const changePage = i => {
    if (i !== page) {
      setPage(i);
      setLoading(true);
    }
  };
  function setBgColorPgBtn(index) {
    if (page === index + 1) {
      return 'gray.800';
    } else {
      return 'gray.900';
    }
  }

  const btns = new Array(7).fill(1);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [page]);
  return (
    <Container pt={'50'} maxW={'container.xl'} pb={'8'}>
      {err ? (
        <Alert
          status="error"
          position={'fixed'}
          bottom={'5%'}
          left={'50%'}
          transform={'translateX(-50%)'}
          w={'container.lg'}
        >
          <AlertIcon />
          Error while fetching data! Please try again later...
        </Alert>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {exchanges.map(i => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
          <HStack
            w={'full'}
            overflowX={'auto'}
            py={'16'}
            justifyContent={'center'}
          >
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={setBgColorPgBtn(index)}
                color={'white'}
                onClick={() => changePage(index + 1)}
                opacity={index + 1 === page ? '0.3' : '1'}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="blank">
    <VStack
      w={'52'}
      shadow={'lg'}
      p={'8'}
      borderRadius={'lg'}
      transition={'all 0.3s'}
      m={'4'}
      css={{
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt="exchange" />
      <Heading size={'md'} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
