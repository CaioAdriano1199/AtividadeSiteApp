const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = 'https://edyonhbkbcddrdiogxei.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeW9uaGJrYmNkZHJkaW9neGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzA3OTYsImV4cCI6MjA3MzYwNjc5Nn0.oMMjOm57Sd0F_cTWxz1FUqhVdjV3uUbB0PSOmWr1DNE';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get('/estabelecimentos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('estabelecimentos')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar estabelecimentos' });
    }
});

//cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const { data, error } = await supabase
            .from('cliente')
            .insert([{ nome, email, senha }])
            .select();

        if (error) throw error;

        res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente: data[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

//login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const { data, error } = await supabase
            .from('cliente')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        if (data.senha !== senha) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        res.json({ message: 'Login realizado com sucesso', cliente: { id: data.id, nome: data.nome, email: data.email } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
