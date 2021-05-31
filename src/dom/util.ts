export const emptyElement = ( el: Element ) => {
  while( el.firstChild )
    el.removeChild( el.firstChild )
}