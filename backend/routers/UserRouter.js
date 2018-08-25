const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        // MBTI @ SIGN UP 
        
        //     POST?
        //     vvv 
        router.put('/mbti', (req, res) => { // set MBTI at sign-up 
            this.userService.updateMBTI(req.user.id, req.body.atr1, req.body.atr2, req.body.atr3, req.body.atr4)
                .then(() => this.userService.getMBTI(req.user.id))
                .then(user => res.json(user))
                .catch(err => res.status(500).json(err));
        })

        router.get('/mbti', (req, res) => { // get MBTI for key attribute selection
            this.userService.getMBTI(req.user.id)
                .then((user) => res.json(user))
                .catch((err) => res.status(500).json(err));
        })

        // KEY ATTRIBUTE @ SIGN UP

        //     POST?
        //     vvv 
        router.put('/keyatr', (req, res) => { // set key attribute
            this.userService.updateKeyAtr(req.user.id, req.body.atr)
                .then(() => this.userService.getKeyAtr(req.user.id))
                .then(atr => res.json(atr))
                .catch(err => res.status(500).json(err));
        })

        //     POST?
        //     vvv 
        router.put('/keyatrdesc', (req, res) => { // set key attribute description
            this.userService.updateKeyAtrDesc(req.user.id, req.body.desc)
                .then(() => this.userService.getKeyAtrDesc(req.user.id))
                .then(desc => res.json(desc))
                .catch(err => res.status(500).json(err));
        })

        // KEY ATTRIBUTE FOR DISPLAY

        router.get('/keyatr', (req, res) => { // get key attribute
            this.userService.getKeyAtr(req.user.id)
                .then(atr => res.json(atr))
                .catch(err => res.status(500).json(err));
        })

        router.get('/keyatrdesc', (req, res) => { // get key attribute description
            this.userService.getKeyAtrDesc(req.user.id)
                .then(desc => res.json(desc))
                .catch(err => res.status(500).json(err));
        })

        // USER LISTING

        router.get('/suggested', (req, res) => { // All SUGGESTED MATCHES with no previous request / approval record
            this.userService.getSuggestedUsers(req.user.id)
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/nonsuggested', (req, res) => { // all NON-SUGGESTED USERS with no previous request / approval record
            this.userService.getNonSuggestedUsers(req.user.id)
                .then(users => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        // OTHER USERS' PROFILE

        router.get('/profile/public/:targetID', (req, res) => { // public profile at card front
            this.userService.getPublicProfile(req.params.targetID)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err));
        })

        router.get('/profile/full/:targetID', (req, res) => { // full profile at card back (flipped)
            this.userService.getFullProfile(req.params.targetID)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err));
        })

        // OWN PROFILE

        router.get('/myprofile', (req, res) => { // getting own profile details
            this.userService.getOwnProfile(req.user.id)
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json(err));
        })

        // NEED put method to update own profile

        // DRAW CARD

        router.get('/luckydraw', (req, res) => { // randomly get a user from all those not matching own type and without connection status
            this.userService.drawCard(req.user.id)
                .then((users) => res.json(users))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = UserRouter;

