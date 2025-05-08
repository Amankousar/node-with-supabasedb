// seedTodos.js
import { supabase } from './supabaseclient.js'

async function seedTodos() {
  const todos = [
    { task: 'Learn Supabase', is_complete: true},
    { task: 'Build a Node API', is_complete: true},
    { task: 'Insert dummy data', is_complete: true },
    { task: 'Take a coffee break', is_complete: false },
    { task: 'Buy groceries', is_complete: false },
    { task: 'Room cleaning', is_complete: true },
    { task: 'Cooking', is_complete: true },
    { task: 'Walking', is_complete: false },
  ]

  const { data, error } = await supabase
    .from('todos')
    .insert(todos)

  if (error) console.error('Error inserting todos:', error)
  else console.log('Inserted todos:', data)
}

seedTodos()
