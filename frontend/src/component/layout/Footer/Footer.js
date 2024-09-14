import React from 'react';
import appstore from "../../../images/Appstore.png";
import googleplay from "../../../images/playstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={appstore} alt='appstore' />
        <img src={googleplay} alt="googleplay" />
      </div>
      <div className="midFooter">
        <h1>CR7</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2024 &copy; Nguyentran</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a hfref="https://instagram.com/choicenguyen_/">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer
