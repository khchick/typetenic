const express = require('express');

class ChatRouter {
    constructor(chatService) {
        this.chatService = chatService;
    }

    router() {
        let router = express.Router();

        router.get('/conversation/', (req, res) => {
            this.chatService.listConversation(req.user.id)
                .then(conversations => res.json(conversations))
                .catch(err => res.status(500).json(err));
        })

        router.get('/conversation/:targetID', (req, res) => {
            this.chatService.getConversationID(req.user.id, req.params.targetID)
                .then(id => res.json(id))
                .catch(err => res.status(500).json(err));
        })

        router.post('/conversation/:targetID', (req, res) => {
            this.chatService.beginConversation(req.user.id, req.params.targetID)
                .then(conversationID => res.json(conversationID))
                .catch(err => res.status(500).json(err));
        })

        router.delete('/conversation/exit/:targetID', (req, res) => {
            this.chatService.exitConversation(req.user.id, req.params.targetID)
                .then(() => this.chatService.listConversation(req.user.id))
                .then(conversations => res.json(conversations))
                .catch(err => res.status(500).json(err));
        })

        router.get('/messages/:conversationID', (req, res) => {
            this.chatService.listMessages(req.params.conversationID)
                .then(messages => {res.json(messages)})
                .catch(err => res.status(500).json(err));
        })

        router.post('/messages/:conversationID/:targetID', (req, res) => {
            this.chatService.createMessage(req.user.id, req.params.targetID, req.params.conversationID, req.body.content)
                .then(() => this.chatService.listMessages(req.params.conversationID))
                .then(messages => res.json(messages))
                .catch(err => res.status(500).json(err));
        })

        router.get('/messages/:conversationID/:targetID', (req, res) => {
            this.chatService.getIncomingMessage(req.params.conversationID, req.params.targetID)
                .then(message => {res.json(message)})
                .catch(err => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = ChatRouter;



