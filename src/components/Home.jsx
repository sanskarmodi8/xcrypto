import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import btcSrc from '../assets/btc.png';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box mt={["-5", "0"]} bgColor={'gray.900'} w={'full'} h={'100vh'}>
      <motion.div
        style={{
          height: '80vh',
        }}
        animate={{
          translateY: '20px',
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Image
          className="img"
          w={'full'}
          h={'full'}
          objectFit={'contain'}
          src={btcSrc}
          filter={'grayscale(1)'}
        />
      </motion.div>

      <Text
        fontSize={'6xl'}
        textAlign={'center'}
        fontWeight={'thin'}
        color={'whiteAlpha.700'}
        mt={['-120','-20']}
      >
        XCrypto
      </Text>
    </Box>
  );
};

export default Home;
