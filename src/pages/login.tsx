import React from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from '../styles/login.module.css';
import * as Yup from 'yup';
import Link from 'next/link';

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token 
        }
    }
`

interface LoginValues {
    email: string,
    password: string,
}


export default function Login() {
    const router = useRouter();
    const [login, {data}] = useMutation(LOGIN_MUTATION);

    const initialValues: LoginValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email required!'),
        password: Yup.string().max(20, 'Password must be 20 characters or less!').required('Password required!')
    })

    return (
        <div className={styles.login_container}>
            <img src={'../../quiplr-logo-dark.svg'} alt='logo' style={{width: '100px'}} className={styles.logo}/>
            <h3 className={styles.message}>Log in to quiplr</h3>
            <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)

                const response = await login({
                    variables: values
                })
                localStorage.setItem('token', response.data.login.token)
                setSubmitting(false)
                router.push('/')
            }}
            >
                <Form className={styles.login_form}>
                    <Field name='email' type='text' placeholder='Email'/>
                    <ErrorMessage name='email' component={'div'} />
                    <Field name='password' type='password' placeholder='Password'/>
                    <ErrorMessage name='password' component={'div'} />
                    <button type='submit' className={styles.login_button}>Login</button>
                </Form>
            </Formik>
            <div className={styles.register}>
                <h4>Sign up for quiplr</h4>
                <Link href={'/signup'}>Sign up</Link>
            </div>
        </div>
    )
}