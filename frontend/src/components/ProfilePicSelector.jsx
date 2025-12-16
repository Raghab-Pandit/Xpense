import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePicSelector = ({ image, setImage}) => {

    const inputref= useRef(null);
    const [previewURL, setPreviewURL]= useState(null);

    const handleImageChange=(event)=>{
        const file = event.target.files[0];
        if(file){
          // set image
          setImage(file)

          //generate preview URL from image file
          const preview= URL.createObjectURL(file);
          setPreviewURL(preview)
        }
    }

    const handleImageRemover= (event)=>{
      setImage(null);
      setPreviewURL(null);

      if(inputref.current){
        inputref.current.value= null
      }
    }

    const chooseImgFile= ()=>{
      inputref.current.click()
    }

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        accept='image/*'
        ref={inputref}
        onChange={handleImageChange}
        className='hidden'
      />

      {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-200 rounded-full relative'>
          <LuUser className='text-4xl text-primary'/>
          <button
            type='button'
            onClick={chooseImgFile}
            className='w-8 h-8 flex items-center justify-center cursor-pointer bg-primary/80 transition-color duration-400 hover:bg-primary text-white rounded-full absolute -bottom-1 -right-1'
          >
            <LuUpload />
          </button>
        </div>
      ):(
        <div className='relative'>
          <img
            src={previewURL}
            alt='profile pic'
            className='w-20 h-20 rounded-full object-cover'
          />

          <button
            onClick={handleImageRemover}
            className='w-8 h-8 flex items-center justify-center cursor-pointer bg-red-500 transition-color duration-400 hover:bg-red-600 text-white rounded-full absolute -bottom-1 -right-1'
          >
            <LuTrash/>
          </button>
        </div>
      )}

    </div>
  )
}

export default ProfilePicSelector