import React, { useContext, useState } from 'react'
import EditButton from 'components/EditButton/EditButton'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'

import { avatarData } from 'data/sampleData'
import { capitalize } from 'utils/string'

export default function AvatarChange () {
  const { dispatch, ACTIONS } = useContext(DataContext)
  const { user, reloadUser } = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState(user?.avatar)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  function changeAvatar (changeTo) {
    const newInt = parseInt(changeTo)
    dispatch({
      type: ACTIONS.CHANGE_AVATAR,
      payload: { userName: user.admin.userName, changeTo: newInt }
    })
    reloadUser()
  }

  return (
    <div className="m-flex">
      <h4>Change Class:</h4>
      <EditButton
        beforeEdit={
          <p>{user.data.type}</p>
        }
        afterEdit={
          <div className='m-flex'>
            <select id="picklist" value={selectedOption} onChange={handleOptionChange}>
              {avatarData?.full?.map(a => <option key={a.id} value={a.id}>{capitalize(a.name)}</option>)}
            </select>
          </div>
        }
        handleSubmit={() => changeAvatar(selectedOption)}
      />
    </div>
  )
}
