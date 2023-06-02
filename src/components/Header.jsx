import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import ColorModeSwitcher from '../ColorModeSwitcher';

const Header = () => {
  return (
    <Flex
      id="nav"
      minWidth="max-content"
      alignItems="center"
      w={'full'}
      p={'4'}
      bgColor={'gray.900'}
      pos={'sticky'}
      top={"0"}
      zIndex={"10"}
    >
      <Box>
        <Heading
          color={'whiteAlpha.800'}
          size="md"
          display={['none', 'initial']}
        >
          XCrypto
        </Heading>
      </Box>
      <Spacer display={['none', 'initial']} />
      <ButtonGroup gap="2" m={['auto', '0']}>
        <Button
          variant={'unstyled'}
          px={['2', '2', '4']}
          _hover={{ color: 'whiteAlpha.600' }}
          color={'whiteAlpha.800'}
        >
          <Link to={'/xcrypto/'}>Home</Link>
        </Button>
        <Button
          variant={'unstyled'}
          px={['2', '2', '4']}
          _hover={{ color: 'whiteAlpha.600' }}
          color={'whiteAlpha.800'}
        >
          <Link to={'/xcrypto/coins/'}>Coins</Link>
        </Button>
        <Button
          variant={'unstyled'}
          px={['2', '2', '4']}
          _hover={{ color: 'whiteAlpha.600' }}
          color={'whiteAlpha.800'}
        >
          <Link to={'/xcrypto/exchanges/'}>Exchanges</Link>
        </Button>
        <Button variant={'unstyled'} px={['2', '2', '4']}>
          <ColorModeSwitcher />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
