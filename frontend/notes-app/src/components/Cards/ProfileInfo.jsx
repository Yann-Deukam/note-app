import React from 'react'
import { getInitials } from '../../utils/helper'

// const ProfileInfo = ({ userInfo, onLogout }) => {
//   return (
//     <div className='flex items-center gap-3'>
//         <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
//             {getInitials(userInfo.fullName)}
//         </div>
//         <div>
//             <p className="text-sm font-medium">
//                {userInfo.fullName}
//             </p>
//             <button onClick={onLogout} className='text-sm text-slate-700 hover:underline transition-all'>
//                 Logout
//             </button>
//         </div>
//     </div>
//   )
// }

// export default ProfileInfo
const ProfileInfo = ({ userInfo, onLogout }) => {
    if (!userInfo) {
    return ;
  }
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm lg:text-sm ml-3'>
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium hidden lg:block">
          {userInfo.fullName}
        </p>
        <button onClick={onLogout} className='text-xs lg:text-sm text-slate-700 hover:underline transition-all'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;