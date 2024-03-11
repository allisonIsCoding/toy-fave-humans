import React, { useState, useEffect } from 'react';
import { Flex, Divider, Space } from 'antd';
import { ContactHeader, ContactFooter } from './HeaderFooter.js';
import { ContactForm } from './Form.js'
import { container } from './style.js'
import { RenderContacts } from './ContactCard.js';

export const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState(null)


  const fetchContacts = async () => {
    const response = await fetch('/list');
    console.log({ response })
    try {
      const data = await response.json();
      return data.contacts
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    fetchContacts().then((data) => {
      setContacts(data);
    });
  }, [newContact]);



  return (
    <Flex gap='small' wrap='wrap' justify='flex-start' >
      <ContactHeader />
      <Flex gap='small' wrap='wrap' justify='flex-start' style={container} >
        <RenderContacts contacts={contacts} />
        <Divider />
        <Space>
          <ContactForm setNewContact={setNewContact} />
        </Space>
      </Flex>
      <ContactFooter />
    </Flex>
  );
}
