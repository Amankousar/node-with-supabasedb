// fetchTodos.js
import { supabase } from './supabaseclient.js'

async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')

  if (error) console.error('Error:', error)
  else console.log('Todos:', data)
}

fetchTodos()
