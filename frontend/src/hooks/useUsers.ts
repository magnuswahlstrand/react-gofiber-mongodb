import {useState} from "react";
import axios from "axios";
import {useQuery} from "react-query";

export function useUsers() {
    const [searchValue, setSearchValue] = useState('');

    // Only search if term is more than 3 characters
    const cappedSearchValue = searchValue.length >= 3 ? searchValue : null

    const query = async () => {
        const url = "http://localhost:8080/users"
        const params = cappedSearchValue ? {params: {q: searchValue}} : {params: {}}

        const {data} = await axios.get(url, params)
        return data.users
    }
    const {isLoading, error, data, isFetching} = useQuery(["user data", cappedSearchValue], query);

    return {users: data ? data : [], searchValue, setSearchValue};
}
