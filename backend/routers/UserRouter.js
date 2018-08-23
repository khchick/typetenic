const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        router.get('/mbti', (req, res) => { 
            this.userService.getMBTI(req.user.id)
                .then((user) => res.json(user))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/mbti', (req, res) => { 
            this.userService.updateMBTI(req.user.id, req.body.atr1, req.body.atr2, req.body.atr3, req.body.atr4)
                .then(() => this.userService.getMBTI(req.user.id))
                .then(user => res.json(user))
                .catch(err => res.status(500).json(err));
        })

        router.get('/keyatr', (req, res) => { 
            this.userService.getKeyAtr(req.user.id)
                .then(atr => res.json(atr))
                .catch(err => res.status(500).json(err));
        })

        router.put('/keyatr', (req, res) => { 
            this.userService.updateKeyAtr(req.user.id, req.body.atr)
                .then(() => this.userService.getKeyAtr(req.user.id))
                .then(atr => res.json(atr))
                .catch(err => res.status(500).json(err));
        })

        router.get('/keyatrdesc', (req, res) => { 
            this.userService.getKeyAtrDesc(req.user.id)
                .then(desc => res.json(desc))
                .catch(err => res.status(500).json(err));
        })

        router.put('/keyatrdesc', (req, res) => { 
            this.userService.updateKeyAtrDesc(req.user.id, req.body.desc)
                .then(() => this.userService.getKeyAtrDesc(req.user.id))
                .then(desc => res.json(desc))
                .catch(err => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = UserRouter;

