import {
  Button,
  Container,
  HStack,
  Heading,
  VStack,
  Image,
  Text,
  RadioGroup,
  Radio,
  AlertIcon,
  Alert,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Coins = () => {
  const dispatch = useDispatch();
  const { currencySet } = useSelector(state => state.first);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState(currencySet);

  let rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let euro = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  let currencyFormatter =
    currency === 'inr' ? rupee : currency === 'eur' ? euro : USDollar;

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

  const btns = new Array(103).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        dispatch({ type: 'firstcase', payload: [`${currency}`] });
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page, dispatch]);
  return (
    <Container pt={'50'} maxW={'container.xl'} pb={'8'}>
      {err ? (
        <Alert
          status="error"
          position={'fixed'}
          bottom={'4'}
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
          <RadioGroup value={currency} onChange={setCurrency} padding={'4'}>
            <HStack spacing={'4'} justifyContent={'center'}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(i => (
              <CoinCard
                currencyFormatter={currencyFormatter}
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
              />
            ))}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} py={'16'}>
            {btns.map((item, index) => (
              <Button
                justifyContent={'center'}
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

const CoinCard = ({ currencyFormatter, id, name, img, symbol, price }) => (
  <Link to={`/xcrypto/coin-details/${id}/`}>
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
      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt="coin" />
      <Heading size={'md'} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>
        {price ? `${currencyFormatter.format(price)}` : 'NA'}
      </Text>
    </VStack>
  </Link>
);

export default Coins;
