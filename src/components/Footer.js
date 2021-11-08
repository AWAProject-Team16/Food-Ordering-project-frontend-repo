import styles from './../css/Footer.module.css'
import React, { Component } from 'react'
import { FaPhoneVolume, FaEnvelope } from 'react-icons/fa'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className={ styles.footer }>
          <p />
          <hr />
          <div className={ styles.footerCollumn }>
            <div className={ styles.footerCollumna }>
              <div className={ styles.footerCollumnaTop }>
                <h3>CONTACT US</h3>
              </div>
              <ul className={ styles.footerCollumnaBottom }>
                <li>
                  <a href className>
                  <FaPhoneVolume/>
                  <span className={ styles.phone }>&nbsp;0909 123 456 <sub>(Free)</sub></span>
                  </a>
                </li>
                <li>
                  <a href className>
                  <FaEnvelope/>
                  <span>&nbsp;team16@students.oamk.fi</span>
                  </a>
                </li>
                <li>
                  <a href className>
                  {/* <i className={ styles.fas fa-home } /> */}
                  {/* <FaHome className={ styles.faHome } /> */}
                  <span className={ styles.homeAddress }>Yliopistokatu 9, 90570 OULU 90570 Oulu, Finland</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={ styles.footerCollumnb }>
              <div className={ styles.footerCollumnbTop }>
                <h3>CUSTOMER CARE</h3>
              </div>
              <ul className={ styles.footerCollumnbBottom }>
              <li><a href className>Warranty Policy</a></li>
              <li><a href className>Shopping Guide</a></li>
              <li><a href className>Transportation</a></li>
              <li><a href className>Return &amp; Refund</a></li>
              <li><a href className>About us</a></li>
              </ul>
            </div>
            <div className={ styles.footerCollumnc }>
              <div className={ styles.footerCollumncTop }>
                <h3>WHERE TO FIND US</h3>
              </div>
              <div className={ styles.footerCollumncBottom }>
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1682.2676912167033!2d25.469971516233894!3d65.06181808401735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46802d052d06ce85%3A0xd4acaa362bd64910!2sYliopistokatu%209%2C%2090570%20Oulu%2C%20Ph%E1%BA%A7n%20Lan!5e0!3m2!1svi!2s!4v1607357770203!5m2!1svi!2s" width={600} height={450} frameBorder={0} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
              </div>
            </div>
          </div>
          <hr />
          <div className={ styles.footerEnd }>
            <span>© 2021 TEAM-16. All rights reserved.</span>
          </div>
        </div>
      </div>
    )
  }
}