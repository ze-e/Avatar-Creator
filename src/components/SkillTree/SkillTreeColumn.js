import React from 'react'
import LevelNode from './SkillTreeNode'
import PropTypes from 'prop-types'

export default function SkillTreeColumn ({ quests }) {
  return (
    <div className="skillTreeColumn">
      {quests.length > 0 &&
        quests.map((quest, index) => {
          return (
            <div key={quest.id}>
              <LevelNode item={quest} index={index} />
            </div>
          )
        })}
    </div>
  )
}

SkillTreeColumn.propTypes = {
  quests: PropTypes.array
}
