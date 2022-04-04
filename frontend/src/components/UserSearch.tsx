import {TextInput} from "@mantine/core";
import {Search} from "tabler-icons-react";
import React from "react";

const SearchStyle = {
    marginBottom: "0.5em",
    marginTop: "0.5em",
}

type SearchProps = {
    value: string
    setValue: (s: string) => void
}
export const UserSearch = ({value, setValue}: SearchProps) => {

    return (
        <TextInput
            value={value}
            placeholder="ID, E-mail or Phone"
            icon={<Search size={14}/>}
            onChange={(event) => setValue(event.currentTarget.value)}
            style={SearchStyle}
        />
    )
}
