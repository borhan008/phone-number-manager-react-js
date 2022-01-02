import React, { useEffect, useState } from 'react';
import {UseAuth} from './usercontext'
import {Link} from 'react-router-dom';
 function Login() {
    const {LogIn, loading} = UseAuth();
    const [regLoading, setRegLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [btnDisable, setBtnDisable] = useState(false);
    useEffect(() => {
        document.title =  "Login | Phone Number Manager" ;
    },[]);
    const onHandleSubmit = async(e) => {
        e.preventDefault();
        setBtnDisable(true);
        setRegLoading(true);
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email || !password || password.length < 6){
            setError("Please fill all the fields. And Password should be at least 6 character.");
        }
        else if(reg.test(email) === false){
            setError("Please enter a valid email address.");
        }else{
            setError('');
            try{
               await LogIn(email, password);
                setSuccess('Login complete.');
                //window.location.reload();
            }catch(err){
                setError("Email and Password didn't match.");
            }

        }
        setRegLoading(false);
        setBtnDisable(false);

    }
    return (
        <div>
            {
                regLoading ? (
                    <div className='text-center'>Loading..</div>
                ) : (
 
                    <form className='my-2'>
                     {
                      error ? (
                        <div className='bg-red-300 text-left text-white  max-w-xs p-3 w-full mx-auto my-3'>
                            {error}
                        </div>                            
                      ) : (
                        success ? (
                            <div className='bg-green-300 text-left text-white  max-w-xs p-3 w-full mx-auto my-3'>
                                {success}
                            </div>
                        ) : (
                            ''
                        )
                      )
                    }
                    <input type="text" name="email" className="border-2 p-2 rounded-md outline-none my-3 block mx-auto w-full max-w-xs  text-left" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" name="password" className="border-2 p-2 rounded-md outline-none my-3 block mx-auto w-full max-w-xs  text-left" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" onClick={onHandleSubmit} className="bg-gray-300 px-8 p-2 text-center hover:bg-gray-400 w-full max-w-xs" value="Add"  disabled={btnDisable} />
                    <Link to="/register" className='block my-2'>Register</Link>
                    </form>
                )
            }

        </div>
    );
}

export default Login;