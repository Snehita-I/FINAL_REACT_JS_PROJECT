/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import firebase, { firestore } from '../firebase'
import '../index.css'
import bg from '../Images/bg_assignment_detail.jpg'
import Attachment from './Attachment'
function AssignmentDetailPage (props) {
  const [isInstructor, setIsInstructor] = useState(false)
  const userName = props.location.state.userName
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    firestore.collection('Classes')
      .doc(props.location.state.assignment.classId.trim())
      .get().then(function (doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
          console.log('doc.data().instructors', doc.data().instructors)
          doc.data().instructors.map((i) => {
            if (i.uid.trim() === props.location.state.userId) {
              setIsInstructor(true)
            }
          })
          console.log('n   ', isInstructor)
        } else {
          console.log('No such document!')
        }
      })
  }, [])
  const onSubmit = data => {
    const thisRef = firebase.storage().ref().child(data.fileSubmitted[0].name)
    thisRef.put(data.fileSubmitted[0]).then(function (snapshot) {
      console.log('Uploaded a blob or file!')
    }).then(() => {
      firebase.storage().ref().child(data.fileSubmitted[0].name).getDownloadURL().then(url => {
        if (isInstructor) {
          alert('h1')
          firestore
            .collection('Classes')
            .doc(props.location.state.assignment.classId.trim())
            .collection('assignments')
            .doc(props.location.state.assignment.uid.trim())
            .update({
              attachments: firebase.firestore.FieldValue.arrayUnion(url)
            })
        } else {
          alert('h2')
          firebase.firestore()
            .collection('Classes')
            .doc(props.location.state.assignment.classId.trim())
            .collection('assignments')
            .doc(props.location.state.assignment.uid.trim())
            .update({
              submissions: firebase.firestore.FieldValue.arrayUnion({ document: url, name: userName })
            })
        }
      }).then(() => {
        alert('done')
      })
    })
  }
  function AttachmentList (props) {
    const attachments = props.attachments
    const attachmentItems = attachments.map((attachment) =>
      <Attachment
        key={attachment}
        name={attachment}
      />
    )
    return (
      <ul>{attachmentItems}</ul>
    )
  }
  return (
            <div className='w-full bg-white'>
                <div className=' mr-0 bg-white  w-full h-14 flex justify-between'>
                    <text className='mx-5 pt-3 text-xl text-gray-600 font-bold'>GitGrader</text>
                    <text className='text-gray-600 text-lg pt-3 mr-3'>Anshu</text>
                </div>

                <div className='mx-40  flex-col my-5 '>
                    <div className=' rounded-lg h-52 flex ' style={{ backgroundColor: '#390069' }}>
                        <div className='flex-col'>
                            <div className='mx-10 pt-8'>
                                <text className='text-4xl text-white font-bold '>{props.location.state.assignment.title}</text>
                            </div>
                            <div className='mx-10 pt-8'>
                                <text className='text-xl text-white'>Due Date: {props.location.state.assignment.dueDate.toDate().toString().substring(0, 15)}</text>
                            </div>
                        </div>
                        <div className='h-48 w-56 ml-32'>
                             <img src={bg} className='h-48 w-56'/>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='container w-64 h-56 shadow-lg my-7 mr-5 rounded-lg border-gray-300 border-2 flex-row justify-items-center '>
                            <div className='container p-5'>
                                <AttachmentList attachments={props.location.state.assignment.attachments}/>
                            </div>
                            <form className='m-5' onSubmit={handleSubmit(onSubmit)}>
                                <input ref={register} required name ="fileSubmitted" type ='file'/>
                                <button type='submit' value='submit'>Share</button>
                            </form>
                        </div>
                        <div className='container flex-3 w-4/5  shadow-inner my-7  rounded-lg border-gray-300 border-2 p-5'>
                           <text>{props.location.state.assignment.text}</text>
                        </div>
                    </div>

                </div>
            </div>

  )
}
export default AssignmentDetailPage
