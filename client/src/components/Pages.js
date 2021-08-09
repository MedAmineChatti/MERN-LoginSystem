import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './profile/Profile'
import UserManagement from './userMangment/userMangment'
import EditUser from './userMangment/editUser'
import NotFound from './utils/not_found/NotFound'
import Paginate from './userMangment/pagination'

import {GlobalState} from '../../GlobalState'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/profile" exact component={isLogged ? Profile : NotFound} />


            <Route path="/user_management" exact component={isAdmin ? UserManagement : NotFound} />
            <Route path="/edit_user/:id" exact component={isAdmin ? EditUser : NotFound} />
            
           

            
            <Route path="*" exact component={NotFound} />





        </Switch>
    )
}

export default Pages
