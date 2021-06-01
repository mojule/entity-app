import { css } from '../../dom/util'

export const entityFormStyle = css`
  .entity-form {
    background: #fff;
    border-radius: 1rem;
    max-width: 30rem;
    margin: 1rem;
    margin-top: 0;
    padding: 1rem;
    box-shadow: 0 0 0.25rem #ddd;
  }

  .entity-form label, .entity-form label span, .entity-form label input {
    display: block;
  }

  .entity-form label input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  .entity-form label input[type="checkbox"],
  .entity-form label input[type="checkbox"] + span {
    display: inline-block;
    padding-bottom: 1rem;
  }

  .entity-form fieldset {
    border: 1px solid #eee;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .entity-form legend {
    font-size: 1.1rem;
    font-weight: bold;
    color: #666;
  }

  .entity-form > fieldset > legend {
    color: #39f;
    font-size: 1.2rem;
  }

  .entity-form label {
    font-weight: bold;
    color: #666;
  }

  .entity-form label input:not( [type="checkbox"] ),
  .entity-form label select,
  .entity-form label textarea {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.25rem;
    border: 1px solid #ddd;
  }

  .entity-form button[data-action] {
    background: rgba( 51, 153, 255, 0.03125 );
    border: 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.25rem #ddd;
    margin-bottom: 1rem;
  }

  .entity-form button[data-action]:hover {
    background: rgba( 51, 153, 255, 0.0625 );
  }

  .entity-form button[data-action] > * {
    pointer-events: none;
  }
`
