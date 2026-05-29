export const useProtocolEditor = () => {
  const selectedTemplate = useState('protocolSelectedTemplate', () => null)

  function applyTemplate(template) {
    selectedTemplate.value = template
  }

  return {
    selectedTemplate,
    applyTemplate,
  }
}
