import React, { Suspense, } from 'react';
import { Route, BrowserRouter, Routes, } from "react-router-dom";
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
/**
 *  Router function
 *  @author Narsing Maheshwari
 */


function App() {

  return (
    <Routes>
      <Route path={'/AddTodo'} element={<AddTodo />} />
      <Route path={'/AddTodo/:id'} element={<AddTodo />} />
      <Route path={'/'} element={<TodoList />} />
    </Routes>
  );
}


/**
 *  main function
 *  @author Narsing Maheshwari
 */

const AppWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <App />
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default AppWrapper;


