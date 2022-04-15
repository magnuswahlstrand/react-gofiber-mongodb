import React from 'react';
import './App.css';
import {Container} from '@mantine/core';
import {UserTable} from "./components/UserTable";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient()

function App() {
    return (
        <Container size="xs" px="xs">
            <QueryClientProvider client={queryClient}>
                <UserTable/>
            </QueryClientProvider>
        </Container>
    )
}

export default App;
