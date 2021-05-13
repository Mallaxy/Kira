import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import s from './InputBlock.module.css'
import * as yup from 'yup'
import Button from '@material-ui/core/Button';
import {useFormik} from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";

const validationsSchema = yup.object({
    altitude: yup.number().typeError('Must be a number').test('len', 'Max 99999', value => !value || value <= 99999).required('Required'),
    point: yup.string().typeError('Must be a string').test('len', 'Max 16 symbols', value => !value || value.length <= 16).matches(/^[a-zA-Z]+$/, 'Only latin symbols')
})

const options = [
    "ABABO",
    "ABUGA",
    "BR",
    "DEKAD",
    "FASAD",
    "GORBA",
    "GR",
    "GULON",
    "KERTA",
    "KESAM",
    "KOSIR",
    "KRASNOGRAD",
    "KUBIR",
    "KUROS",
    "LADIK",
    "LIMIT",
    "LUSIG",
    "MASOL",
    "MATEG",
    "MOGAD",
    "MOGRI",
    "NALEM",
    "NINOR",
    "OL",
    "OLSHANY",
    "PEKIT",
    "PILAT",
    "ROGLA",
    "UROMA",
    "VELOT",
    "WL"
]

export function InputBlock({setFilter}) {

    const formik = useFormik({
        initialValues: {
            person: 'Pilot',
            altitude: 1200,
            point: ''
        },
        validationSchema: validationsSchema,
        onSubmit: (values) => {
            setFilter(values);
        },
    });

    const {values, errors, touched, handleChange, handleBlur, setFieldValue} = formik

    return (
        <div className={s.inputBlock}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Who are you?</FormLabel>
                <RadioGroup
                    aria-label="person"
                    name="person"
                    value={values.person}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Pilot" control={<Radio/>} label="Pilot"/>
                    <FormControlLabel value="ATC" control={<Radio/>} label="ATC"/>
                </RadioGroup>
            </FormControl>
            <TextField
                id="altitude"
                label="Altitude FT"
                value={parseInt(values.altitude, 10)}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                size="medium"
                type="number"
                inputProps={{min: 1200, max: 99999}}
                error={touched.altitude && Boolean(errors.altitude)}
                helperText={touched.altitude && errors.altitude}
                style={{width: "10rem"}}
            />

            <Autocomplete
                id="foreignPoint"
                className="point-select"
                name="point"
                options={options.sort()}
                value={values.point}
                onChange={(e, value) => {
                    setFieldValue("point", value);
                }}
                disableClearable={true}
                fullWidth
                renderInput={(params) => <TextField {...params}
                                                    name="point"
                                                    label="Point"
                                                    variant="outlined"
                                                    size="medium"
                                                    error={Boolean(errors.point)}
                                                    helperText={touched.point && errors.point}
                />}
            />
            <Button variant="contained" onClick={formik.handleSubmit}>Find</Button>
        </div>
    )
}