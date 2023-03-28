import React from 'react';
import './App.css';
import ModalComponent from './components/modal/modal.component';
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalComponent />
    </QueryClientProvider>
  );
}

export default App;
