import React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { bindActionCreators } from 'redux';
import {actionCreators} from './state/index';
import { useSelector } from 'react-redux/es/exports';

const Shop = () => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.amount);
const {withdrawtMoney ,deopsitMoney} = bindActionCreators(actionCreators ,dispatch);
  return (
    <div>
    <h1 className='my-3'>Depost/Withdraw money</h1>
      {/* <button className="btn btn-success mx-2" onClick={()=>{dispatch(actionCreators.withdrawtMoney(100))}}>-</button>
      Update balance
      <button className="btn btn-success mx-2" onClick={()=>{dispatch(actionCreators.deopsitMoney(100))}}>+</button> */}
      <button className="btn btn-success mx-2" onClick={()=>{withdrawtMoney(100)}}>-</button>
      Update balance{balance}
      <button className="btn btn-success mx-2" onClick={()=>{deopsitMoney(100)}}>+</button>
      {/* <button className="btn btn-success mx-2" onClick={()=>{action.withdrawtMoney(100)}}>-</button>
      Update balance
      <button className="btn btn-success mx-2" onClick={()=>{action.deopsitMoney(100)}}>+</button> */}
    </div>
  )
}

export default Shop;
