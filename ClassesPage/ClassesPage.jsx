/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ClassCard from './ClassCard'
import { firestore } from '../firebase'
import ReactModal from 'react-modal'
import '../index.css'
function ClassList (props) {
  // eslint-disable-next-line react/prop-types
  const a = props.classlist
  console.log('classList', a)
  // eslint-disable-next-line react/prop-types
  const ClassItems = a.map((classItem, i) =>
  <ClassCard
    key={classItem.uid.toString()}
    name={classItem.name}
    semester={classItem.semester}
    classId={classItem.uid}
    courseid={classItem.courseid}
    userId={props.userId}
    userName={props.userName}
    isInstructor={classItem.isInstructor}
  />
  )
  console.log('classitemst', ClassItems)
  return (
  <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">{ClassItems}</div>
  )
}

function ClassesPage (props) {
  const userId = props.location.state.userId
  const userName = props.location.state.userName
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courseid, setCourseid] = useState('')
  const [coursename, setCoursename] = useState('')
  const [courseintro, setCourseintro] = useState('')
  const [sem, setSem] = useState('')
  const instructors = props.userId
  const handleSubmit = () => {
    console.log('courseid:', courseid)
    console.log('coursename:', coursename)
    console.log('courseintro:', courseintro)
    console.log('sem:', sem)
    console.log('instructors:', instructors)
    setIsModalOpen(false)
  }

  useEffect(async () => {
    let dataTemp = []
    let classesPasrOfStud = []
    let classesPasrOfInstr = []
    let isPartOfClass = 0
    const querySnapshot = await firestore.collection('Classes').get()
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, ' => ', doc.data())
      doc.data().students.forEach((student) => {
        console.log('student: ', student)
        if (student.uid.trim() === userId.trim()) {
          console.log('yes')
          // 1 => isStudent
          isPartOfClass = 1
        }
      })
      doc.data().instructors.forEach(async (instructor) => {
        console.log('instr: ', instructor)
        if (instructor.uid.trim() === userId.trim()) {
          console.log('yes')
          // 2 => isInstructor
          isPartOfClass = 2
        }
      })
      console.log('isPasrOf', isPartOfClass)
      if (isPartOfClass === 1) {
        classesPasrOfStud = [...classesPasrOfStud, doc.id]
      } else if (isPartOfClass === 2) {
        classesPasrOfInstr = [...classesPasrOfInstr, doc.id]
      }
    })
    console.log('seeting data')
    setData([...dataTemp])
    firestore.collection('Classes')
      .orderBy('semester')
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (classesPasrOfStud.includes(doc.id)) {
            console.log(doc.id)
            dataTemp = [...dataTemp, { ...doc.data(), uid: doc.id, isInstructor: false }]
          } else if (classesPasrOfInstr.includes(doc.id)) {
            console.log(doc.id)
            dataTemp = [...dataTemp, { ...doc.data(), uid: doc.id, isInstructor: true }]
          }
        })
        console.log('firebase')
        setData([...dataTemp])
      })
  }, [])
  console.log('before return')
  return (
            <div className='component bg-gray-100'>
                <div className='component bg-purple-600 bg-opacity-80 mx-auto h-14 flex justify-between'>
                    <p className='mx-5 pt-3 text-xl text-white font-bold'>GitGrader</p>
                    <button onClick={() => { setIsModalOpen(true) }}><p className='mx-5 pt-3 text-xl text-white '>Add Class</p></button>
                    <p className='text-white text-lg pt-3 mr-3'>{userName}</p>
                </div>
                <ReactModal
                isOpen={isModalOpen}
                contentLabel="Minimal Modal Example"
                className='container w-2/5 mx-auto h-2/3 mt-36 bg-purple-300 border-white focus:border-white'
                >
                    <form onSubmit={handleSubmit} className='container w-1/3 mx-auto h-2/3 py-5 mt-36 bg-purple-300 my-auto border-white '>

                        <div className='my-3 w-4/5'>
                            <label className="text-white">
                                Course id:
                                <input type="text" className="text-gray-500 rounded-lg" value={courseid} onChange={(event) => { setCourseid(event.target.value) }} />
                            </label>
                        </div>
                        <div className='my-3 w-4/5'>
                            <label className="text-white">
                                Course name:
                                <input value={coursename} className="text-gray-500 rounded-lg w-full" onChange={(event) => { setCoursename(event.target.value) }} />
                            </label >
                        </div>
                        <div className='my-3 w-4/5'>
                            <label className="text-white">
                                Course Semester:
                                <input value={sem} className="text-gray-500 rounded-lg" onChange={(event) => { setSem(event.target.value) }} />
                            </label >
                        </div>
                        <div className='my-3 w-4/5'>
                            <label className="text-white">
                                Course Intro:
                                <textarea value={courseintro} className="text-gray-500 rounded-lg" onChange={(event) => { setCourseintro(event.target.value) }} />
                            </label >
                        </div>
                        <button className='bg-purple-200 text-purple-700 w-48 h-8 rounded-lg' type="submit" value="Submit">ADD POST</button>
                        <button className='bg-purple-200 text-purple-700 w-48 h-8 rounded-lg mt-3' onClick={() => { setIsModalOpen(false) }}>CANCEL</button>
                    </form>
                </ReactModal>

                <div>
                <ClassList classlist={data} userId={userId} userName={userName}/>
                </div>
            </div>

  )
}

export default ClassesPage
