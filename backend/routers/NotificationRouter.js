const express = require('express');

class NotificationRouter {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    router() {
        let router = express.Router();

        // NOTIFICATION LISTING

        router.get('/all', (req, res) => { // All notifications for the logged in user
            this.notificationService.listNotification(req.user.id)
                .then(notes => res.json(notes))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/:noteID', (req, res) => { // Display content of notification
            this.notificationService.viewNotificationContent(req.user.id, req.params.noteID)
                .then(details => res.json(details))
                .catch((err) => res.status(500).json(err));
        })

        // NOTIFICATION MANAGEMENT

        router.put('/:noteID', (req, res) => { // Update status of notification to Read
            this.notificationService.readNotification(req.user.id, req.params.noteID)
                .then(() => this.notificationService.listNotification(req.user.id))
                .then((notes) => res.json(notes))
                .catch((err) => res.status(500).json(err));
        })

        router.delete('/:noteID', (req, res) => { // Delete notification
            this.notificationService.deleteNotification(req.user.id, req.params.noteID)
                .then(() => this.notificationService.listNotification(req.user.id))
                .then((notes) => res.json(notes))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = NotificationRouter;

