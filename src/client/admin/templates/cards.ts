import { ol } from '../../utils/h'
import { css } from '../../utils/h/css'

export const cards = (
  ...children: HTMLLIElement[]
) => {
  const cards = ol(
    { class: 'cards' },
    cardsStyle,
    ...children
  )

  return cards
}

const cardsStyle = css`
  .cards {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    margin: 0;
    padding: 0 1rem;
    list-style: none;
  }

  .cards > li {
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 0 0.25rem #ddd;
  }

  .cards .card {
    background: #fff;
    border-radius: 1rem 1rem 0 0;
    padding: 1rem;
    max-height: 20rem;
    overflow: hidden;
    position: relative;
  }

  .cards .card::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20rem;
    background:
      linear-gradient(
        to left,
        rgba(255,255,255,1) 1rem,
        rgba(255,255,255,0) 3rem
      ),
      linear-gradient(
        to top,
        rgba(255,255,255,1) 1rem,
        rgba(255,255,255,0) 3rem
      );
    z-index: 1;
  }

  .cards > li {
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .cards .icon-card {
    background: rgba( 51, 153, 255, 0.03125 );
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-decoration: none;
  }

  .cards .icon-card:hover {
    background: rgba( 51, 153, 255, 0.0625 );
  }

  .cards .icon-card i {
    display: block;
    font-size: 2rem;
  }

  .cards .icon-card span {
    font-size: 1.5rem;
  }  
`