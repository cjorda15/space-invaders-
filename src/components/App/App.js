import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Resume from '../Resume/Resume'
import MainContent from '../MainContent/MainContent'
import Projects from '../Projects/Projects'
import Headline from '../Headline/Headline'
import NavBar from '../NavBar/NavBar'
import AboutMe from '../AboutMe/AboutMe'
import Contact from '../Contact/Contact'
import style from './App.css';
class App extends Component {
  constructor(props){
    super(props)
  }

  showSettings (event) {
   event.preventDefault();
   console.log('huh');
 }

  render() {
    return (
      <div className="App">
       <NavBar/>
       <Headline/>
       <Switch>
       <Route path="/aboutme" render = {(history) => {
         return <AboutMe history = {history}/>}}/>
        <Route path="/resume" render = {(history) => {
          return <Resume history = {history}/>}}/>
        <Route path="/projects" render = {(history) => {
          return <Projects history = {history}/>}}/>
          <Route path="/contact" render = {(history) => {
            return <Contact history = {history}/>}}/>
        <Route path="/" render = {(history) => {
          return <MainContent history = {history}/>}}/>
       </Switch>
      </div>
    );
  }
}

export default App;
