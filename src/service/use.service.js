const connection = require('../app/database')

class UserService{
	
	async create(users){
		const {name,password,email} = users
		const statement = `INSERT INTO users (name,password,email) VALUES(?,?,?)`
		const res = await connection.execute(statement,[name,password,email])
		return res;
	}

	async getUserByName(name){
		const statement = `SELECT * FROM users WHERE name = ?;`
		const res = await connection.promise().execute(statement,[name]);
		return res[0];
	}
	async updatedAvatarUrlById(avatarUrl,userId){
		const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
		const [res] = await connection.promise().execute(statement,[avatarUrl, userId]);
		return res;
	}

	async getUserDetail(userId){
		const statement = `SELECT * FROM users WHERE id = ?;`
		const res = await connection.promise().execute(statement,[userId]);
		return res[0];
	}
}
module.exports = new UserService()