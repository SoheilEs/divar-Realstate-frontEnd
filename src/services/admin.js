import api from "../configs/api";

const addCategory = (data) => {
  return api.post("category", data);
};
const listCategory = () => {
  return api.get("category");
};
const deleteCategory = (id) => {
  return api.delete(`category/${id}`);
};
const categoryDetail = (id) => {
  return api.get(`category/${id}`);
};
const listOptionByCategoryId = (id) => {
  return api.get(`/options/by-category/${id}`);
};
const addOptions = (data) => {
  return api.post("/options", data);
};
const deleteOptionById = (id) =>{
  return api.delete(`/options/${id}`)
}

export {
  addCategory,
  listCategory,
  deleteCategory,
  categoryDetail,
  addOptions,
  listOptionByCategoryId,
  deleteOptionById
};
