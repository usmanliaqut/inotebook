import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
   let navigate =useNavigate();
    const [creditionals, setcreditionals] = useState({email : "",password: ""})
    const handleSubmit =async(e)=>{
      e.preventDefault();
       //Api Call
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            
        },
        body: JSON.stringify({email: creditionals.email,password: creditionals.password}),
      });
      
      const json =await response.json();
      console.log(json);

      if(json.success){
                //save the auth token and redirect
                localStorage.setItem('token',json.authotoken)
                navigate('/');
                props.showAlert("Successfully loged in","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
    }

    const onChange =(e)=>
    {
        setcreditionals({...creditionals, [e.target.name]: e.target.value})  
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email"  name='email' value={creditionals
                    .email} aria-describedby="emailHelp"  onChange={onChange}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name='password' class="form-control" id="password" value={creditionals.password}  onChange={onChange}/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
