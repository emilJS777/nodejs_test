const db = require('../db/index')
class UserController{
    async createUser(req, res){
        await db.query('INSERT INTO users (balance) VALUES ($1) RETURNING *', [10000])
        res.send({success: true, msg: 'пользователь создан'})
    }
    async updateUser(req, res){
        const id = req.params.id;
        const {amount} = req.body;

        const user = await db.query('SELECT balance FROM users WHERE id = $1', [id]);

        if (user.rows.length === 0)
            return res.status(404).send({ success: false, message: 'Пользователь не найден' });

        const currentBalance = user.rows[0].balance;
        const newBalance = currentBalance - amount;

        if (newBalance < 0)
            return res.status(400).send({ success: false, message: 'средств на балансе недостаточно' });

        const updatedUser = await db.query('UPDATE users SET balance = $1 WHERE id = $2 RETURNING *', [newBalance, id]);
        res.send({ success: true, obj: updatedUser.rows[0] });
    }
    async getUser(req, res){
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users where id = $1', [id])
        if (user.rows.length === 0) {
            return res.status(404).send({ success: false, message: 'Пользователь не найден' });
        }
        res.send({success: true, obj: user.rows[0]})
    }

    async getUsers(req, res){
        const id = req.params.id;
        const users = await db.query('SELECT * FROM users')
        res.send({success: true, obj: users.rows})
    }
}
module.exports = {
    UserController
}