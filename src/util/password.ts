export const generatePassword = ( length = 20 ) => {
  if( length < 1 ) throw Error( 'Password length cannot be shorter than 1' )

  const chars = `${ lower }${ upper }${ numbers }${ punctuation }`
  let password = ''

  for (let p = 0; p < length; p++) {
    const i = Math.floor(Math.random() * chars.length)
    password += chars[i]
  }

  return password
}

const punctuation = '!#$&*+-=?@_'
const numbers = '0123456789'
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
