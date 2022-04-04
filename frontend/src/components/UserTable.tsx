import {Table} from "@mantine/core";
import React, {useState} from "react";
import {UserSearch} from "./UserSearch";
import {useQuery} from "react-query";
import axios from "axios";

type User = {
    id: number;
    name: string;
    phone: string;
    email: string;
}

const TableStyle = {border: '1px solid lightgray'}

function useUsers() {
    const [searchValue, setSearchValue] = useState('');

    const cappedSearchValue = searchValue.length >= 2 ? searchValue : null

    const query = async () => {
        const url = "http://localhost:3001/users"
        const params = cappedSearchValue ?  {params: {q: searchValue}} : {params: {}}

        const {data} = await axios.get(url, params)
        return data
    }
    const {isLoading, error, data, isFetching} = useQuery(["user data", cappedSearchValue], query);

    return {users: data ? data : [], searchValue, setSearchValue};
}

export const UserTable = () => {
    const {users, searchValue, setSearchValue} = useUsers();

    const rows = users.map((user: User) => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
        </tr>
    ));

    return (
        <>
            <UserSearch value={searchValue} setValue={setSearchValue}/>
            <Table highlightOnHover striped style={TableStyle}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>E-mail</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}
