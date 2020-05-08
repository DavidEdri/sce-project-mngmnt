import React from 'react'
import { useFetch } from '../../utils/hooks'
import Loading from '../common/Loading'
import { validation } from "@project/common";
import MyFormik from "../common/MyFormik/index";
import { Grid } from '@material-ui/core';
import Axios from 'axios';

const Edit = () => {
    const { data, loading } = useFetch("/managers/edit");
    const fields = [
        {
            fieldName: "name",
            label: "name",
            type: "text",
            options: "text",
            initialValue: data ? data.name : ""
        },
        {
            fieldName: "activity",
            label: "activity",
            type: "text",
            options: "text",
            initialValue: data ? data.activity : ""
        },
        {
            fieldName: "condition",
            label: "condition",
            type: "text",
            options: "text",
            initialValue: data ? data.condition : ""
        },
        {
            fieldName: "fencing",
            label: "fencing",
            type: "switch",
            initialValue: data ? data.fencing : false
        },
        {
            fieldName: "handicappe",
            label: "handicappe",
            type: "switch",
            initialValue: data ? data.handicappe : false
        },
        {
            fieldName: "ligthing",
            label: "ligthing",
            type: "switch",
            initialValue: data ? data.ligthing : false
        },

    ];

    const onSubmit = async values => {
        try {
            const res = await Axios.put("/managers/edit", values)
            console.log(res.data)
        } catch (error) {

        }
    }

    if (loading) return <Loading />

    return (
        <Grid container justify="center">
            <Grid item md={6} xs={12}>
                <MyFormik
                    fields={fields}
                    title="Edit facility"
                    onSubmit={onSubmit}
                    validationSchema={validation.forms.editFacility}
                />
            </Grid>
        </Grid>
    )
}

export default Edit