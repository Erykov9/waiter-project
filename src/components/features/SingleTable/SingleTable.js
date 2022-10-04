import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { Form } from "react-bootstrap";
import { getOptions } from "../../../redux/optionsRedux";
import shortid from "shortid";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editTablesRequest } from "../../../redux/tablesRedux";
import { useForm } from "react-hook-form";
import styles from './SingleTable.module.scss';



const SingleTable = () => {  
  const dispatch =  useDispatch();
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));

  const [ ppl, setPpl ] = useState('' || tableData.ppl);
  const [ status, setStatus ] = useState('' || tableData.status);
  const [ bill, setBill ] = useState('' || tableData.bill);
  const [ maxPeople, setMaxPeople ] = useState('' || tableData.maxPeople);

  if(ppl > maxPeople) {
    setPpl(maxPeople);
  };

  if(maxPeople > 10) {
    setMaxPeople(10);
  };

  const optionsData  = useSelector(getOptions);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(editTablesRequest({id: tableId, date: tableData.date, status, bill, ppl, table: tableData.table, maxPeople},{tableId}));
    navigate('/')
  }

  const { register, handleSubmit: validate, formState: {errors}} = useForm();



  return (
    <div className="pt-4">
      <h2>Table: {tableData.table}</h2>
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group>
          <Form.Label className="d-inline">Status: </Form.Label>
          <Form.Select className="w-25 d-inline" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option disabled>Select status</option>
            {optionsData.map(option => <option key={shortid()}>{option}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label className="pt-3">People: </Form.Label>
          <Form.Control
          {...register("ppl", {required: true, min: 0, max: 10})} 
          type="number" 
          className={styles.custom}
          value={status === "Cleaning" || status === "Free" ? 0 : ppl} 
          onChange={e => setPpl(e.target.value)} 
          /> 
          / 
          <Form.Control 
          {...register("maxPeople", {required: true, min: 0, max: 10})}
          type="number" 
          className={styles.custom}
          value={maxPeople} 
          placeholder={tableData.maxPeople} 
          onChange={e => setMaxPeople(e.target.value)}
          />
        </Form.Group>

        <Form.Group  className="pb-3">
          <Form.Label className="pt-3">Bill: $</Form.Label>
          <Form.Control 
          {...register("bill", {required: true})}
          type="text" 
          className={styles.custom}
          value={status === 'Busy' ? 0 : bill} 
          onChange={(e) => setBill(e.target.value)}/>
          {errors.bill && <small className="d-block form-text text-danger mt-2">Bill: You need to fill this input!</small>}
          
        </Form.Group>
        <Button type="submit" variant="primary">Update</Button>
      </Form>
    </div>
  )
  
};

export  default  SingleTable;