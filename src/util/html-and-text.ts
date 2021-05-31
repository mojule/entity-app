export type LinkTuple = [ string, string ]

export type LinkOrString = string | LinkTuple

export const htmlAndText = ( ...args: LinkOrString[] ) => {
  let text = ''
  let html = ''

  args.forEach( arg => {
    if( typeof arg === 'string' ){
      text += arg
      html += arg
      
      return
    }

    const [ href, title ] = arg
    
    html += `<a href="${ href }">${ title }</a>`
    text += `${ title }: ${ href }`
  })

  return { text, html }
}
