import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { DataContext } from 'contexts/DataContext'

import SkillListLevel from './SkillListLevel'
export default function SkillList ({ teacherView }) {
  const { state } = useContext(DataContext)

  const levels = state.data.levels

  return (
    <div className="skillList">
      <div className="skillList__levels">
        {levels.length > 0 &&
          levels.map((level, index) => {
            return (
              <SkillListLevel
                key={level.id}
                index={index}
                level={level}
                teacherView={teacherView}
              />
            )
          })}
      </div>
    </div>
  )
}

SkillList.propTypes = {
  teacherView: PropTypes.bool
}
