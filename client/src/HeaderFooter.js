import React from 'react';
import { Typography, Layout, Image } from 'antd';
import { headerStyle, footerStyle } from './style.js'
import handPhone from './assets/handPhone.png'

const { Header, Footer } = Layout;
const { Title, Text } = Typography;

export const ContactHeader = () => {
  return (
    <Header style={headerStyle}>
      <Image src={handPhone} width={75} />
      <Typography style={{ display: 'inline-block'}}>
        <Title>
          Fave humans!
        </Title>
      </Typography>
    </Header>
  );
}

export const ContactFooter = () => {
  return (
    <Footer style={footerStyle}>
      <Image src={handPhone} width={75} />
      <Text>Made by Allison Jacobs for Alpine IQ & Dispense</Text>
    </Footer>
  );
}
