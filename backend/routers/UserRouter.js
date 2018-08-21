const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        router.post('/create', (req, res) => { 
            this.userService.createUser(req.body.email, req.body,password, )
                .then((dishes) => res.json(dishes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/detail/:dishID', (req, res) => { // Get dish details of current dish
            this.dishService.getDishDetail(req.params.dishID)
                .then((dishDetail) => res.json(dishDetail))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = UserRouter;