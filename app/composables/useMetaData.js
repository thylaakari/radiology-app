export const useMetaData = () => {
  const title = useState('title')

  async function setTitle(payload) {
    if (payload && typeof payload === 'object') {
      const { name, birthDate, gender } = payload
      title.value = `${name || ''} ${birthDate || ''} ${gender || ''}`
    } else {
      title.value = payload
    }
  }

  return { title, setTitle }
}
