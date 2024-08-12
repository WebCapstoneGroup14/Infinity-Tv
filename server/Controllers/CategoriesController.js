import expressAsyncHandler from "express-async-handler";
import Categories from "../Models/CategoriesModels.js";

//Gets All Categories
const getCategories = expressAsyncHandler(async (req, res) => {
  try {
    // find all categories in the database
    const categories = await Categories.find({});
    // send the categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//// Creates New Category
const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    // get category title from the request body
    const { title } = req.body;
    // create new category
    const category = new Categories({
      title: title,
    });
    // save the category in the database
    const createdCategory = await category.save();
    // send the category to the client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update Category
const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    // get category id from the request params
    const category = await Categories.findById(req.params.id);
    // if the category found update it
    if (category) {
      category.title = req.body.title || category.title;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete Category

const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    // find the category by id
    const category = await Categories.findById(req.params.id);
    // if the category found delete it
    if (category) {
      await category.deleteOne();
      res.status(200).json({ message: "Category removed" });
    }
    // else send error message to the client
    else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
