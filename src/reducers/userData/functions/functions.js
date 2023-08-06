/* eslint-disable */

import { getAvatarData } from "utils/avatar";

import { updateUser } from "utils/user";

function editData(state, { userName, field, newVal }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  user.data[field] = newVal;
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function editAdmin(state, { userName, field, newVal }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  user.admin[field] = newVal;
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function changeAvatar(state, { userName, changeBy }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  const avatarLength = state.avatarData.full.length;
  const currentAvatar = user.avatar;
  if (currentAvatar + changeBy < 1) user.avatar = avatarLength;
  else if (currentAvatar + changeBy > avatarLength) user.avatar = 1;
  else user.avatar = user.avatar + changeBy;
  user.data.type = getAvatarData(
    stateCopy.avatarData,
    "full",
    user.avatar
  ).name;
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

// increase xp and gold by amount
function gainXP(state, { userName, amount }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  const prevXP = user.data.xp;
  user.data.gold = parseInt(user.data.gold) + parseInt(amount);
  user.data.xp = parseInt(user.data.xp) + parseInt(amount);;
  user.data.level = gainLevel(user, prevXP, user.data.xp);
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

// save last state
function saveLastState(state, { userName, prevData }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  if (user.admin.prevData.includes(prevData.key)) user['admin']['prevData'][key] = prevData;
  else user.admin.prevData = user.admin.prevData.concat(prevData);
  user.admin.lastUpdated = new Date();
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function undo(state, { userName, key, admin = false }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );

  const type = admin ? 'admin' : 'data';
  user[type][key] = user.admin.prevData.value
  user.admin.prevData = user.admin.prevData.filter(i => i.key !== key)

  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function gainLevel(user, prevXP, newXP) {
  // each time the users xp doubles, it grows a level
  return user.data.level > 0 && prevXP * 2 === newXP
    ? user.data.level + 1
    : user.data.level;
}

export default {
  editData,
  editAdmin,
  changeAvatar,
  gainXP,
  saveLastState,
  undo
};
