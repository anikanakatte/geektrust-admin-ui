import { useState } from "react";
import "./Table.css";

const TableRow = (props) => {
  const [editable, setEditable] = useState(false);

  const handleDelete = (id) => {
    if (!editable) {
      props.delete(id);
    }
  };
  const handleToggle = (id) => {
    props.onSelect(id);
  };

  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = () => {
    setEditable(false);
  };
  return (
    <tr id={props.el.id} className={props.checked ? "selected" : "unselected"}>
      <td id="checkbox">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => {
            handleToggle(props.el.id);
          }}
          value={props.el.id}
        />
      </td>
      {props.columns.map((columnName, index) => (
        <td
          id={`${columnName}-${props.el.id}`}
          className={columnName}
          contentEditable={editable}
          key={index}
        >
          {props.el[columnName]}
        </td>
      ))}
      <td id="actions">
        {editable ? (
          <button onClick={handleSave}>
            <img
              src="https://img.icons8.com/material-rounded/24/000000/save.png"
              alt="save-button"
            />
          </button>
        ) : null}
        <button disabled={editable} onClick={handleEdit}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
            alt="edit button"
          />
        </button>
        <button
          disabled={editable}
          onClick={(e) => {
            handleDelete(props.el.id);
          }}
        >
          <img
            className="icon"
            src="https://img.icons8.com/color/48/000000/delete-forever.png"
            alt="delete button"
          />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
