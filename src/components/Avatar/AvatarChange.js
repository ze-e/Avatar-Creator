import React, { useContext, useState } from 'react'
import EditButton from 'components/EditButton/EditButton'
import { UserContext } from 'contexts/UserContext'
import { DataContext } from 'contexts/DataContext'
import { UserApi } from 'api'
import { avatarData } from 'data/sampleData'
import { capitalize } from 'utils/string'
import { getTypeFromAvatarData } from 'utils/avatar'

export default function AvatarChange () {
  const { user, reloadUser } = useContext(UserContext)
  const { state } = useContext(DataContext)
  const [selectedOption, setSelectedOption] = useState(user?.data.avatar)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  async function changeAvatar (changeTo) {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      const newInt = parseInt(changeTo)
      const newVals = { newVals: [{ key: 'avatar', value: newInt }, { key: 'type', value: getTypeFromAvatarData(state.avatarData, 'full', newInt) }] }
      await UserApi.editUser(token, user._id, newVals)
      reloadUser()
    }
  }

  return (
    <div className="m-flex">
      <h4>Class&nbsp;:</h4>
      <EditButton
        beforeEdit={<p> &nbsp; {user.data.type} &nbsp;</p>}
        afterEdit={
          <div className="m-flex">
            <select
              id="picklist"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {avatarData?.full?.map((a) => (
                <option key={a.id} value={a.id}>
                  {capitalize(a.name)}
                </option>
              ))}
            </select>
          </div>
        }
        handleSubmit={() => changeAvatar(selectedOption)}
      />
    </div>
  )
}
