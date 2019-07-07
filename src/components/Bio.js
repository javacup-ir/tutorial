import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import mainPic from '../assets/img/main.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        {/* <img
          src={mainPic}
          alt={`جاوا`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            borderRadius: "50%",
            width: rhythm(2),
            height: rhythm(2),
          }}
        /> */}
        <p>
          کتاب آموزش جاوا 
          <br></br>
         نوشته شده توسط دوستان جاواکاپ
        </p>
      </div>
    )
  }
}

export default Bio
