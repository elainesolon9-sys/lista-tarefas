import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Função auxiliar para mapear dados do Supabase para o formato do App
  const mapFromSupabase = (task) => ({
    id: task.id,
    title: task.title,
    category: task.category,
    priority: task.priority,
    dueDate: task.due_date,
    completed: task.completed,
    createdAt: task.created_at,
  })

  // Carregar tarefas do Supabase
  useEffect(() => {
    async function fetchTasks() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        if (data) {
          setTasks(data.map(mapFromSupabase))
        }
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const addTask = useCallback(async (taskData) => {
    const payload = {
      title: taskData.title.trim(),
      category: taskData.category || 'outros',
      priority: taskData.priority || 'media',
      due_date: taskData.dueDate || null,
      completed: false,
    }

    // Adição otimista (UI rápida)
    const tempId = crypto.randomUUID()
    const optimisticTask = { 
      id: tempId, 
      ...taskData, 
      dueDate: taskData.dueDate || '',
      completed: false, 
      createdAt: new Date().toISOString() 
    }
    setTasks(prev => [optimisticTask, ...prev])

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([payload])
        .select()
        .single()

      if (error) throw error
      
      // Substitui a tarefa otimista pela real do banco (com ID real)
      setTasks(prev => prev.map(t => t.id === tempId ? mapFromSupabase(data) : t))
      return mapFromSupabase(data)
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err.message)
      // Reverte o estado se falhar
      setTasks(prev => prev.filter(t => t.id !== tempId))
      throw err
    }
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    // Mapeia updates de volta para snake_case se necessário
    const dbUpdates = { ...updates }
    if (updates.dueDate !== undefined) {
      dbUpdates.due_date = updates.dueDate
      delete dbUpdates.dueDate
    }

    // Atualização otimista
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ))

    try {
      const { error } = await supabase
        .from('tasks')
        .update(dbUpdates)
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err.message)
      // Nota: Em um app real, aqui buscaríamos os dados novamente para garantir consistência
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    // Deleção otimista
    setTasks(prev => prev.filter(task => task.id !== id))

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err.message)
    }
  }, [])

  const toggleTask = useCallback(async (id) => {
    const taskToToggle = tasks.find(t => t.id === id)
    if (!taskToToggle) return

    const newStatus = !taskToToggle.completed

    // Toggle otimista
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: newStatus } : task
    ))

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: newStatus })
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Erro ao alternar status da tarefa:', err.message)
    }
  }, [tasks])

  const clearCompleted = useCallback(async () => {
    const completedIds = tasks.filter(t => t.completed).map(t => t.id)
    if (completedIds.length === 0) return

    // Limpeza otimista
    setTasks(prev => prev.filter(task => !task.completed))

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .in('id', completedIds)

      if (error) throw error
    } catch (err) {
      console.error('Erro ao limpar tarefas concluídas:', err.message)
    }
  }, [tasks])

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    byCategory: tasks.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    }, {}),
    byPriority: tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1
      return acc
    }, {}),
    completionRate: tasks.length > 0
      ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
      : 0,
  }

  return { tasks, addTask, updateTask, deleteTask, toggleTask, clearCompleted, stats, isLoading }
}
