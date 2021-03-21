import React from 'react'
function downloadURI (uri, name) {
  const link = document.createElement('a')
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute('download', name)
  link.href = uri
  document.body.appendChild(link)
  link.click()
  link.remove()
}
function Test () {
  downloadURI('https://firebasestorage.googleapis.com/v0/b/gitgrader-6b726.appspot.com/o/SPMF-AAT-REPORT.pdf?alt=media&token=301b643f-5e9a-42dc-a0f3-8cf4301da200', 'nsmcn')
  return <div>Om Sai Ram</div>
}

export default Test
