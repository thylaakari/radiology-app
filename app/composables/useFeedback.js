import { z } from 'zod'

export const feedbackSchema = z.object({
  subject: z.string().min(1, 'Введите тему'),
  message: z.string().min(1, 'Введите сообщение'),
  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .email('Введите корректный email'),
  status: z.enum(['new', 'in_progress', 'answered', 'closed']).default('new'),
})

export const useFeedback = () => {
  const toast = useToast()
  const client = useSupabaseClient()

  const normalizeFeedback = (item) => {
    if (!item) return null

    return {
      id: item.id,
      subject: item.subject,
      message: item.message,
      answer: item.answer,
      email: item.email,
      status: item.status,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }
  }

  const handleError = (
    error,
    fallbackMessage = 'Ошибка при работе с обращением',
  ) => {
    if (error) {
      throw new Error(error.message || fallbackMessage)
    }
  }

  const saveFeedback = async (data) => {
    return await client.from('feedbacks').insert(data)
  }

  const getFeedback = async ({ page = 1, pageSize = 10 } = {}) => {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const [{ data, error }, { count, error: countError }] = await Promise.all([
      client
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to),

      client.from('feedbacks').select('*', { count: 'exact', head: true }),
    ])

    handleError(error)
    handleError(countError)

    return {
      total: count || 0,
      items: (data || []).map(normalizeFeedback),
    }
  }

  const getFeedbackById = async (id) => {
    const { data, error } = await client
      .from('feedbacks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      handleError(error)
    }

    return normalizeFeedback(data)
  }

  return {
    saveFeedback,
    getFeedback,
    getFeedbackById,
  }
}
