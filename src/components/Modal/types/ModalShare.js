
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function ModalShare ({ imageLink, imageName }) {
  const [link, setLink] = useState(imageLink)
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

  async function downloadImage (imageSrc, name) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='m-abs-container'>
      <div className='m-flex'>
        <button className='m-share-link' onClick={() => setLink(imageIframe)}>Embed</button>
        <button className='m-share-link' onClick={() => setLink(imageLink)}>Direct Link</button>
        <button className='m-share-link' onClick={() => openImage(imageLink)}>Open image in new window</button>
        <button className='m-share-link' onClick={() => downloadImage(imageLink, imageName)}>Download image</button>
      </div>
      <br />
      <input
        className='modal__input'
        type="text"
        readOnly
        value={link} id="shareLink"
        onClick={() => copyToClipboard()}
      />
      <br />
      <span>{message}</span>
    </div>
  )
}

ModalShare.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageName: PropTypes.string
}
