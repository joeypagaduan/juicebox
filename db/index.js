const { Client } = require('pg');
// const { idleTimeoutMillis } = require('pg/lib/defaults');

const client = new Client('postgres://localhost:5432/juicebox-dev');

async function getAllUsers() {
    const { rows } = await client.query(`
        SELECT id, username
        FROM users;
    `);

    return rows;
}


async function createUser({ username, password }) {
    try {
        const result = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [username, password]);
        
        const { row } = await client.query(`
            SELECT id, username
            FROM users;
        `)
        console.log('Result:', result)
        return row
    }   catch (error) {
        throw error;
    }
}


module.exports = {
    client,
    getAllUsers,
    createUser,
}