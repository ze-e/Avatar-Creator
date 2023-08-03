import React from 'react'
import PropTypes from 'prop-types'
import DataLayer from 'components/DataLayer/DataLayer'
import Header from 'components/Header/Header'
import Modal from 'components/Modal/ModalContainer'
import Footer from 'components/Footer/Footer'

export default function Layout ({ children }) {
  return (
    <DataLayer>
      <Header />
      <div className="main">
        {children}
        <Modal />
      </div>
      <Footer />
    </DataLayer>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
