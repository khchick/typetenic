const express = require('express');

class ConnectionRouter {
    constructor(connectionService) {
        this.connectionService = connectionService
    }

    router() {
        let router = express.Router();

        // REQUEST LISTING

        router.get('/request/sent', (req, res) => { // list of all requests sent
            this.connectionService.listSentRequests(req.user.id, req.body.targetID)
                .then(requests => res.json(requests))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/request/received', (req, res) => { // list of all connection requests received
            this.connectionService.listReceivedRequests(req.user.id)
                .then(requests => res.json(requests))
                .catch((err) => res.status(500).json(err));
        })

        // REQUEST MANAGEMENT

        router.post('/request/sent', (req, res) => { // make a connection request
            this.connectionService.createSentRequest(req.user.id, req.body.targetID)
                .then(() => this.connectionService.listSentRequests(req.user.id))
                .then(requests => res.json(requests))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/request/received/approve', (req, res) => { // approve a connection request
            this.connectionService.approveRequest(req.user.id, req.body.targetID)
                .then(() => this.connectionService.listReceivedRequests(req.user.id))
                .then(requests => res.json(requests))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/request/received/reject', (req, res) => { // reject a connection request
            this.connectionService.rejectRequest(req.user.id, req.body.targetID)
                .then(() => this.connectionService.listReceivedRequests(req.user.id))
                .then(requests => res.json(requests))
                .catch((err) => res.status(500).json(err));
        })

        // DECK CONTENT

        router.get('/deck/suggested', (req, res) => { // list of all cards in SUGGESTED MATCHES deck
            this.connectionService.listConnectedSuggestions(req.user.id)
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/deck/mypicks', (req, res) => { // list of all cards in MANUALLY ADDED deck
            this.connectionService.listConnectedUsers(req.user.id)
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        // DECK ACTIONS

        router.delete('/deck/suggested', (req, res) => { // remove card from SUGGESTED MATCHES deck
            this.connectionService.deleteConnectedSuggestion(req.user.id, req.body.targetID)
                .then(() => this.connectionService.listConnectedSuggestions(req.user.id))
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/deck/mypicks', (req, res) => { // remove card from MANUALLY ADDED deck
            this.connectionService.deleteConnectedUser(req.user.id, req.body.targetID)
                .then(() => this.connectionService.listConnectedUsers(req.user.id))
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        // FLIP REQUESTS

        router.get('/flip/:targetID', (req, res) => { // get flip status for button display
            this.connectionService.getFlipStatus(req.user.id, req.params.targetID)
                .then(status => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.post('/flip/request/:targetID', (req, res) => { // make a flip request
            this.connectionService.sendFlipRequest(req.user.id, req.params.targetID)
                .then(() => this.connectionService.getFlipStatus(req.user.id, req.params.targetID))
                .then(status => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/flip/approve/:targetID', (req, res) => { // approve flip request
            this.connectionService.approveFlipRequest(req.user.id, req.params.targetID)
                .then(() => this.connectionService.getFlipStatus(req.user.id, req.params.targetID))
                .then(status => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/flip/reject/:targetID', (req, res) => { // reject flip request
            this.connectionService.rejectFlipRequest(req.user.id, req.params.targetID)
                .then(() => this.connectionService.getFlipStatus(req.user.id, req.params.targetID))
                .then(status => res.json(status))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = ConnectionRouter;