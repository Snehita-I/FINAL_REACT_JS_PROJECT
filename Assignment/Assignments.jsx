/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import React, { useEffect, useState } from 'react'
import AssignmentCard from './AssignmentCard'
import { Redirect } from 'react-router-dom'
import { firestore } from '../firebase'
function AssignmentList (props) {
  const assignments = props.assignments
  console.log('assignments: ', assignments)
  const assignmentItems = assignments.map((assignment) =>
      <AssignmentCard
        assignment={assignment}
        userName={props.userName}
        userId={props.userId}
        key={assignment.uid.toString()}
      />
  )
  return (
      <ul>{assignmentItems}</ul>
  )
}

function AssignmentPage (props) {
  const [data, setData] = useState([])
  const userName = props.location.state.userName
  const userId = props.location.state.userId
  const [redirect, setRedirect] = useState(0)

  useEffect(async () => {
    const querySnapshot = await firestore.collection('Classes').get()
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, ' => ', doc.data())
    })
    firestore.collectionGroup('assignments')
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const dataTemp = querySnapshot.docs.map(function (doc) {
            const queryData = { ...doc.data(), uid: doc.id }
            return queryData
          })
          console.log('firebase')
          setData([...dataTemp])
        })
      })
  }, [])

  if (redirect === 1) {
    return <Redirect to={{
      pathname: '/classesPage',
      state: { userName: userName, userId: userId }
    }}/>
  }

  return (
      <div className='component bg-gray-200'>
            <div className='component bg-purple-600 bg-opacity-80 mx-auto h-14 flex justify-between'>
              <p className='mx-5 pt-3 text-xl text-white font-bold'>GitGrader</p>
              <button onClick={() => { setRedirect(1) }}><p className='mx-5 pt-3 text-xl text-white '>Classes</p></button>
              <p className='text-white text-lg pt-3 mr-3'>{userName}</p>
            </div>
            <div className='container mx-auto self-center flex-row items-center justify-center w-4/5'>
                <AssignmentList assignments={data} userName={props.location.state.userName}/>

            </div>
     </div>
  )
}
export default AssignmentPage
