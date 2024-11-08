import axios from "../../config/axios.customize";

const getBlog = () => {
  return axios.get(`/api/blog/get-all-blogs`);
};

const createBlog = (data) => {
  return axios.post(`/api/blog/create-blog`, data);
};

const updateBlog = (id, data) => {
  return axios.put(`/api/blog/get-blog-by-id/${id}`, data);
};

const deleteBlog = (id) => {
  return axios.delete(`/api/blog/delete-blog-by-id/${id}`);
};

export { getBlog, createBlog, updateBlog, deleteBlog };
