import React from 'react'
import '../styles/homePage.css'
import '../assets/images/IMG_8511.jpg'
import '../assets/images/IMG_8509.jpg'

function Home() {
  const img = require('../assets/images/IMG_8511.jpg')
  const img2 = require('../assets/images/IMG_8509.jpg')
  return (
    <div className="home-page">
        <div className="section a">
          <img src={img} />
          <img src={img2} />
        </div>

        <div className="section b">

        </div>
    </div>
  )
}

export default Home