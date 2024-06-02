import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({defaultOptions:{queries:{
    refetchOnWindowFocus:false,
    refetchOnMount:false,
    retry:1,
    staleTime: 60 * 1000,
}}})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        <ReactQueryDevtools />
    </QueryClientProvider>
);

