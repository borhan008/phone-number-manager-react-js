import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {db} from '../firebase';
import { UseAuth } from './usercontext';
function Add() {
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState(null)
    const [specificMessage, setSpecificMessage] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    const [oldData, setOldData] = useState('');
    const {currentUser} = UseAuth();
    useEffect(() => {
        document.title = "Add Contact | Phone Number Manager";
    }, [])
    const onHandleSubmit = (e) => {
        e.preventDefault();
        setBtnDisable(true);
       if(!name || !phone){
          setSuccessMessage(false);
          setSpecificMessage("EMPTY!");
       }else{
         try{
                setOldData({
                    'name' : name,
                    'phone' : phone
                });

                addDoc(collection(db, 'users', currentUser.uid, 'phonebooks'), {
                'name' : name,
                'phone' : phone
                });
                
                setSuccessMessage(true);

                setName('');
                setPhone('');

                

            } catch(err){
                setSuccessMessage(false);
                setSpecificMessage("Something went wrong.");
            } 
        }
        setBtnDisable(false);

    }


    return ( 
        <div>
            {successMessage ?
                (
                    <div className='bg-green-300 text-left text-white  max-w-xs p-3 w-full mx-auto my-3'>
                        Added Succesfully <br/>
                         {oldData.name} : {oldData.phone}
                    </div>
                ) 
                :
                 (
                    (successMessage===false) ? (   
                    <div className='bg-red-300 text-left text-white  max-w-xs p-3 w-full mx-auto my-3'>
                        Failed :  {specificMessage} <br/>
                       { oldData ? (<div>{oldData.name} : {oldData.phone}</div>): ( ' ') }
                    </div>    
                    ) : (
                        ' '
                    )            
                )
            }
           <input type="text" name="name" className="border-2 p-2 rounded-md outline-none my-3 block r mx-auto w-full max-w-xs text-left" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
           <input type="text" name="phone" className="border-2 p-2 rounded-md outline-none my-3 block mx-auto w-full max-w-xs  text-left" placeholder='Mobile Number'value={phone} onChange={(e) => setPhone(e.target.value)}/>
           <input type="submit" onClick={onHandleSubmit} className="bg-gray-300 px-8 p-2 text-center hover:bg-gray-400 w-full max-w-xs" value="Add" disabled={btnDisable} />

        </div>
     );
}

export default Add;