//lưu localStorage value là obj hay list obj
const saveLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
//lấy localStorage
const getLocal = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//xoá LocalStorage
const removeLocal = (key) => {
  localStorage.removeItem(key);
};

export { saveLocal, getLocal, removeLocal };
