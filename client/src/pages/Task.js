import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTask,
  fetchUserTasks,
  filterUserTasks,
  removeTask,
  updateTask,
} from "../store/actions/taskActions";
import { useToDo } from "../context/toDoContext";

const Task = ({
  token,
  tasks,
  categories,
  addTask,
  removeTask,
  updateTask,
  filterUserTasks,
  fetchUserTasks,
}) => {
  const navigator = useNavigate();
  const [taskData, setTaskData] = useState({
    taskName: "",
    categoryId: "",
    taskId: null,
    taskStatus: "Pending",
  });
  const [isEditMode, setEditMode] = useState(false);
  const [filterData, setFilterData] = useState({
    filterStatus: "Pending",
    filterCategory: "",
    filterString: "",
  });
  const { updateAlert } = useToDo();

  const onChange = (e) =>
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const filterOnChange = (e) =>
    setFilterData({ ...filterData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (token === null) {
      navigator("/login");
    }
  }, []);

  const validateFormCreateTask = (e) => {
    e.preventDefault();
    var catForm = document.getElementById("taskForm");
    if (!catForm.checkValidity()) {
      // If HTML validation fails, prevent form submission
      catForm.reportValidity();
      return;
    }
    isEditMode ? editTask() : createTask();
  };

  const createTask = async () => {
    const serviceRes = await addTask({ ...taskData, token });
    if (serviceRes) {
      await fetchUserTasks(token);
      closeEditMode();
      alert("Created task successfully!");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };

  const editTask = async () => {
    const serviceRes = await updateTask({ ...taskData, token });
    if (serviceRes) {
      await fetchUserTasks(token);
      closeEditMode();
      alert("Updated task successfully!");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };

  const deleteTask = async (taskId) => {
    const serviceRes = await removeTask({ taskId, token });
    if (serviceRes) {
      await fetchUserTasks(token);
      alert("Deleted task successfully!");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };

  const openEditMode = (task) => {
    setEditMode(true);
    setTaskData({
      taskName: task.taskInfo,
      categoryId: task.categoryInfo.categoryId,
      taskStatus: task.taskStatus,
      taskId: task.taskId,
    });
  };

  const closeEditMode = () => {
    setEditMode(false);
    setTaskData({
      taskName: "",
      categoryId: "",
      taskStatus: "Pending",
      taskId: null,
    });
  };

  const deleteTaskValidate = (taskId) => {
    const ans = prompt(
      "Are you sure you want to delete this task? Type 'YES' to continue delete.."
    );
    if (ans === "YES") {
      deleteTask(taskId);
    }
  };

  const filterTasksByCategoryId = () => {
    if (filterData.filterCategory.length === 0) {
      return alert("Choose category before search!");
    }
    const serviceRes = filterUserTasks({
      filterCategory: filterData.filterCategory,
      token,
    });
    if (!serviceRes) {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };

  const filterTaskBySearchString = () => {
    if (filterData.filterString.length === 0) {
      return alert("Enter some keywords in search box!");
    }
    const serviceRes = filterUserTasks({
      filterString: filterData.filterString,
      token,
    });
    if (!serviceRes) {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };

  const filterTasksByStatus = () => {
    const serviceRes = filterUserTasks({
      filterStatus: filterData.filterStatus,
      token,
    });
    if (!serviceRes) {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };

  const resetFilter = () => {
    setFilterData({
      filterStatus: "Pending",
      filterCategory: "",
      filterString: "",
    });
    const serviceRes = fetchUserTasks(token);
    if (!serviceRes) {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };
  return (
    <>
      {categories.length > 0 && (
        <div className="container p-1">
          <div className="container p-2">
            <form id="taskForm">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      id="taskDesc"
                      style={{ height: "80px" }}
                      placeholder="Enter brief task description here..."
                      onChange={onChange}
                      name="taskName"
                      value={taskData.taskName}
                      required
                    ></textarea>
                    <label htmlFor="taskDesc">Task description here</label>
                  </div>
                </div>
                <div className="col-sm-3">
                  <br />
                  <select
                    className="form-select"
                    name="categoryId"
                    onChange={onChange}
                    value={taskData.categoryId}
                    required
                  >
                    <option value={""}>Choose Category</option>
                    {categories.map((cat) => (
                      <option value={cat.categoryId}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                {isEditMode && (
                  <div className="col-sm-2">
                    <br />
                    <select
                      className="form-select"
                      name="taskStatus"
                      onChange={onChange}
                      value={taskData.taskStatus}
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">InProgress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                )}
                <div className="col-sm-1">
                  <br />
                  {!isEditMode && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={validateFormCreateTask}
                    >
                      Create
                    </button>
                  )}
                  {isEditMode && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-warning p-0"
                      onClick={validateFormCreateTask}
                    >
                      Update
                    </button>
                  )}
                  {isEditMode && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary p-0"
                      onClick={closeEditMode}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
          <hr />
          <div className="container p-2 row">
            <div className="col-4">
              <select
                className="form-select"
                value={filterData.filterStatus}
                onChange={filterOnChange}
                name="filterStatus"
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                type="button"
                className="btn btn-outline-secondary my-1"
                onClick={filterTasksByStatus}
              >
                Filter by status
              </button>
            </div>
            <div className="col-4">
              <select
                className="form-select"
                name="filterCategory"
                onChange={filterOnChange}
                value={filterData.filterCategory}
              >
                <option value={""}>Choose Category</option>
                {categories.map((cat) => (
                  <option value={cat.categoryId}>{cat.categoryName}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-outline-secondary my-1"
                onClick={filterTasksByCategoryId}
              >
                Filter by category
              </button>
            </div>
            <div className="col-4">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="filterString"
                  value={filterData.filterString}
                  onChange={filterOnChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={filterTaskBySearchString}
                >
                  Search
                </button>
              </form>
              <button
                type="button"
                className="btn btn-outline-secondary my-1"
                onClick={resetFilter}
              >
                Reset
              </button>
            </div>
          </div>
          <hr />
          <div
            className="container p-2 mx-1 my-1"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {tasks.length === 0 && <h4>No tasks to show!</h4>}
            {tasks.length > 0 && (
              <div className="container">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Task description</th>
                      <th scope="col">Progress</th>
                      <th scope="col">Category</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.taskId}>
                        <th scope="row">
                          <textarea
                            className="form-control"
                            id="taskDesc"
                            style={{ height: "80px" }}
                            placeholder="Enter task description here..."
                            onChange={onChange}
                            name="taskName"
                            value={task.taskInfo}
                            required
                            disabled
                          ></textarea>
                        </th>
                        <td>
                          <select value={task.taskStatus} disabled>
                            <option value="Pending">Pending</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td id={task.categoryInfo.categoryId}>
                          <span
                            className={`badge rounded-pill ${task.categoryInfo.colorCode}`}
                          >
                            {task.categoryInfo.categoryName}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info my-1"
                            onClick={() => openEditMode(task)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger mx-1"
                            onClick={() => deleteTaskValidate(task.taskId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {token && categories.length === 0 && (
        <div className="container">
          <h3>
            Create category to start adding your tasks!
            <a href="/categories">Create Category?</a>
          </h3>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.app.authToken,
  tasks: state.toDo.taskList,
  categories: state.toDo.categoryList,
});
const mapDispatchToProps = {
  addTask,
  removeTask,
  updateTask,
  filterUserTasks,
  fetchUserTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
