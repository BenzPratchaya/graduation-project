import React from 'react'

function Work() {
    function test() {
        console.log('test')
    }

    const workPics = {
        Pic1: "https://www.w3schools.com/w3images/tech_mic.jpg",
        Pic2: "https://www.w3schools.com/w3images/tech_phone.jpg",
        Pic3: "https://www.w3schools.com/w3images/tech_drone.jpg",
        Pic4: "https://www.w3schools.com/w3images/tech_sound.jpg",
        Pic5: "https://www.w3schools.com/w3images/tech_tablet.jpg",
        Pic6: "https://www.w3schools.com/w3images/tech_camera.jpg",
        Pic7: "https://www.w3schools.com/w3images/tech_typewriter.jpg",
        Pic8: "https://www.w3schools.com/w3images/tech_tableturner.jpg",
    }

  return (
    <div className="w3-container" style={{ padding: "128px 16px" }} id="work">
    <h3 className="w3-center">OUR WORK</h3>
    <p className="w3-center w3-large">What we've done for people</p>

    <div className="w3-row-padding" style={{ marginTop: "64px" }}>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic1} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A microphone" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic2} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A phone" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic3} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A drone" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic4} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="Soundbox" />
        </div>
    </div>

    <div className="w3-row-padding w3-section">
        <div className="w3-col l3 m6">
        <img src={workPics.Pic5} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A tablet" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic6} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A camera" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic7} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A typewriter" />
        </div>
        <div className="w3-col l3 m6">
        <img src={workPics.Pic8} style={{ width: "100%" }} onClick={test} className="w3-hover-opacity" alt="A tableturner" />
        </div>
    </div>
    </div>
  )
}

export default Work