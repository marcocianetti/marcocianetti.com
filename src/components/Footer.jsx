import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
        <small>
          Realizzato da <strong>Marco Cianetti</strong> /{' '}
          <a href="https://github.com/marcocianetti/marcocianetti.com" target="_blank">
            Source
          </a>
        </small>
      </footer>
    )
  }
}

export default Footer
