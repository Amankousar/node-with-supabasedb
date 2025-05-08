import { supabase } from './supabaseclient.js'

async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')

  if (error) {
    console.error('Error fetching todos:', error)
  } else {
    console.log('Todos:', data)
  }
}

getTodos()
