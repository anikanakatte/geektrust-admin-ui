import "./Table.css";

const TableHead = (props) => {
  const selectAll = () => {
    props.onSelect();
  };

  return (
    <thead>
      <tr>
        <th key="select-all-checkbox">
          <input onChange={selectAll} checked={props.checked} type="checkbox" />
        </th>

        {props.columns.map((el, idx) => (
          <th key={idx}>{el}</th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TableHead;
