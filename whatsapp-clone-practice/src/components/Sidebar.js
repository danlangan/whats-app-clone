import React, { useState } from "react";
import { TabContainer, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal } from 'react-bootstrap'
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const conversationsOpen = activeKey === CONTACTS_KEY
    const [modalOpen, setModalOpen] = useState(false)

    function closeModal() {
        setModalOpen(false)
    }

    return(
        <div style={{ width: '250px '}} className='d-flex flex-column'>
            <TabContainer activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <NavItem>
                        <NavLink eventKey={CONVERSATIONS_KEY}>Conversations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink eventKey={CONTACTS_KEY}>Contacts</NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="border-right overflow-auto flex-grow-1">
                    <TabPane onEventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </TabPane>
                    <TabPane onEventKey={CONTACTS_KEY}>
                        <Contacts />
                    </TabPane>
                </TabContent>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button className="rounded-0" onClick={() => setModalOpen(true)}>
                    New {conversationsOpen ? 'Contact' : "Conversation"}
                </Button>
            </TabContainer>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen ?
                <NewContactModal closeModal={closeModal}/> : 
                <NewConversationModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}