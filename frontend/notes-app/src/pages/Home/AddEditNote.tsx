import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'

const AddEditNote = ({ noteData, type, getAllNotes, onClose, showToastMsg }) => {
    const [title, setTitle] = useState(noteData ? noteData.title : "")
    const [content, setContent] = useState(noteData ? noteData.content : "")
    const [tags, setTags] = useState(noteData ? noteData.tags : [])

    const [error, setError] =  useState<string | null>(null);

    //Add a Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            })

            if(response.data && response.data.note){
                showToastMsg("Note added successfully")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }

    //Edit existing note
    const editNote = async () => {
        try {
            const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
                title,
                content,
                tags,
            })

            if(response.data && response.data.note){
                showToastMsg("Note updated successfully")
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
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
            <button className='w-5 h-5 lg:w-10 lg:h-10 roounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
                <MdClose className='text-md lg:text-xl text-slate-400'/>
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
        
            <button className='btn-primary font-medium mt-3 p-3' onClick={handleAddNote}>
                {type === 'edit'? 'Update' : 'Add'}
            </button>
        </div>
    )
}

export default AddEditNote