import React from 'react';
import './App.css';
import {Container} from '@mantine/core';
import {UserTable} from "./components/UserTable";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'


const queryClient = new QueryClient()

function App() {

    return (
        <Container size="xs" px="xs">
            <QueryClientProvider client={queryClient}>
                <UserTable/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>

        </Container>
    )

}

export default App;
