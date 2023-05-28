import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Sign_up = (props) => {
  let navigate =useNavigate();
  const [creditionals, setcreditionals] = useState({name:"", email : "",password: "",cpassword:""})
  const handleSubmit =async(e)=>{
    e.preventDefault();
     //Api Call
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          
      },
      body: JSON.stringify({name:creditionals.name ,email: creditionals.email,password: creditionals.password}),
    });
    
    const json =await response.json();
    console.log(json);

    if(json.success){
              //save the auth token and redirect
              localStorage.setItem(json.success , 'token',json.authotoken)
              navigate('/');
              props.showAlert("Successfully Created account","success")
    }
    else
    {
      props.showAlert("Already user exists","danger")
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
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" required min={5}  name='name' value={creditionals
                    .name} aria-describedby="emailHelp"  onChange={onChange}/>
                 
              </div>
              <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email"  name='email' required min={5}  value={creditionals
                  .email} aria-describedby="emailHelp"  onChange={onChange}/>
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" name='password' class="form-control" id="password" required min={5}  value={creditionals.password}  onChange={onChange}/>
              </div>

              <div class="mb-3">
                  <label for="cpassword" class="form-label">Corfirm Password</label>
                  <input type="password" name='cpassword' class="form-control" id="cpassword" required min={5}  value={creditionals.cpassword}  onChange={onChange}/>
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      </div>
  )
}

export default Sign_up
