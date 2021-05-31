export const getAuthHeaderValue = () => {
  const apiKeyEl = document.querySelector<HTMLElement>( '[data-api-key]' )

  if( apiKeyEl === null ) return

  const { apiKey } = apiKeyEl.dataset
  const auth = 'Basic ' + apiKey

  return auth
}