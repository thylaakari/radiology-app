import { z } from 'zod'

export const feedbackSchema = z.object({
  subject: z.string().min(1, 'Введите тему'),
  message: z.string().min(1, 'Введите сообщение'),
  email: z
    .string()
    .trim()
    .min(1, 'Введите email')
    .email('Введите корректный email'),
  f_status: z.enum(['new', 'in_progress', 'answered', 'closed']).default('new'),
})

export const useFeedback = () => {
  const toast = useToast()
  const client = useStrapiClient()

  const normalizeFeedback = (item) => {
    const source = item?.attributes ? { id: item.id, ...item.attributes } : item

    return {
      id: source.id,
      documentId: source.documentId,
      subject: source.subject,
      message: source.message,
      answer: source.answer,
      email: source.email,
      f_status: source.f_status,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
      publishedAt: source.publishedAt,
    }
  }

  const saveFeedback = async (data) => {
    const payload = {
      subject: data.subject,
      message: data.message,
      email: data.email,
      f_status: data.f_status || 'new',
    }

    let response

    if (data.documentId) {
      response = await client(`/feedbacks/${data.documentId}`, {
        method: 'PUT',
        body: {
          data: payload,
        },
      })
    } else {
      response = await client('/feedbacks', {
        method: 'POST',
        body: {
          data: payload,
        },
      })
    }

    const feedback = normalizeFeedback(response.data)

    toast.add({
      title: data.documentId ? 'Обращение обновлено' : 'Обращение создано',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })

    return feedback
  }

  const getFeedback = async ({ page = 1, pageSize = 10 } = {}) => {
    const response = await client('/feedbacks', {
      method: 'GET',
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort[0]': 'createdAt:desc',
      },
    })

    return {
      total: response.meta?.pagination?.total || 0,
      items: (response.data || []).map(normalizeFeedback),
    }
  }

  const getFeedbackById = async (documentId) => {
    const response = await client(`/feedbacks/${documentId}`, {
      method: 'GET',
    })

    return response?.data ? normalizeFeedback(response.data) : null
  }

  const deleteFeedback = async (documentId) => {
    await client(`/feedbacks/${documentId}`, {
      method: 'DELETE',
    })

    toast.add({
      title: 'Обращение удалено',
      color: 'warning',
      icon: 'i-lucide-trash',
    })
  }

  return {
    saveFeedback,
    getFeedback,
    getFeedbackById,
    deleteFeedback,
  }
}
