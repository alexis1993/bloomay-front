import React from 'react';
import './App.css';
import ModalComponent from './components/modal/modal.component';
import { QueryClientProvider, QueryClient } from "react-query";
import { MemoizedContentComponent } from './components/content/content.component';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalComponent>
        <MemoizedContentComponent/>
      </ModalComponent>
    </QueryClientProvider>
  );
}

export default App;
