const express = require('express');

class ConnectionRouter {
    constructor(connectionService) {
        this.connectionService= connectionService
    }

    router() {
        let router = express.Router();

        router.get('/suggested', (req, res) => { 
            this.connectionService.getSuggestedUsers(req.user.id)
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = ConnectionRouter;