const express = require('express');
const status = require('http-status');
const authMiddleware = require('../middlewares/auth');
const pool = require('../../database/postgres/postgres');

const router = express.Router();
// router.use(authMiddleware);

router.post('/', async (req, res) => {
    const { description } = req.body;

    try {
        pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description], (err, result) => {
            if (err) {
                throw err;
            }
            const { id } = result.rows[0];
            return res.status(status.CREATED).send({ id, description });
        });
    } catch (err) {
        console.log(err);
        return res.status(status.BAD_REQUEST).send({ error: 'Failed to create a new TODO.' });
    }
});

router.get('/', async (req, res) => {
    try {
        pool.query('SELECT id, description FROM TODO', (err, result) => {
            if (err) {
                throw err;
            }
            return res.status(status.OK).send(result.rows);
        });
    } catch (err) {
        return res.status(Status.BAD_REQUEST).send({ error: 'Failed to list TODOs.' });
    }
});

module.exports = (app) => app.use('/todos', router);