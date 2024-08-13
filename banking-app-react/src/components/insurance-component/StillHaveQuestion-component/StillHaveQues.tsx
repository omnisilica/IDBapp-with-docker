import React from 'react'
import './StillHaveQues.css'

const StillHaveQues = () => {
  return (
    <>
      <div className='stillHaveQues container p-5 pt-4 mt-4 border shadow pb-4 mb-4 bg-white'>
        <div className='headerQuesSection'>
          <h1 className='headerText'>Still Have Questions?</h1>
        </div>
        <p className='helpText'>
          Please call <span className='phoneNumber'>666-234-5555</span> and an
          insurance counselor can assist you with completing your quote or
          setting up your new policy.
        </p>
      </div>
    </>
  )
}

export default StillHaveQues
