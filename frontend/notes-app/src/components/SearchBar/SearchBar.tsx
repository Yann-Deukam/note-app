import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-sm">
        <input type="text" placeholder='search notes' value={value} className="w-full text-xs bg-transparent py-[11px] outline-none"  onChange={onChange}/>

        {value && (
            <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-slate-700 mr-3 transition-all' onClick={onClearSearch} />
        )}
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-slate-700 transition-all' onClick={handleSearch} />
    </div>
  )
}

export default SearchBar