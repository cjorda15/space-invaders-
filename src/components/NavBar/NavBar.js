import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavBar.css'
import Scroll from 'react-scroll';

const NavBar = () => {

 const  scrollAfterSearch = (input) => {

  setTimeout(() => {
    return Scroll.scroller.scrollTo(input, {
      duration: 1000,
      delay: 70,
      smooth: true
    })
   },100)
  }

  return (
    <div className="nav-bar-container">
      <NavLink
       className="nav-link"
       activeClassName='selected'
       to={'/'}>
        home
     </NavLink>
     <NavLink
      onClick={()=>{scrollAfterSearch('about-me')}}
      className="nav-link"
      activeClassName='selected'
      to={'/aboutme'}>
       about me
     </NavLink>
      <NavLink
      onClick={()=>{scrollAfterSearch('resume')}}
       className="nav-link"
       activeClassName='selected'
       to={'/resume'}>
        resume
      </NavLink>
      <NavLink
      onClick={()=>{scrollAfterSearch('projects')}}
       className="nav-link"
       activeClassName='selected'
       to={'/projects'}>
        projects
      </NavLink>
      <NavLink
      onClick={()=>{scrollAfterSearch('phone-container')}}
       className="nav-link"
       activeClassName='selected'
       to={'/contact'}>
        contact
      </NavLink>
    </div>
  )
}

export default NavBar
