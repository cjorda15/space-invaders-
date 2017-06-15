import React from 'react'
import style from './MainContent.css'
import LinkList from '../LinkList/LinkList'


const MainContent = () => {
  return(
    <div className="main-content">
     <h3 className="name-container">Chris Jordan</h3>
      <p className="banner-welcome">
        Welcome to my site.
      </p>
     <LinkList/>
    </div>
  )
}

export default MainContent
