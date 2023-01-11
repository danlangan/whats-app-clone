import React from "react";
import { ListGroupItem, ListGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

export default function Conversations() {

    const { conversations, selectConversationIndex } = useConversations()
    return (
        <ListGroup variant="flush">
        {conversations.map((conversation, index) => (
            <ListGroupItem 
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            >
                {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroupItem>
        ))}
      </ListGroup>
    )
};