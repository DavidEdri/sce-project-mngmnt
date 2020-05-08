import { useState, useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/actions/utilsActions";


// eslint-disable-next-line import/prefer-default-export
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await Axios(url);
                setData(res.data);
                setLoading(false);
            } catch (error) {
                dispatch(
                    openSnackbar("בעייה בטעינת המידע, אנא נסו שוב מאוחר יותר", "error")
                );
            }
        };

        fetch();
    }, [url, dispatch]);

    return { loading, data };
};


