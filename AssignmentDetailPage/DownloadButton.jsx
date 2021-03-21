import React from 'react'
function DownloadButton () {
  const downloadFile = () => {
    window.location.href = 'https://yoursite.com/src/assets/files/exampleDoc.pdf'
  }
  return (<button onClick={downloadFile} >Download</button>)
}

export default DownloadButton
