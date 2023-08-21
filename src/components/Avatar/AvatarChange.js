import React, { useContext, useState } from 'react'
import EditButton from 'components/EditButton/EditButton'
import { UserContext } from 'contexts/UserContext'
import { UserApi } from 'api'
import { avatarData } from 'data/sampleData'
import { capitalize } from 'utils/string'

export default function AvatarChange () {
  const { user, reloadUser } = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState(user?.avatar)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  async function changeAvatar (changeTo) {
    const newInt = parseInt(changeTo)
    await UserApi.editUser(user._id, { key: 'avatar', value: newInt })
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
