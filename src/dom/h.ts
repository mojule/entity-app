import { isNode } from './predicates'
import { HArg } from './types'
import { attr } from './util'

export const h = <K extends keyof HTMLElementTagNameMap>(
  name: K, ...args: HArg[]
): HTMLElementTagNameMap[K] => {
  const el = document.createElement( name)

  args.forEach(arg => {
    if( isNode( arg ) || typeof arg === 'string' ){
      el.append( arg )
    } else {
      attr( el, arg )
    }
  })

  return el
}

export const fragment = ( ...args: ( Node | string )[] ) => {
  const documentFragment = document.createDocumentFragment()

  documentFragment.append( ...args )

  return documentFragment
}

export const text = ( ...values: string[] ) => 
  document.createTextNode( values.join('') )

export const htmlElementFactory = <K extends keyof HTMLElementTagNameMap>(
  name: K
) => 
  ( ...args: HArg[] ) => h( name, ...args )

export const styleToString = (style: Partial<CSSStyleDeclaration>) => {
  const { style: rules } = div()

  Object.assign(rules, style)

  const { cssText } = rules

  return cssText
}

export const a = htmlElementFactory( 'a')
export const abbr = htmlElementFactory( 'abbr')
export const address = htmlElementFactory( 'address')
export const applet = htmlElementFactory( 'applet')
export const area = htmlElementFactory( 'area')
export const article = htmlElementFactory( 'article')
export const aside = htmlElementFactory( 'aside')
export const audio = htmlElementFactory( 'audio')
export const b = htmlElementFactory( 'b')
export const base = htmlElementFactory( 'base')
export const basefont = htmlElementFactory( 'basefont')
export const bdi = htmlElementFactory( 'bdi')
export const bdo = htmlElementFactory( 'bdo')
export const blockquote = htmlElementFactory( 'blockquote')
export const body = htmlElementFactory( 'body')
export const br = htmlElementFactory( 'br')
export const button = htmlElementFactory( 'button')
export const canvas = htmlElementFactory( 'canvas')
export const caption = htmlElementFactory( 'caption')
export const cite = htmlElementFactory( 'cite')
export const code = htmlElementFactory( 'code')
export const col = htmlElementFactory( 'col')
export const colgroup = htmlElementFactory( 'colgroup')
export const data = htmlElementFactory( 'data')
export const datalist = htmlElementFactory( 'datalist')
export const dd = htmlElementFactory( 'dd')
export const del = htmlElementFactory( 'del')
export const details = htmlElementFactory( 'details')
export const dfn = htmlElementFactory( 'dfn')
export const dialog = htmlElementFactory( 'dialog')
export const dir = htmlElementFactory( 'dir')
export const div = htmlElementFactory( 'div')
export const dl = htmlElementFactory( 'dl')
export const dt = htmlElementFactory( 'dt')
export const em = htmlElementFactory( 'em')
export const embed = htmlElementFactory( 'embed')
export const fieldset = htmlElementFactory( 'fieldset')
export const figcaption = htmlElementFactory( 'figcaption')
export const figure = htmlElementFactory( 'figure')
export const font = htmlElementFactory( 'font')
export const footer = htmlElementFactory( 'footer')
export const form = htmlElementFactory( 'form')
export const frame = htmlElementFactory( 'frame')
export const frameset = htmlElementFactory( 'frameset')
export const h1 = htmlElementFactory( 'h1')
export const h2 = htmlElementFactory( 'h2')
export const h3 = htmlElementFactory( 'h3')
export const h4 = htmlElementFactory( 'h4')
export const h5 = htmlElementFactory( 'h5')
export const h6 = htmlElementFactory( 'h6')
export const head = htmlElementFactory( 'head')
export const header = htmlElementFactory( 'header')
export const hgroup = htmlElementFactory( 'hgroup')
export const hr = htmlElementFactory( 'hr')
export const html = htmlElementFactory( 'html')
export const i = htmlElementFactory( 'i')
export const iframe = htmlElementFactory( 'iframe')
export const img = htmlElementFactory( 'img')
export const input = htmlElementFactory( 'input')
export const ins = htmlElementFactory( 'ins')
export const kbd = htmlElementFactory( 'kbd')
export const label = htmlElementFactory( 'label')
export const legend = htmlElementFactory( 'legend')
export const li = htmlElementFactory( 'li')
export const link = htmlElementFactory( 'link')
export const main = htmlElementFactory( 'main')
export const map = htmlElementFactory( 'map')
export const mark = htmlElementFactory( 'mark')
export const marquee = htmlElementFactory( 'marquee')
export const menu = htmlElementFactory( 'menu')
export const meta = htmlElementFactory( 'meta')
export const meter = htmlElementFactory( 'meter')
export const nav = htmlElementFactory( 'nav')
export const noscript = htmlElementFactory( 'noscript')
export const object = htmlElementFactory( 'object')
export const ol = htmlElementFactory( 'ol')
export const optgroup = htmlElementFactory( 'optgroup')
export const option = htmlElementFactory( 'option')
export const output = htmlElementFactory( 'output')
export const p = htmlElementFactory( 'p')
export const param = htmlElementFactory( 'param')
export const picture = htmlElementFactory( 'picture')
export const pre = htmlElementFactory( 'pre')
export const progress = htmlElementFactory( 'progress')
export const q = htmlElementFactory( 'q')
export const rp = htmlElementFactory( 'rp')
export const rt = htmlElementFactory( 'rt')
export const ruby = htmlElementFactory( 'ruby')
export const $s = htmlElementFactory( 's')
export const samp = htmlElementFactory( 'samp')
export const script = htmlElementFactory( 'script')
export const section = htmlElementFactory( 'section')
export const select = htmlElementFactory( 'select')
export const slot = htmlElementFactory( 'slot')
export const small = htmlElementFactory( 'small')
export const source = htmlElementFactory( 'source')
export const span = htmlElementFactory( 'span')
export const strong = htmlElementFactory( 'strong')
export const style = htmlElementFactory( 'style')
export const sub = htmlElementFactory( 'sub')
export const summary = htmlElementFactory( 'summary')
export const sup = htmlElementFactory( 'sup')
export const table = htmlElementFactory( 'table')
export const tbody = htmlElementFactory( 'tbody')
export const td = htmlElementFactory( 'td')
export const template = htmlElementFactory( 'template')
export const textarea = htmlElementFactory( 'textarea')
export const tfoot = htmlElementFactory( 'tfoot')
export const th = htmlElementFactory( 'th')
export const thead = htmlElementFactory( 'thead')
export const time = htmlElementFactory( 'time')
export const title = htmlElementFactory( 'title')
export const tr = htmlElementFactory( 'tr')
export const track = htmlElementFactory( 'track')
export const u = htmlElementFactory( 'u')
export const ul = htmlElementFactory( 'ul')
export const $var = htmlElementFactory( 'var')
export const video = htmlElementFactory( 'video')
export const wbr = htmlElementFactory( 'wbr')
