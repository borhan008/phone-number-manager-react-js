import { collection, orderBy, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { UseAuth } from './usercontext';
import {Link} from 'react-router-dom';
function Home() {
    const [data, setData] = useState('');
    const [filterText, setFilterText] = useState('');
    const {currentUser} = UseAuth();
 
    useEffect(() => {
        document.title = "Phone Number Manager  | " + currentUser.displayName ;

        function getData(){
           const q = query(collection(db, 'users', currentUser.uid , 'phonebooks'), orderBy('name', 'asc'));
           onSnapshot(q, (snapshot) => {
               
                setData(snapshot.docs.map((doc) => ({
                    'id' : doc.id,
                    'data' : doc.data()
                })));    
           });
        }
        getData();
    }, []);

    async function deletePhone(phone_id, name){
        if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
            await deleteDoc(doc(db, 'users', currentUser.uid, 'phonebooks',phone_id));
        }        
    }

    return ( 
        <div className='my-4'>
                <h2 className='text-black font-light text-md block '>Welcome to PhoneManage</h2>
            <div className='my-5 block w-full'>
                <div>
                    <input type="text" placeholder='Search' name="search" value={filterText} onChange={(e) => setFilterText(e.target.value)} className='border border-gray-300 p-1 max-w-xs w-full'/>
                </div>
                {
                    data ?  (
                        <div>
                            
                    { 
                    data.filter(filtering => {
                        return  ( filtering.data.name.toLowerCase().indexOf(filterText.toLowerCase()) & filtering.data.phone.toLowerCase().indexOf(filterText.toLowerCase())   ) >= 0
                    })
                    .map((single_phone) => (
                           <div key={single_phone.id} className='overflow-hidden text-left max-w-xs mx-auto my-5 shadow p-2 border border-gray-400'>
                               <h4>{single_phone.data.name}</h4>
                               <span>{single_phone.data.phone}</span>
                               <div className='flex float-right space-x-4'>
                               <Link to='/view'
                                    state = {{
                                        'phone_id' : single_phone.id,
                                        'name' : single_phone.data.name,
                                        'phone' : single_phone.data.phone
                                    }}
                                    className='block w-8 float-right text-right text-gray-300'>Edit</Link>
                                 <a  className='block text-right text-gray-300'
                                  href="#"
                                   onClick={() => deletePhone(single_phone.id, single_phone.data.name)}>Delete</a> 
                                  </div>   
                             
                           </div>    
                        ))
                    }
                          </div>  
                    ) : (
                        <div>No data</div>
                    )
                }
            </div>
        </div>
     );
}

export default Home;