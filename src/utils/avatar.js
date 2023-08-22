export function getAvatarData (avatarData, key, id) {
  return avatarData[key].find((i) => i.id === id)
}

export function getTypeFromAvatarData (avatarData, key, avatarId) {
  const avatar = avatarData[key].find((i) => i.id === avatarId)
  return avatar ? avatar.name : null
}

export function getGearData (gearData, gear) {
  return Array.isArray(gear)
    ? gear.map((id) => gearData.find((i) => i.id === id))
    : gearData.find((i) => i.id === gear)
}
