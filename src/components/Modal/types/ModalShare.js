
import React, { useState } from 'react'

export default function ModalQuestAdd () {
  const [selected, setSelected] = useState('http://localhost:3000/myavatar')
  const [message, setMessage] = useState('')

  const socialIcons = [
    {
      name: 'facebook',
      icon: 'fa fa-facebook-official',
      link: 'https://www.facebook.com/myavatar'
    },
    {
      name: 'twitter',
      icon: 'fa fa-twitter-square',
      link: 'https://www.twitter.com/myavatar'
    },
    {
      name: 'youtube',
      icon: 'fa fa-youtube-play',
      link: 'https://www.youtube.com/myavatar'
    }
  ]

  const copyToClipboard = () => {
    setMessage('')
    const copyText = document.getElementById('shareLink')
    copyText.focus()
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
    setMessage('Copied to clipboard!')
  }

  const iconSelect = (newVal) => {
    setMessage('')
    setSelected(newVal)
  }

  return (
    <div className='m-abs-container'>
      <div className='m-flex '>
        {socialIcons?.map(i =>
          <button key={i.name} className='modal__social-button' aria-label={i.name} onClick={() => iconSelect(i.link)}>
            <i
            className={`m-social-icon  ${i.icon}`}
          ></i>
        </button>
        )}
      </div>
      <input
        className='modal__input'
        type="text"
        readOnly
        value={selected} id="shareLink"
        onClick={() => copyToClipboard()}
      />
      <span>{message}</span>
      <br />
      <span className='m-error'>The actual url does not work yet</span>
    </div>
  )
}
