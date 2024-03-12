const CategoryCard = ({
  categoryId,
  categoryName,
  colorCode,
  desc,
  setEditCategoryMode,
}) => {
  return (
    <>
      <div className="card my-3" style={{ width: "18rem" }} key={categoryId}>
        <div className="card-body">
          <h5 className={`card-title ${colorCode}`}>{categoryName}</h5>
          <p className="card-text">{desc}</p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#categoryFormModal"
            onClick={() =>
              setEditCategoryMode({
                categoryId,
                categoryName,
                colorCode,
                desc,
              })
            }
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
