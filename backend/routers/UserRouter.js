const express = require('express');

// For handling profile image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users')
        // cb(null, "/mnt/c/Personal-project/assets/") //for windows picture
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        // ALL REPLACED BY CompletePublicProfile()

            // router.put('/mbti', (req, res) => { // set MBTI at sign-up 
            //     this.userService.updateMBTI(req.user.id, req.body.atr1, req.body.atr2, req.body.atr3, req.body.atr4)
            //         .then(() => this.userService.getMBTI(req.user.id))
            //         .then(user => res.json(user))
            //         .catch(err => res.status(500).json(err));
            // })

            // router.get('/mbti', (req, res) => { // get MBTI for key attribute selection
            //     this.userService.getMBTI(req.user.id)
            //         .then((user) => res.json(user))
            //         .catch((err) => res.status(500).json(err));
            // })

            // // KEY ATTRIBUTE @ SIGN UP

            // router.put('/keyatr', (req, res) => { // set key attribute
            //     this.userService.updateKeyAtr(req.user.id, req.body.atr)
            //         .then(() => this.userService.getKeyAtr(req.user.id))
            //         .then(atr => res.json(atr))
            //         .catch(err => res.status(500).json(err));
            // })

            // router.put('/keyatrdesc', (req, res) => { // set key attribute description
            //     this.userService.updateKeyAtrDesc(req.user.id, req.body.desc)
            //         .then(() => this.userService.getKeyAtrDesc(req.user.id))
            //         .then(desc => res.json(desc))
            //         .catch(err => res.status(500).json(err));
            // })

            // // KEY ATTRIBUTE FOR DISPLAY

            // router.get('/keyatr', (req, res) => { // get key attribute
            //     this.userService.getKeyAtr(req.user.id)
            //         .then(atr => res.json(atr))
            //         .catch(err => res.status(500).json(err));
            // })

            // router.get('/keyatrdesc', (req, res) => { // get key attribute description
            //     this.userService.getKeyAtrDesc(req.user.id)
            //         .then(desc => res.json(desc))
            //         .catch(err => res.status(500).json(err));
            // })

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

        // DRAW CARD

        router.get('/luckydraw', (req, res) => { // randomly get a user from all those not matching own type and without connection status
            this.userService.drawCard(req.user.id)
                .then((users) => res.json(users))
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

        router.post('/myprofile', upload.single('profile_pic'), (req, res) => { // complete own profile details
            this.userService.completePublicProfile(req.user.id, 
                req.body.display_name,
                req.body.dob,
                req.body.gender,
                req.body.orientation,
                req.body.location,
                req.body.mbti,
                req.body.key_atr,
                req.body.key_atr_desc,
                req.file.originalname) // path of  profile pic
                .then(() => this.userService.getOwnProfile(req.user.id))
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/myprofile', (req, res) => { // getting own profile details
            this.userService.getOwnProfile(req.user.id)
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json(err));
        })

        router.put('/myprofile', (req, res) => { // update profile details
            this.userService.updateProfile(req.user.id, 
                req.body.password,
                req.body.display_name,
                req.body.dob,
                req.body.gender,
                req.body.orientation,
                req.body.location,
                req.body.mbti,
                req.body.key_atr,
                req.body.key_atr_desc,
                req.body.profile_pic,
                req.body.min_age,
                req.body.max_age,
                req.body.ig_account,
                req.body.ideal_first_date)
                .then(() => this.userService.getOwnProfile(req.user.id))
                .then((data) => res.json(data))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = UserRouter;

