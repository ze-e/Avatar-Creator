
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalShare ({ imageLink }) {
  const [iframe, setIframe] = useState(true)
  const [message, setMessage] = useState('')
  const imageIframe = createIframe(imageLink)

  const copyToClipboard = () => {
    setMessage('')
    const copyText = document.getElementById('shareLink')
    copyText.focus()
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
    setMessage('Copied to clipboard!')
  }

  function openImage () {
    const newWindow = window.open()
    newWindow.document.write(imageIframe)
  }

  function createIframe (imageLink) {
    return '<iframe src="' + imageLink + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  }

  return (
    <div className='m-abs-container'>
      <input
        className='modal__input'
        type="text"
        readOnly
        value={iframe ? imageLink : imageIframe} id="shareLink"
        onClick={() => copyToClipboard()}
      />
      <br />
      <span>{message}</span>
      <br />
      <br />
      <div className='m-flex'>
        <button onClick={() => setIframe(!iframe)}>{!iframe ? 'Convert to link' : 'Convert to embed'}</button>
        <button onClick={() => openImage(imageLink)}>Open image in new window</button>
      </div>
    </div>
  )
}

ModalShare.propTypes = {
  imageLink: PropTypes.any.isRequired
}
