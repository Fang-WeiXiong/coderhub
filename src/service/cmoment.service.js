const connection = require('../app/database')

class commentService {
    async create(momentId, content, userid) {
        const statement = `INSERT INTO comment (content, moment_id , user_id) VALUES(?,?,?) `
        const [res] = await connection.promise().execute(statement, [content, momentId, userid]);
       
        return res
    }

    async reply(momentId, content, userid, commentId) {
        const statement = `INSERT INTO comment (content, moment_id , user_id, comment_id) VALUES(?,?,?,?) `
        const [res] = await connection.promise().execute(statement, [content, momentId, userid, commentId]);
        return res
    }

    async update( content,commentId ) {
        const statement = `UPDATE comment SET content = ? WHERE id = ?`
        const [res] = await connection.promise().execute(statement, [content, commentId]);
        return res
    }

    async remove(commentId){
        const statement = `DELETE FROM comment WHERE id = ?`
        const res = await connection.promise().execute(statement, [commentId]);
        return res
    }
    async getCommentsByMomentId(momentId){
        const statement = `SELECT * FROM comment WHERE moment_id = ?`
        const res = await connection.promise().execute(statement, [momentId]);
        return res
    }
}

module.exports = new commentService();