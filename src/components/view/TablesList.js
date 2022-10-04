import { useSelector } from "react-redux";
import { getTables } from "../../redux/tablesRedux";
import TableCard from "../features/TableCard";
import shortid from "shortid";

const TablesList = () => {
  const tables = useSelector(getTables);

  return (
    <div className="pt-4">
      {tables.map(table => <TableCard key={shortid()} {...table}/>)}
    </div>
  );
};

export default TablesList;