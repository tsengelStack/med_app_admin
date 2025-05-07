import  { useContext, useEffect, useState } from 'react'

import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>Эмчийн тухай:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>
                    Уулзалтын төлбөр: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className='flex gap-2 py-2'>
                        <p>Хаяг:</p>
                        <p className='text-sm'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="">Боломжтой</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Хадгалах</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Засах</button>
                    }

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile


// import  { useContext, useEffect, useState } from 'react'
// import  { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import { assets } from '../../assets/assets'


// const DoctorProfile = () => {

//     const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
//     const { currency, backendUrl } = useContext(AppContext)
//     const [isEdit, setIsEdit] = useState(false)
//     const [image, setImage] = useState(false)

//     const updateProfile = async () => {

//         try {

//             const formData = new FormData();

//         // Append image if it's changed
//         if (image) {
//             formData.append('image', image);
//         }

//         // Append other profile data
//         formData.append('address', JSON.stringify(profileData.address));
//         formData.append('fees', profileData.fees);
//         formData.append('about', profileData.about);
//         formData.append('available', profileData.available);

            

//             const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', formData, { headers: { dToken } })

//             if (data.success) {
//                 toast.success(data.message)
//                 setIsEdit(false)
//                 setImage(false)  //added
//                 getProfileData()
//             } else {
//                 toast.error(data.message)
//             }

//             setIsEdit(false)
//             setImage(false)  //added

//         } catch (error) {
//             toast.error(error.message)
//             console.log(error)
//         }

//     }

//     useEffect(() => {
//         if (dToken) {
//             getProfileData()
//         }
//     }, [dToken])

//     return profileData && (
//         <div>
//             <div className='flex flex-col gap-4 m-5'>
//                 <div>
//                     {/* <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" /> */}
//                     {isEdit
//                                     ? <label htmlFor='image' >
//                                         <div className='inline-block relative cursor-pointer'>
//                                             <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : profileData.image} alt="" />
//                                             <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//                                         </div>
//                                         <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//                                     </label>
//                                     : <img className='w-36 rounded' src={profileData.image} alt="" />
//                                 }
//                 </div>

//                 <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

//                     {/* ----- Doc Info : name, degree, experience ----- */}

//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{profileData.degree} - {profileData.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//                     </div>

//                     {/* ----- Doc About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>Эмчийн тухай:</p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//                             {
//                                 isEdit
//                                     ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={3} value={profileData.about} />
//                                     : profileData.about
//                             }
//                         </p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>
//                         Уулзалтын төлбөр: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//                     </p>

//                     <div className='flex gap-2 py-2'>
//                         <p>Хаяг:</p>
//                         <p className='text-sm'>
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
//                             <br />
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//                         </p>
//                     </div>

//                     <div className='flex gap-1 pt-2'>
//                         <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
//                         <label htmlFor="">Боломжтой</label>
//                     </div>

//                     {
//                         isEdit
//                             ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Хадгалах</button>
//                             : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Засах</button>
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorProfile



