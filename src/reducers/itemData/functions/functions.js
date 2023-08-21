/* eslint-disable */

import { updateUser } from "utils/user";

function buyItem(state, { userName, item }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  user.data.gold = user.data.gold - item.cost;
  user.data.inventory = [...user.data.inventory, item.id];
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function equipItem(state, { userName, item }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  user.gear[item.data.location] = item.data.id;
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

function unequipItem(state, { userName, item }) {
  const stateCopy = { ...state };
  const user = stateCopy.userData.find(
    (i) => i.admin.userName.toLowerCase() === userName.toLowerCase()
  );
  if (user.gear[item?.location] !== undefined) user.gear[item?.location] = "";
  stateCopy.userData = updateUser(stateCopy, userName, user);
  return stateCopy;
}

export default {
  buyItem,
  equipItem,
  unequipItem,
};
