import React from 'react';
import {
  Button,
  Form,
  Input,
  Typography,
  Flex,
} from 'antd';

const { Title } = Typography

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const ContactForm = (props) => {
  const [form] = Form.useForm();
  
  //this validates that the name only includes letters and spaces
  const validateName = (_, value) => {
    const validated = /^[a-z][a-z\s]*$/i.test(value)
    if (validated) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please only use letters and spaces'));
  };

  const handleOnSave = async (data) => {
    const newContact = {
      'name': data.name,
      'email': data.email,
      'address': {
        street: data.street,
        city: data.city,
        zip: data.zip
      } || undefined,
    }
    form.resetFields();

    try {
      const fetchResponse = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
        mode: 'cors',
      });
      const data = await fetchResponse.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  return (
    <Flex gap='small' justify='center'>
      <Form
        {...formItemLayout}
        form={form}
        name='contact'
        onFinish={() => {
          const formFields = form.getFieldsValue();
          handleOnSave(formFields);
          props.setNewContact(formFields);
        }
        }
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Title level={2}>Add a new contact</Title>
        <Form.Item
          name='name'
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please include a name',
              whitespace: true,
            },
            {
              type: 'string',
              message: 'Please input a valid name',
            },
            {
              validator: validateName,
            }
          ]}
        >
          <Input 
          />
        </Form.Item>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'Please input a valid email',
              required: true
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='address'
          label='Address'
        >
          <Form.Item
            name='street'
          >
            <Input placeholder='street number & name' />
          </Form.Item>
          <Form.Item
            name='city'
          >
            <Input placeholder='city' />
          </Form.Item>
          <Form.Item
            name='state'
          >
            <Input placeholder='state' />
          </Form.Item>
          <Form.Item
            name='zip'
            rules={[
              {
                message: 'Please input a valid zip',
                len: 5
              },
            ]}
          >
            <Input
              placeholder='zip'
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' onSubmit={handleOnSave}>
            Save contact
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
