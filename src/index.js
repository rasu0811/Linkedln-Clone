import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux" ;
import store from "./Store"

// const express = require('express');
// const cors = require('cors'); // Import the cors package

// const app = express();

// // Use CORS middleware
// app.use(cors({
//   origin: '*', // Allow all origins (replace '*' with a specific origin if needed)
//   methods: ["GET", "POST", "DELETE", "PUT"], // Allowed methods
// }));

// // Example route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Other routes or middleware
// // app.use('/api', yourRouteHandler);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

