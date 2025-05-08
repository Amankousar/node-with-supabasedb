import express from 'express'
import { supabase } from './supabaseclient.js'

const app = express()
const PORT = process.env.PORT 

app.use(express.json())

// Get all todos
app.get('/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// Get todos by id
app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
      .from('todos')
      .select('task')
      .eq('id', id)
      .single() // ensures it returns one object instead of an array
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  })
  
// Get todos by task
app.get('/todos/task/:task', async (req, res) => {
    const { task } = req.params
    const { data, error } = await supabase
      .from('todos')
      .select('*') // or 'id, task' if you only want specific fields
      .eq('task', task)
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  })
  
// GET todos whose task starts with a specific prefix
app.get('/todos/starts-with/:prefix', async (req, res) => {
    const prefix = req.params.prefix;
  
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .ilike('task', `${prefix}%`); // case-insensitive starts-with match
  
      if (error) throw error;
  
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No matching todos found' });
      }
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  
// GET todos whose task contains specific letters (like regex)
app.get('/todos/match/:pattern', async (req, res) => {
    const pattern = req.params.pattern;
  
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .ilike('task', `%${pattern}%`); // case-insensitive match
  
      if (error) throw error;
  
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No matching todos found' });
      }
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Create a new todo
app.post('/todos', async (req, res) => {
  const { task } = req.body
  const { data, error } = await supabase
    .from('todos')
    .insert([{ task }])
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data)
  console.log('startsWith:', startsWith);
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { task, is_complete } = req.body
  const { data, error } = await supabase
    .from('todos')
    .update({ task, is_complete })
    .eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.put('/todos/is_completed/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: true })
        .eq('id', id)
        .select(); // returns updated row
  
      if (error) throw error;
  
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.json(data[0]); // send updated todo
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
