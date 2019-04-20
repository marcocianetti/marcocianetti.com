import React, { Component } from 'react'

class Contact extends Component {
  render() {
    return (
      <>
        <h1>Contatti</h1>
        <p>Puoi trovarmi in giro per il web:</p>
        <ul>
          <li>
            <strong>LinkedIn</strong>:{' '}
            <a target="_blank" href="https://www.linkedin.com/in/marco-cianetti/" rel="noopener noreferrer">
              marco-cianetti
            </a>
          </li>
          <li>
            <strong>Email</strong>: <a href="mailto:cianetti.m@gmail.com">cianetti.m@gmail.com</a>
          </li>
          <li>
            <strong>GitHub</strong>:{' '}
            <a target="_blank" href="https://github.com/marcocianetti" rel="noopener noreferrer">
              marcocianetti
            </a>
          </li>
        </ul>
      </>
    )
  }
}

export default Contact
