import React, {useContext, useEffect,useState} from 'react'
import {GlobalState} from '../../../GlobalState'

import axios from 'axios'
import Pagination from './pagination'
import { isEmpty } from '../utils/validation/Validation'

function UserMangment() {

    const state = useContext(GlobalState)
    const [token] = state.token
    const [posts, setPosts] =  useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [currentPage, setCurrentPage] =  useState(1)
    const [postsPerPage, setPostsPerPage] =  useState(10)
    const [filter, setFilter] =  useState('')


    useEffect(() => {
        if (token){
            
            const getPosts = async() =>{
               
               const res = await  
               axios.get('/user/get_all_user')
           setPosts(res.data)
           console.log(res.data)
     
            } 
           
            getPosts()
        }
    },[token, isAdmin, setPosts])


    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage; 
    const CurrentPosts = posts.slice(indexOfFirstPost,indexOfLastPost); 

    console.log(indexOfLastPost+" "+indexOfFirstPost);



    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const onDelete = async(id) => {

    
          axios.delete(`/user/delete_user/${id}`).then((res)=>{
            alert("User Deleted  Successfuly");
            window.location.href = "/user_management";
            })

            await onDelete
    }


   const searchText = (event) => {
       setFilter(event.target.value);
   } 
   let dataSearch = CurrentPosts.filter( item => {

              return Object.keys(item).some(key => 
          item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
          )
   });
    return (
        <div className="history-page container">
             <div className="row">
                <div className="col col-1"></div>
                <div className="mb-3 col col-10 mycss mx-auto text-center">
                    <input 
                         type="text" 
                         className="form-control" 
                         value={filter} 
                         onChange={searchText.bind(this)}
                         placeholder="Search For User..."
                    />
                </div>
                <div className="col col-1"></div>
            </div>
            <br/><br/>

            <div className="row">

                <div className="col col-12 responsive-container">
                <table className="usertabelstyle">
                <thead>
                    <tr >
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Date of Creation</th>
                        <th>Last login Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataSearch.map(items => (
                            <tr key={items._id}>
                                <td>{items.name}</td>
                                <td>{items.email}</td>
                                <td>{items.password_clear}</td>
                                <td>{items.register_date}</td>
                                <td> {items.login_date}</td>
                                <td> 
                                     <a className= "btn btn-light k l" href = {`/edit_user/${items._id}`}>
                                         <center>Edit</center>
                                     </a>
                                     <br/>
                                     <a className= "btn btn-light k"  href="#" onClick={() => onDelete(items._id)}>
                                         <center>Delete</center> 
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                   
                </tbody>
            </table>
            <br/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
            <br/><br/>
                </div>
                </div>
            </div>



            
          
        
    )
}

export default UserMangment
