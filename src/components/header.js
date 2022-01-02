import React from 'react';
import {  Link } from "react-router-dom";
import { UseAuth } from './usercontext';
const Header = () => {
    const {currentUser, LogOut} = UseAuth();
    return(
        currentUser ? (
        <div>
           <div className='bg-slate-200'>
               <div className='bg-slate-500 w-full text-cyan-50 p-5'>
                    PhoneNumberManager of <br/>
                    <strong>{currentUser.displayName}</strong>
               </div>

               <div className='flex-auto p-5'>
                    <ul className='flex text-center justify-center'>
                        <li className='px-2'><Link to="/">Home</Link></li>
                        <li className='px-2'><Link to="/add">Add</Link></li>
                        <li className='px-2'><Link onClick={LogOut} to="" >Logout</Link></li>
                    </ul>
               </div>               
           </div>
           </div>
           ) : (
                <div>
            <div className='bg-slate-200'>
                <div className='bg-slate-500 w-full text-cyan-50 p-5'>
                PhoneNumberManager
                </div>

                <div className='flex-auto p-5'>
                        <ul className='flex text-center justify-center'>
                            <li className='px-2'><Link to="/login">Login</Link></li>
                            <li className='px-2'><Link to="/register">Register</Link></li>
                        </ul>
                </div>               
            </div>
            </div>              
           )
        
    )
}
export default Header;
