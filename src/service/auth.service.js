const connect = require('../app/database')

class AuthService{
    //是否具备权限
    async checkResource(tableName,resourceId , userId){
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
        const [ res ] = await connect.promise().execute(statement,[resourceId, userId])
     
        return res.length === 0 ? false : true;
    }
}
module.exports = new AuthService()