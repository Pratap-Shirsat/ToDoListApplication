import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  createCategory,
  fetchUserCategories,
  removeCategory,
  updateCategory,
} from "../store/actions/categoryActions";
import { useToDo } from "../context/toDoContext";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

const Category = ({
  token,
  createCategory,
  categories,
  updateCategory,
  removeCategory,
  fetchUserCategories,
}) => {
  const [categoryData, setCategory] = useState({
    colorCode: "",
    categoryName: "",
    categoryDesc: "",
  });
  const [isCategoryIdSet, setCategoryId] = useState(null);
  const { updateAlert } = useToDo();
  const navigator = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigator("/login");
    }
  }, []);

  const onChange = (e) =>
    setCategory({ ...categoryData, [e.target.name]: e.target.value });

  const addCategory = async () => {
    const serverRes = await createCategory({ ...categoryData, token });
    if (serverRes) {
      await fetchUserCategories(token);
      alert("Category added successfully");
      document.getElementById("closeFormBtn").click();
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 9000);
    }
  };

  const submitCategoryForm = (e) => {
    e.preventDefault();
    var catForm = document.getElementById("categoryForm");
    if (!catForm.checkValidity()) {
      // If HTML validation fails, prevent form submission
      catForm.reportValidity();
      return;
    }
    isCategoryIdSet ? editCategory() : addCategory();
  };

  const editCategory = async () => {
    const serverRes = await updateCategory({
      ...categoryData,
      token,
      isCategoryIdSet,
    });
    if (serverRes) {
      await fetchUserCategories(token);
      alert("Category updated successfully");
      document.getElementById("closeFormBtn").click();
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 9000);
    }
  };

  const deleteCategory = async () => {
    const ans = prompt(
      "Are you sure you want to delete this category? All the tasks with this category will also get deleted!. Type 'YES' to continue to delete it... "
    );
    if (ans === "YES") {
      const serverRes = await removeCategory({
        token,
        isCategoryIdSet,
      });
      if (serverRes) {
        await fetchUserCategories(token);
        alert("Category deleted successfully");
        document.getElementById("closeFormBtn").click();
      } else {
        updateAlert(true);
        setTimeout(() => updateAlert(false), 9000);
      }
    }
  };

  const clearEditForm = () => {
    setCategoryId(null);
    setCategory({
      categoryName: "",
      colorCode: "",
      categoryDesc: "",
    });
  };

  const setEditCategoryMode = ({
    categoryId,
    categoryName,
    colorCode,
    desc,
  }) => {
    setCategoryId(categoryId);
    setCategory({
      categoryName,
      colorCode: colorCode,
      categoryDesc: desc,
    });
    document.getElementById("categoryModalBtn").click();
  };
  return (
    <>
      {token && (
        <div className="container p-1">
          <div className="container p-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#categoryFormModal"
              id="categoryModalBtn"
            >
              Add new category
            </button>
          </div>

          <div
            className="container mx-1 my-1"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div
              className="modal fade"
              id="categoryFormModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="categoryFormModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="categoryFormModalLabel"
                    >
                      {isCategoryIdSet ? "Edit Category" : "Add new category"}
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      id="closeFormBtn"
                      onClick={clearEditForm}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row justify-content-center">
                      <div>
                        <form
                          className="row g-3"
                          style={{
                            backgroundColor: "#f0f0f0",
                            borderRadius: "10px",
                          }}
                          id="categoryForm"
                        >
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="inputCategoryName"
                              placeholder="Enter category name here..."
                              onChange={onChange}
                              name="categoryName"
                              value={categoryData.categoryName}
                              required
                            />
                            <label htmlFor="inputCategoryName">
                              Category name
                            </label>
                          </div>

                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              id="categoryDesc"
                              style={{ height: "100px" }}
                              placeholder="Enter brief category description here..."
                              onChange={onChange}
                              name="categoryDesc"
                              value={categoryData.categoryDesc}
                              required
                            ></textarea>
                            <label htmlFor="categoryDesc">
                              Category description
                            </label>
                          </div>

                          <div className="form-floating">
                            <fieldset className="row mb-3">
                              <legend className="col-form-label col-sm-2 pt-0">
                                <strong>Choose color</strong>
                              </legend>
                              <div className="col-sm-10">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="primary"
                                    value="bg-primary"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-primary"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-primary"
                                    htmlFor="primary"
                                  >
                                    Blue
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="info"
                                    value="bg-info"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-info"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-info"
                                    htmlFor="info"
                                  >
                                    Light Blue
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="success"
                                    value="bg-success"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-success"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-success"
                                    htmlFor="success"
                                  >
                                    Green
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="warning"
                                    value="bg-warning"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-warning"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-warning"
                                    htmlFor="warning"
                                  >
                                    Yellow
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="danger"
                                    value="bg-danger"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-danger"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-danger"
                                    htmlFor="danger"
                                  >
                                    Red
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="colorCode"
                                    id="secondary"
                                    value="bg-secondary"
                                    onChange={onChange}
                                    checked={
                                      categoryData.colorCode === "bg-secondary"
                                    }
                                  />
                                  <label
                                    className="form-check-label bg-secondary"
                                    htmlFor="secondary"
                                  >
                                    Grey
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {!isCategoryIdSet && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={submitCategoryForm}
                      >
                        Add Category
                      </button>
                    )}
                    {isCategoryIdSet && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitCategoryForm}
                      >
                        Edit Category
                      </button>
                    )}
                    {isCategoryIdSet && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteCategory}
                      >
                        Delete Category
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {categories.length > 0 &&
              categories.map((cat) => (
                <CategoryCard
                  categoryId={cat.categoryId}
                  categoryName={cat.categoryName}
                  desc={cat.desc}
                  colorCode={cat.colorCode}
                  setEditCategoryMode={setEditCategoryMode}
                />
              ))}
            {categories.length === 0 && (
              <div>
                <h3>No categories to list...</h3>
                <i>create one now</i>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.app.authToken,
  categories: state.toDo.categoryList,
});
const mapDispatchToProps = {
  createCategory,
  updateCategory,
  removeCategory,
  fetchUserCategories,
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
