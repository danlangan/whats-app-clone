import React, { useState } from "react";
import { ModalHeader, ModalBody, Form, FormGroup, FormCheck, Button } from "react-bootstrap";
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'

export default function NewConversationModal( { closeModal }) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    };


    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

    return (
        <>
        <ModalHeader closeButton>Create Contact</ModalHeader>
        <ModalBody>
            <Form onSubmit={handleSubmit}>
                {contacts.map(contact => (
                    <FormGroup controlId={contact.id} key={contact.id}>
                        <FormCheck 
                            type='checkbox'
                            value={selectedContactIds.includes(contact.id)}
                            label={contact.name}
                            onChange={() => handleCheckboxChange(contact.id)}
                        />
                    </FormGroup>
                ))}
                <Button type='submit'>Create</Button>
            </Form>
        </ModalBody>
        </>
    )
};