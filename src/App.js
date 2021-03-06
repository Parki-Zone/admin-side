import './App.css';
import React, { useState, useEffect } from "react";
import Signin from './components/Signin'
import Dashboard from './components/Dashboard/Dashboard.js'

export default function App() {
  const [state, setState] = useState({
    view: "signin"
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (localStorage.getItem("token") === "admin"){
         setState({ view: "Dashboard" });
       }else if (localStorage.getItem("token") !== "admin"){
         console.log(localStorage.getItem("token"));
         setState({ view: "signin" });
       }
  }, 1000);
  return () => window.clearTimeout(timer );
  });

  const changeView = (view) => {
    setState({
      view: view,
    })
  }
  const renderView = () => {
    const view  = state.view
    console.log(view);
    if( view === "signin" ) {
      return <Signin changeView={(view)=> changeView(view)}/>
    }
    if( view === "Dashboard"){
      return <Dashboard/>
    }
  }
    return (
        <div className="App">
          {renderView()}
        </div>
      );
    }