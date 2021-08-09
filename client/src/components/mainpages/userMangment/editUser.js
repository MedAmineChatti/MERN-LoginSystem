import axios from 'axios'
import {Link} from 'react-router-dom'
import React, {useState, useEffect, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {isEmpty, isLength, isEmail} from '../utils/validation/Validation'

import { useParams } from "react-router-dom";

function EditUser() {
    
        
        const params = useParams();

        const state = useContext(GlobalState)
        const [posts, setPosts] =  useState([])
        const [token] = state.token
        const [isAdmin] = state.userAPI.isAdmin

        useEffect(() => {
                const id = params.id;
                console.log(id)
                const getPosts = async() =>{
                   const res = await  axios.get(`http://localhost:5000/user/detail/${id}`)
                    setPosts(res.data)
                   console.log(res.data)
                } 
                
                getPosts()
        },[token, isAdmin, setPosts])
    
     
     
     
     
     
       
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
    







        const updateSubmit = async e =>{
        
 
            try {
                const id = params.id;

                let item = {name,email,password};
                
                if (isEmpty(item.name)) {
                    return alert("Name Is Require");
                }

                if(isLength(item.name)){
                    return alert("User Name must be at least 6 characters.");
                }

                if (isEmpty(item.email)) {
                    return alert("Email Is Require");
                }

                if (isEmpty(item.password)){
                    return alert("Password Is Require");
                }
                
                if(isLength(item.password)){
                    return alert("Password must be at least 6 characters.");
                }

           
                if (isEmail(item.email)) {
                    const res =  await axios.put(`http://localhost:5000/user/update_user/${id}`,item);
            
                    alert(res.data.msg);

                    if (res.data.msg === "Updated a User Successfuly")
                    {
                        window.location.href = "/user_management";
                    }
                }
                else{
                    return alert("Insert Real Email.");
                }
                
    
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
        









        return(
            <div className="container ">
            <br/><br/><br/><br/>
            <div className="row">
                <div className="col"></div>
                <div className="col-10 mycss">
                    <div className="alert alert-primary" role="alert">
                        <center>This User Information, You Can Edit :</center>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <br/>
            <div className="row">
                <div className="col"></div>
                <div className="col-10 mycss">
                    <table>    
                    <tr>
                            <td>
                                <label htmlFor="name">
                                    User Name :
                                </label>
                            </td>
                            <td>
                                 <input  placeholder={posts.name} onChange={(e)=>{setName(e.target.value)}}  className="form-control"  onChangeInput type="text" name="name"  />
                            </td>
                        </tr> 
                        <br/>
                    <tr>
                            <td>
                                <label htmlFor="email">
                                    Email :
                                </label>
                            </td>
                            <td>
                                 <input  placeholder={posts.email}  onChange={(e)=>{setEmail(e.target.value)}}   className="form-control" onChangeInput type="text" name="email" />
                            </td>
                        </tr>  
                        <br/>                                
                        <tr>
                            <td>
                                <label htmlFor="password">
                                    Password :
                                </label>
                            </td>
                            <td>
                                 <input placeholder={posts.password_clear}  onChange={(e)=>{setPassword(e.target.value)}}    className="form-control"   onChangeInput type="text" name="password"/>
                            </td>
                        </tr>
                        <br/>
                        <br/>
                        <tr>
                            <td>  
                                <center>
                                    <Link className= "btn btn-danger k" to="/user_management">
                                        <center>
                                            Back The List
                                        </center> 
                                    </Link>
                                </center>        
                            </td>
                            <td>
                                <center>
                                      <button  onClick={updateSubmit} className="form-control btn btn-success k">
                                          <center>
                                              Edit Password
                                          </center>
                                      </button>
                                </center>
                            </td>
                        </tr>
                    </table> 
                </div>
                <div className="col"></div>
            </div>
        </div>
        )
    
}
export default EditUser