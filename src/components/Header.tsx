import React from 'react';
import {Center, Heading} from 'native-base';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <Center>
      <Heading color="trueGray.300" fontWeight="light" letterSpacing={1}>
        {title.toUpperCase()}
      </Heading>
    </Center>
  );
};

export default Header;
