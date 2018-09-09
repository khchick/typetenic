class NotificationService {

    constructor(knex) {
        this.knex = knex;
    }

    listNotification(userID) {
        let query = this.knex
            .select('id', 'title', 'read_status', 'type', 'created_at')
            .from('notification')
            .where('note_receiver_id', userID)
            .orderBy('created_at', 'desc')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                title: row.title,
                read_status: row.read_status,
                type: row.type,
                created_at: row.created_at
            }))
        })
    }

    viewNotificationContent(userID, noteID) {
        let query = this.knex
            .select('id', 'title', 'content', 'read_status', 'type', 'created_at')
            .from('notification')
            .where('note_receiver_id', userID)
            .andWhere('id', noteID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                title: row.title,
                content: row.content,
                read_status: row.read_status,
                type: row.type,
                created_at: row.created_at
            }))
        })
    }

    readNotification(userID, noteID) {
        return this.knex
            .update('read_status', 'Read')
            .from('notification')
            .where('note_receiver_id', userID)
            .andWhere('id', noteID)
            .returning('read_status')
    }

    deleteNotification(userID, noteID) {
        return this.knex
            .delete()
            .from('notification')
            .where('note_receiver_id', userID)
            .andWhere('id', noteID)
    }

}

module.exports = NotificationService;