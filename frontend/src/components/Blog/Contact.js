import React from 'react'

function Contact() {
  return (
    <div className="w3-container w3-light-grey" style={{ padding: "128px 16px" }} id="contact">
    <h3 className="w3-center">CONTACT</h3>
    <p className="w3-center w3-large">Lets get in touch. Send us a message:</p>
    <div style={{ marginTop: "48px" }}>
        <p><i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Chicago, US</p>
        <p><i className="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +00 151515</p>
        <p><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: mail@mail.com</p>
        <br />
        <form action="/action_page.php" target="_blank">
        <p><input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" /></p>
        <p><input className="w3-input w3-border" type="text" placeholder="Email" required name="Email" /></p>
        <p><input className="w3-input w3-border" type="text" placeholder="Subject" required name="Subject" /></p>
        <p><input className="w3-input w3-border" type="text" placeholder="Message" required name="Message" /></p>
        <p>
            <button className="w3-button w3-black" type="submit">
            <i className="fa fa-paper-plane"></i> SEND MESSAGE
            </button>
        </p>
        </form>
        <img src="https://www.w3schools.com/w3images/map.jpg" className="w3-image w3-greyscale" style={{ width: "100%", marginTop: "48px" }} />
    </div>
    </div>
  )
}

export default Contact