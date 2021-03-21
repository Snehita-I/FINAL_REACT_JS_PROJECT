/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import SubmissionCard from './SubmissionCard'
import { firestore } from '../firebase'
import '../index.css'
function SubmissionList (props) {
  // eslint-disable-next-line react/prop-types
  const a = props.submissionList
  console.log('submissionList', a)
  // eslint-disable-next-line react/prop-types
  const ClassItems = a.map((submissionItem, i) =>
  <SubmissionCard
    key={submissionItem.uid.toString()}
    name={submissionItem.name}
    url={submissionItem.document}
  />
  )
  console.log('classitemst', ClassItems)
  return (
  <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">{ClassItems}</div>
  )
}

function SubmissionPage (props) {
  const [data, setData] = useState([])
  useEffect(() => {
    alert(props.location.state.name)
    firestore
      .collection('Classes')
      .doc(props.location.state.assignment.classId.trim())
      .collection('assignments')
      .doc(props.location.state.assignment.uid)
      .get().then(function (doc) {
        if (doc.exists) {
          console.log('doc.submi', doc.data().submissions)
          setData(doc.data().submission)
          // console.log('Document data:', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
  }, [])

  console.log('before return')
  return (
            <div className='component bg-gray-100'>

                <div>
                <SubmissionList submissionList={data}/>
                </div>
            </div>

  )
}

export default SubmissionPage
