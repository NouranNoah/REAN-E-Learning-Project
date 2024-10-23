// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { BrowserRouter } from 'react-router-dom'


// createRoot(document.getElementById('root')).render(
// <BrowserRouter>
// <App />
// </BrowserRouter>

 
// )
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js'; // استيراد loadStripe
// import { Elements } from '@stripe/react-stripe-js'; // استيراد Elements


// const stripePromise = loadStripe('pk_test_51QBxDKJvw3SkWWwPgB5lhywLEm13kZuLxh6NgEnv2Dqk8JezGY8HtujUpcKlhVf83ak0jJdojpu6i8lwtkp6FKwf00EI5fkEfN');

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Elements stripe={stripePromise}>
//         <App />
//       </Elements>
//     </BrowserRouter>
//   </StrictMode>
// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'; 
import { Elements } from '@stripe/react-stripe-js'; 

const stripePromise = loadStripe('pk_test_51QBxDKJvw3SkWWwPgB5lhywLEm13kZuLxh6NgEnv2Dqk8JezGY8HtujUpcKlhVf83ak0jJdojpu6i8lwtkp6FKwf00EI5fkEfN');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     
        <App />
     
    </BrowserRouter>
  </StrictMode>
);

