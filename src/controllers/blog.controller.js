import blogService from "../services/blog.service.js";

const postBlog = async (req, res) => {
  try {
    const blog = await blogService.postBlog(req.body, req.user._id, req.file);
    res.json(blog);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default { getBlogs, postBlog };
