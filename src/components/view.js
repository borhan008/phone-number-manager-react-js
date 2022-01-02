import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {UseAuth} from './usercontext';
import { db } from '../firebase';
function View() {
    const location = useLocation();
    const {phone_id, name, phone} = location.state;
    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [editLoading, setEditLoading] = useState(false);
    const [btnDisable, setbtnDisable] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState();
    const {currentUser} = UseAuth();

    useEffect(() => {
        document.title = "Edit "+ name + " | Phone Number Manager  | " + currentUser.displayName ;

      if(!phone_id || !name || !phone){
        setEditLoading(true);
      }
         
    }, []);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        setbtnDisable(true);
        setEditLoading(true);
        if(!newName || !newPhone){
          setError('Empty!');
        }else{
            setError('');
            try{
                setDoc(doc(db, 'users', currentUser.uid, 'phonebooks', phone_id), {
                    'name' : newName,
                    'phone' : newPhone
                });
                setSuccess(`Updated. Name : ${newName} and Phone : ${newPhone}`);

            }catch(err){
                setError('Something went wrong. ' + err);
            }
            
        }
        setEditLoading(false);
        setbtnDisable(false);
    }

    return ( 
        
        <div  className='max-w-xs mx-auto my-3'>
            {
                editLoading  ? (
                    <div className='text-center'>Loading..</div>
                ) : (
                    <div>
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
                       <form className={success ? 'hidden' : ''}>
                            <input type="text" 
                            placeholder='Name' 
                            name="Name" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                            className='border border-gray-300 p-1 max-w-xs w-full my-2'/>
                           
                           <input type="text" 
                            placeholder='Phone' 
                            name="phone" 
                            value={newPhone} 
                            onChange={(e) => setNewPhone(e.target.value)} 
                            className='border border-gray-300 p-1 max-w-xs w-full my-2'/>     

                            <input type="submit"
                             onClick={onHandleSubmit} 
                             className="bg-gray-300 px-8 p-2 text-center hover:bg-gray-400 w-full max-w-xs  my-2" value="Add"  
                             disabled={btnDisable} />
                                              
                       </form>
                    </div>
                )
            }
        </div>
    );
}

export default View;