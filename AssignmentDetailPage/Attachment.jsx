/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import { BsFileEarmarkCode, BsFileEarmarkText } from 'react-icons/bs'
import { FaFilePdf } from 'react-icons/fa'
function downloadURI (uri, name) {
  const link = document.createElement('a')
  link.setAttribute('download', name)
  link.href = uri
  document.body.appendChild(link)
  link.click()
  link.remove()
}
function Attachment (props) {
  console.log('attchment each: ' + props)
  let visiblepdf = 'hidden'
  let visibletxt = 'hidden'
  let visiblecode = 'hidden'
  if (props.type === 'pdf')visiblepdf = 'visible'
  else if (props.type === 'txt')visibletxt = 'visible'
  else visiblecode = 'visible'
  return (
        <div className='flex m-1'>
            <div><BsFileEarmarkCode className='fill-current text-gray-500 text-xl ' visibility={visiblecode}/></div>
            <div><FaFilePdf className='fill-current text-gray-500 text-xl ' visibility={visiblepdf}/></div>
            <div><BsFileEarmarkText className='fill-current text-gray-500 text-xl ' visibility={visibletxt}/></div>
             <button className='text-purple-600' onClick={() => downloadURI(props.name, 'file')
 }>Download</button>
        </div>
  )
}
export default Attachment
