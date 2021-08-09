import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'



function Home() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <div>


{
                isAdmin ? 
                <>
                <h1>Admin Home Page</h1>
                </>
                : <>
                <h1>User Home Page</h1>
                </>
            }          
        </div>
        
    )
}

export default Home
