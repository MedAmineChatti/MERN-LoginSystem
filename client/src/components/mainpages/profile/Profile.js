import axios from 'axios'
import {Link} from 'react-router-dom'
import React, {useState, useEffect, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import {isLength, isMatch,isEmpty} from '../utils/validation/Validation'

function Profile() {
    
    const state = useContext(GlobalState)
    const [token] = state.token
    const [posts, setPosts] =  useState([])


    useEffect(() => {
        if (token){
            const getPosts = async() =>{
               const res = await  
               axios.get('/user/infor', {
               headers: {Authorization: token}
              })
           setPosts(res.data)
           console.log(res.data)
            } 
            getPosts()
        }
    },[token, setPosts])

 

    const [user, setUser] = useState({
        password: "", cf_password: ""
    })
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }




    const updateSubmit = async e =>{
        
 
        try {
            if (isEmpty(user.password)){
                return alert("The password is empty.");
            }

            if (isEmpty(user.cf_password)){
                return alert("Confirm password is empty.");
            }
            
            if(isLength(user.password)){
                return alert("Password must be at least 6 characters.");
            }
            if(isLength(user.cf_password)){
                return alert("Password Confirm  must be at least 6 characters.");
            }
      
            if(!isMatch(user.password, user.cf_password)){
                return alert("Password did not match.");
            }
          
            const res =  await axios.put('/user/update_user',{...user} ,{  
                headers: {Authorization: token}
            });

            console.log(user);

            alert(res.data.msg);

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    





    
    return (
        <div className="container ">
            <br/><br/>
            <div className="row">
                <div className="col"></div>
                <div className="col-10 mycss">
                    <div className="alert alert-primary" role="alert">
                        <center>This Your Profile Information, You Can Edit Password :</center>
                    </div>
                </div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-10 mycss">
                    <table>                
                    <tr>
                            <td>
                                <label htmlFor="name">
                                    Name :
                                </label>
                            </td>
                            <td>
                                {posts.name}
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
                                {posts.email}
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td>
                                <label htmlFor="name">
                                    Created At:
                                </label>
                            </td>
                            <td>
                                {posts.register_date}
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
                                 <input   onChange={onChangeInput}   className="form-control" type="text" name="password" placeholder= "New Password" />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td>
                                <label htmlFor="cf_password">
                                    Confirm Password : &nbsp;
                                </label>
                            </td>
                            <td>
                                <input   onChange={onChangeInput}  className="form-control" type="text" name="cf_password" id="cf_password" placeholder= "Confirm Your New Password" />
                            </td>
                        </tr>
                        <br/>
                        <br/>
                        <tr>
                            <td>
                                <center>
                                    <Link className= "btn k" to="/">
                                        <center>
                                            Back To Home
                                        </center> 
                                    </Link>
                                </center>          
                               
                            </td>
                            <td>
                                <center>
                                     <button   onClick={updateSubmit} className="form-control btn k">
                                         <center>Edit Password</center>
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
export default Profile