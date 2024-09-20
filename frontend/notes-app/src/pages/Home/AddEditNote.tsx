import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'

const AddEditNote = ({ noteData, type, onClose }) => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])

    const [error, setError] =  useState<string | null>(null);

    //Add a Note
    const addNewNote = () => {

    }

    //Edit existing note
    const editNote = () => {
        
    }

    const handleAddNote = () => {
        if(!title){
            setError("Please enter a title")
            return;
        }

        if(!content){
            setError("Please enter the content")
            return;
        }

        setError("")

        if(type === 'edit'){
            editNote()
        } else {
            addNewNote()
        }
    }
  return (
    <div className='relative'>
        <button className='w-10 h-10 roounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className='text-xl text-slate-400'/>
        </button>
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="input-label">Title</label>
            <input 
                type='text'
                className='text-Zxl text-slate-950 outline-none'
                placeholder='Ex: Go to the gym'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="" className="input-label">Content</label>
            <textarea
                className='text-Zxl text-slate-950 outline-none bg-slate-100 p-5'
                placeholder='Content'
                rows={10}
                 value={content}
                onChange={({target}) => setContent(target.value)}
            />
        </div>

        <div className="mt-3">
            <label className="input-label">Tags</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className='text-xs text-red-500 pt-4'>{error}</p>}
   
        <button className='btn-primary font-medium mt-3 p-3' onClick={handleAddNote}>Add</button>
    </div>
  )
}

export default AddEditNote