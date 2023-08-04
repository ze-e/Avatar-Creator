/* eslint-disable */

import React, { useState, useContext } from 'react'

export default function ModalQuestAdd () {
  const [selected, setSelected] = useState('http://localhost:3000/')
  const [message, setMessage] = useState('')

  const socialIcons = [
    {
      name: 'facebook',
      icon: 'fa fa-facebook-official',
      link: 'https://www.facebook.com/'
    },
    {
      name: 'twitter',
      icon: 'fa fa-twitter-square',
      link: 'https://www.twitter.com/'
    },
    {
      name: 'youtube',
      icon: 'fa fa-youtube-play',
      link: 'https://www.youtube.com/'
    }
  ]

  const copyToClipboard = () => {
    setMessage('')
    const copyText = document.getElementById('shareLink')
    copyText.focus();
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
          <button className='modal__social-button' aria-label={i.name} onClick={() => iconSelect(i.link)}>
            <i
            key={i.name}
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
      <span className='message'>{ message }</span>
    </div>
  )
}
