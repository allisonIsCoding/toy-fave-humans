import React from 'react'
import { Card, Col, Row, Typography, Flex, Space } from 'antd';

const { Title, Text, Paragraph } = Typography

export const RenderContacts = (props) => {
    return (
        <Flex gap='small' justify='flex-start' vertical style={{ width: '100%'}}>
            <Title level={2}>My friends</Title>
            <Flex gap='small' wrap='wrap'>
                {props.contacts && props.contacts.length === 0? <Text>Add some contacts using the below form to get started!</Text> :
                props.contacts.map(contact => {
                    return (
                        <Row style={{ marginRight: '2%' }}>
                            <Col>
                                <Card title={`${contact.name} \u2665`} >
                                    <Paragraph>Name: {contact.name}</Paragraph>
                                    <Paragraph>Email: {contact.email}</Paragraph>
                                    {contact.address.street && (
                                        <Paragraph>Address: {contact.address.street}, {contact.address.city} {contact.address.zip}</Paragraph>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    )
                })}
            </Flex>
        </Flex>
    )
}