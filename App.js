/* eslint-disable react/react-in-jsx-scope */
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ClassPage from './ClassPage/ClassPage'
import ClassesPage from './ClassesPage/ClassesPage'
import LandingPage from './Landing/LandingPage'
import AssignmentDetailPage from './AssignmentDetailPage/AssignmentDetailPage'
import AssignmentPage from './Assignment/Assignments'
import SubmissionPage from './Submissions/Submission'
import DownloadButton from './AssignmentDetailPage/DownloadButton'
function App () {
  return (
    <Router>
    <div className="App">
     <Switch>
       <Route exact path='/' component={LandingPage}/>
       <Route path='/classPage' render={(props) => <ClassPage {...props}/>}/>
       <Route path='/classesPage' component={ClassesPage}/>
       <Route path='/download' component={DownloadButton}/>
       <Route path='/submissionPage' component={SubmissionPage}/>
       <Route path='/assignmentDetailPage' component={AssignmentDetailPage}/>
       <Route path='/assignmentsPage' component={AssignmentPage}/>
     </Switch>
    </div>
    </Router>
  )
}

export default App
