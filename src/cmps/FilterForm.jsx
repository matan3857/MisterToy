import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

export const FilterForm = (props) => {

    const initialValues = { name: '' }

    const validate = (values) => {
        const errors = {};
        // if (!values.name) {
        //     errors.name = 'Required';
        // }
        // if (!values.email) {
        //     errors.email = 'Required';
        // } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //     errors.email = 'Invalid email address';
        // }

        return errors;
    }

    const onFormSubmit = (values, { setSubmitting }) => {
        console.log('values', values);
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        this.props.handleChange()
    }

    const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'secondary'} />

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onFormSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="name" label="name" as={TextFieldOutlined} />
                    <ErrorMessage name="name" component="div" />
                    {/* <Field type="password" name="password" label="password" as={TextFieldOutlined} /> */}
                    {/* <ErrorMessage name="password" component="div" /> */}
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        type="submit"
                        disabled={isSubmitting}>
                        Submit
                    </Button>

                    {props.children}
                </Form>
            )}
        </Formik>
    )
};

