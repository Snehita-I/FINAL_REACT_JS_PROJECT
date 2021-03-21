/* eslint-disable react/prop-types */
import React from 'react'
import '../index.css'
function SubmissionCard (props) {
  return (
            <div className='component rounded-xl max-h-64 w-96 shadow-lg mx-auto flex-col py-5 my-5 bg-white hover:border-t-4 hover:border-purple-400' >
                <div className='w-80 my-5 mx-auto'>
                    {
                    // eslint-disable-next-line react/prop-types
                    }
                    <p className='text-gray-600 font-bold text-lg '>{props.name}</p>
                </div>
                <div className='w-80 mx-auto'>
                    <p className='text-gray-500 text-md w-80 '> {props.url} </p>
                </div>
            </div>

  )
}

export default SubmissionCard
