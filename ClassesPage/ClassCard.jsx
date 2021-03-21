/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../index.css'
function ClassCard (props) {
  const [redirect, setRedirect] = useState(0)
  if (redirect) {
    return <Redirect to={{
      pathname: '/classPage',
      state: { classId: props.classId, name: props.name, courseid: props.courseid, userName: props.userName, userId: props.userId, isInstructor: props.isInstructor }
    }}/>
  }
  return (
            <div className='component rounded-xl max-h-64 w-96 shadow-lg mx-auto flex-col py-5 my-5 bg-white hover:border-t-4 hover:border-purple-400' >
                <div className='w-80 my-5 mx-auto'>
                    {
                    // eslint-disable-next-line react/prop-types
                    }
                    <p className='text-gray-600 font-bold text-lg '>{props.name}</p>
                </div>
                <div className='w-80 mx-auto'>
                    <p className='text-gray-500 text-md w-80 '> {props.semester} </p>
                </div>
                <div className='rounded-3xl w-80 bg-purple-300  h-9 px-28 mx-8 mt-5 mb-5 hover:bg-purple-400 pt-1'>
                    <button onClick={() => setRedirect(1)} className='text-gray-600 font-bold'>Go to Class</button>
                </div>
            </div>

  )
}

export default ClassCard
