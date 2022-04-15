import {Table} from "@mantine/core";
import React from "react";
import {UserSearch} from "./UserSearch";
import {useUsers} from "../hooks/useUsers";

type User = {
    id: string;
    name: string;
    phone: string;
    email: string;
}

const TableStyle = {border: '1px solid lightgray'}

export const UserTable = () => {
    const {users, searchValue, setSearchValue} = useUsers();

    const rows = users.map((user: User) => (
        <tr key={user.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{user.id.slice(-6)}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.name}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.phone}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.email}</td>
        </tr>
    ));

    return (
        <>
            <UserSearch value={searchValue} setValue={setSearchValue}/>
            <Table highlightOnHover striped style={TableStyle}>
                <thead>
                <tr>
                    <th>Short&nbsp;ID</th>
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
