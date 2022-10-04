const createActionName = actionName => `app/tables/${actionName}`;

const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLES = createActionName('EDIT_TABLES');
//selectors
export const getTables = (state => state.tables);
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);



//actions
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTables = payload => ({type: EDIT_TABLES, payload});
export const fetchData = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};

export const editTablesRequest = (newTable) => {
  return (dispatch) => {
    console.log(newTable)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch('http://localhost:3131/tables/' + newTable.id, options)
    .then(() => dispatch(editTables(newTable)))
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLES: 
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    default: 
    return statePart;
  };
};

export default tablesReducer;