import React, { useState, useContext } from 'react'
import { ModalContext } from 'contexts/ModalContext'

export default function ModalQuestAdd () {
  const { setModalOpen } = useContext(ModalContext)
  const [selected, setSelected] = useState('http://localhost:3000/')

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
    const copyText = document.getElementById('shareLink')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
    alert('Copied to clipboard!')
  }

  return (
    <div className='m-abs-container'>
      <button
        className="m-abs-upper-right m-skillListButton button"
        onClick={() => setModalOpen(false)}
      >
        X
      </button>
      <div className='m-flex'>
        {socialIcons.map(i => <i
          key={i.name}
          className={i.icon}
          style="font-size:24px"
          onClick={ setSelected(i.link) }
        ></i>)}
      </div>
      <input
        type="text"
        value={selected} id="shareLink"
        onClick={copyToClipboard}
      />
    </div>
  )
}
