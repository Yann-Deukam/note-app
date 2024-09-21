import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from './AddEditNote'
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/Cards/EmptyCard'
import AddNoteImg from "../../assets/images/Notes-amico.svg"
import NoDataImg from "../../assets/images/No-data.svg"

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
     isShow: false,
      type: "add",
      data: null,
  })

  const [showToastMessage, setShowToastMessage] = useState({
     isShow: false,
      message: "",
      type:"add"
  })
  const [ allNotes, setAllNotes ] = useState([])
  const [ userInfo, setUserInfo ] = useState(null)
  const [ theSearch, setTheSearch ] = useState(false)


  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShow: true, data: noteDetails, type:"edit" })
  }

  const showToastMsg = ( message,type ) => {
    setShowToastMessage({ 
      isShow:true, 
      message: message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMessage({ 
      isShow:false, 
      message: ""
    })
  }

  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user")
      if(response.data && response.data.user){
        setUserInfo(response.data.user)
      }
    } catch(error) {
      if(error.response.status === 401){
        localStorage.clear();
        setUserInfo(null)
        navigate("/login")
      }
    }
  }

  //get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes/")
      if(response.data && response.data.notes){ 
        setAllNotes(response.data.notes)
      }

    } catch (error) {
      console.log("An unexpected error occurred. Please try again")
    }
  }

  useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => {}
  }, [])
  

  //Delete a note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
          const response = await axiosInstance.delete("/delete-note/"+noteId)

          if(response.data && !response.data.error){
              showToastMsg("Note deleted successfully", "delete")
              getAllNotes();
          }
      } catch (error) {
          if(error.response && error.response.data && error.response.data.message){
             console.log("An unexpected error occurred. Please try again")
          }
      }
  }

  //Search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance("/search-note", {
        params: { query },
      });

      if(response.data && response.data.notes){
        setTheSearch(true);
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateIsPinned = async (noteData) => {
    
    try {
            const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
                isPinned: !noteData.isPinned 
            })

            if(response.data && response.data.note){
                showToastMsg("Note updated successfully")
                getAllNotes();
            }
        } catch (error) {
            console.log(error)
        }
  }

  //handle clear search
  const handleClearSearch = () => {
    setTheSearch(false);
    getAllNotes();
  }

  return (
   <>
    <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
    <div className="container mx-auto">
      {
        allNotes.length > 0 ? (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8'>
        {allNotes.map((item, index) => {
          return(
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {handleEdit(item)}}
              onDelete={() => {deleteNote(item)}}
              onPinNote={() => {updateIsPinned(item)}}
            />
          )
        })}
      </div> ) : (
        <EmptyCard imgSrc={theSearch ? NoDataImg : AddNoteImg} message={theSearch ? "Oups no notes matching your search was found" : "Start adding notes, click on the ADD button to jot down thoughts, ideas and reminders"}/>
      ) 
      }
    </div>

    <button className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-lg lg:rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 transition-all" onClick={() => {
      setOpenAddEditModal({ isShow:true, type: "add", data:null })
    }}>
      <MdAdd className='text-[25px] lg:text-[32px] text-white'/>
    </button>

    <Modal
      isOpen = {openAddEditModal.isShow}
      onRequestClose = {() => setOpenAddEditModal({ isShow: false, type: "add", data: null })}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)"
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-sm mx-auto mt-14 p-5 overflow-scroll"
    >
      <AddEditNote type={openAddEditModal.type} noteData={openAddEditModal.data} onClose={() => {setOpenAddEditModal({isShow:false, type:"add",data: null})}} getAllNotes={getAllNotes} showToastMsg={showToastMsg} />
    </Modal>

    <Toast
      isShow={showToastMessage.isShow}
      message={showToastMessage.message}
      type={showToastMessage.type}
      onClose={handleCloseToast}
    />
   </>
  )
}

export default Home