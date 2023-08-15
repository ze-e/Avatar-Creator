import React, { useContext, useEffect } from 'react'
import { ModalContext } from 'contexts/ModalContext'

export default function ModalContainer () {
  const { modalContent, modalOpen, setModalOpen, modalStyle } = useContext(ModalContext)

  function clickClose (e) {
    e.stopPropagation()
    if (e.target.matches('.modalContainer')) setModalOpen(false)
  }
  function escapeClose (e) {
    if (e.key === 'Escape') setModalOpen(false)
  }

  useEffect(() => {
    document.addEventListener('keyup', escapeClose, false)
    return () => {
      document.removeEventListener('keyup', escapeClose, false)
    }
  }, [])

  return modalOpen ? (
    <div className="modalContainer visible" onClick={(e) => clickClose(e)}>
      <div className={`modalContainer__inner ${modalStyle === 'small' && 'modalContainer__inner--small'}`}>
        <div className="modalContainer__content">{modalContent}</div>
        <button
          className="modalContainer__close"
          type="button"
          onClick={() => {
            setModalOpen(false)
          }}
        >
          X
        </button>
      </div>
    </div>
  ) : null
}
