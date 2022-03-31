import React from 'react'
import loadingGif from '../assets/load.gif'

function Spinner() {
  return (
    <img
      src={loadingGif}
      alt='Loading...'
      style={{width: '100px', margin: 'auto', display: 'block'}}
    />
  )
}

export default Spinner