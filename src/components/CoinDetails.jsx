import {
  Image,
  Text,
  Alert,
  AlertIcon,
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Spacer,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../index';
import Loader from './Loader';
import Chart from './Chart';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const CoinDetails = () => {
  const dispatch = useDispatch();
  const { currencySet } = useSelector(state => state.first);
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [currency, setCurrency] = useState(currencySet);
  const [days, setDays] = useState('24h');
  const [chartArray, setChartAray] = useState([]);
  const params = useParams();
  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

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

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '365d', 'max'];

  function setSelectedBtnColor(index) {
    if (days === index) {
      return 'gray.800';
    } else {
      return 'gray.900';
    }
  }
  const switchChartStats = key => {
    if (days !== key) {
      switch (key) {
        case '24h':
          setDays('24h');
          setLoading(true);
          break;
        case '7d':
          setDays('7d');
          setLoading(true);
          break;
        case '14d':
          setDays('14d');
          setLoading(true);
          break;
        case '30d':
          setDays('30d');
          setLoading(true);
          break;
        case '60d':
          setDays('60d');
          setLoading(true);
          break;
        case '200d':
          setDays('200d');
          setLoading(true);
          break;
        case '365d':
          setDays('365d');
          setLoading(true);
          break;
        case 'max':
          setDays('max');
          setLoading(true);
          break;

        default:
          setDays('24h');
          setLoading(true);
          break;
      }
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(data);
        console.log(chartData);
        dispatch({ type: 'firstcase', payload: [`${currency}`] });
        setCoin(data);
        setChartAray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setErr(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [currency, params.id, days, dispatch]);
  return (
    <Container maxW={'container.xl'} pb={'8'} pt={'50'}>
      {err ? (
        <Alert
          status="error"
          position={'fixed'}
          bottom={'4'}
          left={'50%'}
          transform={'translateX(-50%)'}
          w={['80vw', '50vw']}
        >
          <Spacer />
          <AlertIcon />
          Error while fetching data! Please try again later...
          <Spacer />
        </Alert>
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <Box w={'full'} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack p="4" overflowX={'auto'}>
            {btns.map(i => (
              <Button
                key={i}
                onClick={() => switchChartStats(i)}
                bgColor={setSelectedBtnColor(i)}
                justifyContent={'center'}
                w={'full'}
                my={'8'}
                color={'white'}
                fontSize={'sm'}
                opacity={i === days ? '0.3' : '1'}
              >
                {i === '365d' ? '1y' : i}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} padding={'4'}>
            <HStack spacing={'4'} justifyContent={'center'}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} padding={'16'} alignItems={'center'}>
            <Text fontSize={'small'} opacity={0.7} alignSelf={'center'}>
              Last updated on{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={'16'}
              h={'16'}
              objectFit={'contain'}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencyFormatter.format(
                  coin.market_data.current_price[currency]
                )}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'gray.900'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencyFormatter.format(
                coin.market_data.high_24h[currency]
              )}`}
              low={`${currencyFormatter.format(
                coin.market_data.low_24h[currency]
              )}`}
            />
            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply? coin.market_data.max_supply : "NA"} />
              <Item
                title={'Circulating Supply'}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={'Market Cap'}
                value={`${currencyFormatter.format(
                  coin.market_data.market_cap[currency]
                )}`}
              />
              <Item
                title={'All Time Low'}
                value={`${currencyFormatter.format(
                  coin.market_data.atl[currency]
                )}`}
              />
              <Item
                title={'All Time High'}
                value={`${currencyFormatter.format(
                  coin.market_data.ath[currency]
                )}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <VStack mt={'8'}>
    <HStack justifyContent={'space-between'} alignSelf={"center"} w={['full', '25vw']}>
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  </VStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={'full'} justifyContent={"center"}>
    <Progress my={'8'} value={50} colorScheme="teal" w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
