import React, { useContext } from 'react'
import './Header.css'
import { ThemeContext } from '../App'

const Header = ({ title, leftChild, rightChild }) => {
  const { dark } = useContext(ThemeContext)
  return (
    <header className={`Header ${dark ? 'dark' : ''}`}>
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  )
}

export default Header