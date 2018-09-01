class ChatService {

    constructor(knex) {
        this.knex = knex;
    }

    listConversation(userID) {
        let query = this.knex
            .select('id', 'user1', 'user2')
            .from('conversation')
            .where('user1', userID)
            .orWhere('user2', userID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                user1: row.user1,
                user2: row.user2
            }))
        })
    }

    beginConversation(userID, targetID) {
        let query = this.knex
            .select('id', 'user1', 'user2')
            .from('conversation')
            .where(function () {
                this.where('user1', userID)
                    .andWhere('user2', targetID)
            })
            .orWhere(function () {
                this.where('user1', targetID)
                    .andWhere('user2', userID)
            })

        return query.then((rows) => {
            if (rows.length === 0) {
                return this.knex('conversation')
                    .insert({
                        'user1': userID,
                        'user2': targetID
                    })
            } else {
                return;
            }
        })
    }

    exitConversation(userID, targetID) {
        let query = this.knex
            .select('id', 'user1', 'user2')
            .from('conversation')
            .where(function () {
                this.where('user1', userID)
                    .andWhere('user2', targetID)
            })
            .orWhere(function () {
                this.where('user1', targetID)
                    .andWhere('user2', userID)
            })

        return query.then(rows => {
            let newQuery = this.knex
                .select('id')
                .from('message')
                .where('conversation_id', rows[0].id)

            return newQuery.then(msgRows => {
                if (msgRows.length === 0) {
                    return this.knex('conversation')
                        .where('id', rows[0].id)
                        .delete()
                } else {
                    return;
                }
            })
        })

    }

    listMessages(conversationID) {
        let query = this.knex
            .select('users.display_name', 'users.profile_pic', 'message.id', 'message.msg_sender_id', 'message.msg_receiver_id', 'message.content', 'message.created_at')
            .from('message')
            .innerJoin('users', 'message.msg_sender_id', 'users.id')
            .where('conversation_id', conversationID)
            .orderBy('created_at', 'desc')

        return query.then(rows => {
            return rows.map(row => ({
                _id: row.id,
                text: row.content,
                createdAt: row.created_at,
                user: {
                    _id: row.msg_sender_id,
                    name: row.display_name,
                    avatar: `http://localhost:3000/${row.profile_pic}`
                }
            }))
        })
    }

    createMessage(userID, targetID, conversationID, content) {
        return this.knex('message')
            .insert({
                "msg_sender_id": userID,
                "msg_receiver_id": targetID,
                "conversation_id": conversationID,
                "content": content
            })
    }

    getIncomingMessage(conversationID, targetID) {
        let query = this.knex
            .select('users.display_name', 'users.profile_pic', 'message.id', 'message.msg_sender_id', 'message.msg_receiver_id', 'message.content', 'message.created_at')
            .from('message')
            .innerJoin('users', 'message.msg_sender_id', 'users.id')
            .where('conversation_id', conversationID)
            .andWhere('message.msg_sender_id', targetID)
            .orderBy('created_at', 'desc')

        return query.then(rows => {
            return rows.map(row => ({
                _id: row.id,
                text: row.content,
                createdAt: row.created_at,
                user: {
                    _id: row.msg_sender_id,
                    name: row.display_name,
                    avatar: `http://localhost:3000/${row.profile_pic}`
                }
            }));
        })
    }
}

module.exports = ChatService;