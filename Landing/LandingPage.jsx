/* eslint-disable import/no-duplicates */
import React, { Component } from 'react'
import { signInWithGoogle, auth } from '../firebase'
import { Redirect } from 'react-router-dom'
import { firestore } from '../firebase'
import './LandingPage.css'
class LandingPage extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null,
      redirect: 0,
      userId: ''
    }
  }

      unsubscribeFromAuth = null;

      componentDidMount () {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
          this.setState({ currentUser: user })
          let docId = ''
          if (user != null) {
            console.log('please', user.displayName)
            const querySnapshot = await firestore.collection('Users').where('studid', '==', user.email.trim()).get()
            console.log(querySnapshot.docs)
            querySnapshot.forEach(function (doc) {
              // console.log(doc.id)
              docId = doc.id
            })
          }
          this.setState({ userId: docId })
          // console.log("userId: ",this.state.userId);
        })
      }

      componentWillUnmount () {
        this.unsubscribeFromAuth()
      }

      render () {
        if (this.state.redirect === 1) {
          console.log('displ', this.state.currentUser.displayName)
          console.log('userId', this.state.currentUser.email)
          console.log('userId', this.state.userId)
          return <Redirect to={{
            pathname: '/assignmentsPage',
            state: { userName: this.state.currentUser.displayName, userId: this.state.userId }
          }}/>

          // firestore.collection('Users').where('studid', "==", this.state.currentUser.email.trim() )
          // .get()
          // .then(function(querySnapshot) {
          //     querySnapshot.forEach(function(doc) {
          //         console.log(doc.id, " => doc ", doc.data());
          //     });
          // })
          // .catch(function(error) {
          //     console.log("Error getting documents: ", error);
          // });
        }
        return (
            <div className='background' >
                <div className='grid grid-cols-2'>
                    <div className='container mx-auto px-6 pt-20'>
                        <h2 className='text-white font-bold mb-2 text-4xl'>
                            Welcome
                        </h2>
                        <h3 className='max-w-md text-gray-200 text-2xl'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique varius mi, vel vehicula sapien dictum ac. Duis at convallis arcu. Maecenas convallis nisl eu mauris malesuada maximus.
                        </h3>
                    </div>
                    {
                        this.state.currentUser

                          ? (
                        <div className='container bg-white mt-10 box-border rounded-lg mx-auto px-6 py-2 max-w-sm'>
                          <button className='mx-20 bg-purple-500 text-white bg-white shadow-lg rounded-full py-1 px-4' onClick={() => { this.setState({ redirect: 1 }) }}>Go to Assignments</button>
                          <div className='rounded-3xl'>
                            <img src={this.state.currentUser.photoURL} />
                          </div>
                          <div>Name: {this.state.currentUser.displayName}</div>
                          <div>Email: {this.state.currentUser.email}</div>

                          <button onClick={() => auth.signOut()}>LOG OUT</button>
                        </div>
                            )
                          : <div>
                        <div className='container bg-white mt-10 box-border rounded-lg mx-auto px-6 py-2 max-w-sm'>
                            <p className='pb-4 px-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ut tristique varius mi, vel</p>
                            <button className='mx-20 bg-purple-500 text-white bg-white shadow-lg rounded-full py-1 px-4' onClick={signInWithGoogle}>Sign in with google</button>
                            <p className='mt-4 font-bold text-purple-500' >I forgot my password</p>
                        </div>
                    </div>
                    }

                </div>
            </div>
        )
      }
}
export default LandingPage
