import React from 'react'
import style from './Contact.css'

const Contact = () => {
  return(
    <div id="contact-container" className="contact-container">
      <a id='phone-container' className="phone-container" href="tel:303-726-2125">
        <div className="phone-img">
        </div>
      </a>
      <a className='email-container' href="mailto:crobertjordan@yahoo.com">
        <div className="email-img">
        </div>
      </a>
    </div>
  )
}

export default Contact
