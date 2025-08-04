import express from 'express';
import pg from 'pg';
import cors from 'cors';
const { Client } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
    user: 'fabian',
    host: 'localhost',
    database: 'login_practicar',
    password: 'fabian123',
    port: '5432'
})

client.connect()
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.error('Algo salió mal', err))

app.post('/login', async (req, res) => {
    const {username, password } = req.body;

    try {
        const query = 'SELECT username, password FROM usuario WHERE username = $1 AND password = $2';
        const { rows } = await client.query(query, [username, password]);

        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });   
        } else {
            res.status(401).json({ success: false, message: 'usuario o contraseña mala' });
        }
    } catch (err) {
        console.error('error en la consulta', err);
        res.status(500).json({success: false, message: 'error al conectar con el servidor'})
    }
});

// iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en http:localhost:${PORT}`);
});