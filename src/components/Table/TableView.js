import { Table } from "react-bootstrap";

import TableBody from "./TableBody";
import TableHead from "./TableHead";

const TableView = (props) => (
  <>
    <Table responsive bordered hover>
      <TableHead
        columns={props.columns}
        checked={props.selected.length === props.data.length ? true : false}
        onSelect={props.onAllSelect}
      />

      <TableBody
        columns={props.columns}
        data={props.data}
        onSelect={props.onSelect}
        selected={props.selected}
        delete={props.delete}
      />
    </Table>
  </>
);

export default TableView;
