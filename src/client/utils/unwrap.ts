export const unwrap = ( el: HTMLElement ) => {
  const { parentElement } = el

  if( parentElement === null ) throw Error( 'Expected parentElement' )

  while( el.firstChild ){
    parentElement.insertBefore( el.firstChild, el )
  }

  el.remove()
}
