const connection = require("../app/database")

class labelService {
    async creat(name) {
        const statement = `INSERT INTO label (name) VALUES (?)`
        const [res] = await connection.promise().execute(statement, [name])
        return res;
    }

    async getLabelsByName(name) {
        const statement = `SELECT * FROM label WHERE name = ?`
        const [res] = await connection.promise().execute(statement, [name])
        return res[0]
    }

    async getLabels(limit, offset){
        const statement = `SELECT * FROM label LIMIT ?,?`
        const [res] = await connection.promise().execute(statement, [offset, limit])
        return res
    
    }
}
module.exports = new labelService();