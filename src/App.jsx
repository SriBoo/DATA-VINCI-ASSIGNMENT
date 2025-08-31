import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import NestedCheckbox from './components/NestedCheckbox';
import './App.css';

function Home() {
  return (
    <>
      <h1>DataInfo</h1>
      <Layout />
      <NestedCheckbox />
    </>
  );
}

function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>About Page</h2>
      <p>This is the About page. You can describe your app, team, or purpose here.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Page</h2>
      <p>This is the Contact page. You can add a form or contact details here.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;