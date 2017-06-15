import React, {Component} from "react"
import style from './AboutMe.css'
import LinkList from '../LinkList/LinkList'

const AboutMe = () => {
return(
  <div id="about-me" className="about-me">
    <p className="home-text">
    I am a Front-End Developer who balances technical precision with creativity and strong interpersonal skills. I seek to be a part of a team that I can continuously learn from and contribute to in a meaningful way. My primary goal for the rest of my life is to become a true craftsman of my trade. After going to over 20 countries spanning across 5 continents, most by sailboat, I have a deep thirst for adventure and continuing to learn more about the world around me. This drive couples well with how I approach wanting to learn inside and out all that there is to know about being a Front-End Engineer.
    </p>
    <LinkList/>
  </div>
 )
}

export default AboutMe




// <div  className="about-me-img">
// </div>
