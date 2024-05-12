import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserById, fetchUsers } from '../features/user/UserSlice';
import AddUser from './AddUser';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    const users = useSelector((state) => state.user.users);

    const status = useSelector((state) => state.user.status)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const deleteButtonFunction = async (e, id) => {

        e.preventDefault();

        const response = fetch(USER_BASE_URL + "/" + id, {

            method: "DELETE",
            
        }).then((response) => {

            dispatch(deleteUserById(id));

        })

    }

    const editButtonFunction = (e, id) => {

        e.preventDefault();

        navigate(`/updateuser/${id}`);

    }

    useEffect(() => {

        dispatch(fetchUsers());

    }, []);

    return (

        <div className="w-full flex my-10">

            <div className="mx-20 w-full">

            {status == 'loading' && (

                    <h1> Getting Information From API</h1>

            )}

            {status == 'error' && (

                <h1> Sorry API Not working Properly </h1>

            )}

            {status == 'completed' && (

                <>

                <AddUser />

                <table
                    className='w-full bg-gray-800 h-auto rounded-t-xl'
                >

                    <thead>

                        <tr
                            className='text-left h-20 font-mono text-lg text-white'
                        >

                            <th
                                className='px-10'
                            > First Name </th>
                            <th
                                className='px-10'
                            > Last Name </th>
                            <th
                                className='px-10'
                            > Email </th>
                            <th
                                className='px-10 text-center'
                            > Actions </th>

                        </tr>

                    </thead>

                    <tbody>

                {users.map((user) => (


                        <tr
                            key={user.id}
                            className='text-left h-20 font-mono text-[20px] text-black bg-white shadow-2xl'
                        >

                            <td
                                className='px-10'
                            > {user.firstName} </td>
                            <td
                                className='px-10'
                            > {user.lastName} </td>
                            <td
                                className='px-10'
                            > {user.email} </td>
                            <td
                                className='px-10 text-center'
                            > 
                            
                                <input 
                                    className='px-3 py-1 bg-green-500 rounded-xl text-black hover:bg-green-500 mx-5 cursor-pointer'
                                    type='submit'
                                    value={'Edit'}
                                    onClick={(e, id) => editButtonFunction(e, user.id)}
                                />

                                <input 

                                    className='px-3 py-1 bg-red-500 rounded-xl text-black hover:bg-red-500 cursor-pointer'
                                    type='submit'
                                    value={'Delete'}
                                    onClick={(e, id) => deleteButtonFunction(e, user.id)}
                                />

                            </td>

                        </tr>


                ))}

                    </tbody>

                </table>

                </>

                )}

            </div>

            <div className="">

                Resolving the API's

            </div>

        </div>

    )

}

export default EmployeeList