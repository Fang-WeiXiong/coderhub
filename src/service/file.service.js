const connection = require('../app/database')

class FileService {
    async createAvatar(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar(filename,mimetype,size,user_id) VALUES(?,?,?,?) `
        const [res] = await connection.promise().execute(statement, [filename, mimetype, size, userId])
        return res;
    }
    async getAvatorByUserId(userId) {
        const statement = ` SELECT * FROM avatar WHERE user_id=? `
        const [res] = await connection.promise().execute(statement, [userId])
        return res;
    }
    async createPicture(filename, mimetype, size, userId, momentId){
        const statement = `INSERT INTO file(filename,mimetype,size,user_id,moment_id) VALUES(?,?,?,?,?) `
        const [res] = await connection.promise().execute(statement, [filename, mimetype, size, userId, momentId])
        return res;
    }
    async getFileByFilename(filename){
        const statement = ` SELECT * FROM file WHERE filename=? `
        const [res] = await connection.promise().execute(statement, [filename])
        return res;
    }
}

module.exports = new FileService()