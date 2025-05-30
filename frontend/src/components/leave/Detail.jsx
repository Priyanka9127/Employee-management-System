import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const Detail = () => {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {

          try {
            const response = await axios.get(`http://backems-production.up.railway.app/api/leave/detail/${id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            });


            if(response.data.success) {
                setLeave(response.data.leave)

            }
          }catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
        }

        };
        fetchLeave();
      }, [id]) // Added 'id' to the dependency array


      const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`http://backems-production.up.railway.app/api/leave/${id}`, {status}, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
            });


            if(response.data.success) {
                navigate("/admin-dashboard/leaves")

            }
          }catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
        }
      }

 return (
    <>{leave ? (
    <div className='max-w-5xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
    <h3 className='text-2xl font-extrabold mb-8 text-center text-red-600 border-b-2 border-red-200 pb-4'>Leave Details</h3>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='md:col-span-1 flex justify-center'>
            <img
                src={`http://backems-production.up.railway.app/${leave.employeeId.userId.profileImage}`}
                alt="profile"
                className="rounded-full w-64 h-64 object-cover border-4 border-red-600 shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
        </div>

        <div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Name:</p>
                <p className='font-medium'>{leave.employeeId.userId.name}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Employee ID:</p>
                <p className='font-medium'>{leave.employeeId.employeeId}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Leave Type:</p>
                <p className='font-medium'>
                    {leave.leaveType}
                    </p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold '>Reason:</p>
                <p className='font-medium'>{leave.reason}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Department:</p>
                <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Start Date:</p>
                <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>End Date:</p>
                <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
            </div>
            <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>
                    {leave.status === "Pending" ? "Action" : "Status:"}
                    </p>
                    {leave.status === "Pending" ? (
                        <div className='flex space-x-2'>
                            <button className='font-semibold text-white px-2 py-0.5 bg-teal-500 hover:bg-teal-600 rounded mx-2'
                            onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                            <button className='font-semibold text-white px-2 py-0.5 bg-red-500 hover:bg-red-600 rounded mx-2'
                            onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                        </div>
                    ) :
                    <p className='font-medium'>{leave.status}</p>
                }
                
            </div>

        </div>

    </div>
    </div>
    ): <div>Loading ....</div>}</>
 )
}

export default Detail;