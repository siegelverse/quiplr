import { ErrorMessage, Field, Form, Formik } from 'formik';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import styles from './HomePageQuip.module.css';
import { TWEETS_QUERY } from '../AllQuips/AllQuips';

const CREATE_QUIP_MUTATION = gql`
    mutation createTweet($content: String) {
        createTweet(content: $content) {
            id
        }
    }
`

interface QuipValues {
    content: string
}

export default function HomePageQuip() {
    const [createTweet] = useMutation(CREATE_QUIP_MUTATION, {
        refetchQueries: [{query: TWEETS_QUERY}]
    })

    const initialValues: QuipValues = {
        content: ''
    }

    const validationSchema = Yup.object({
        content: Yup.string().required().min(1, 'Must be more than 1 character').max(256, 'Must be under 257 characters')
    })

    return (
        <div className={styles.home_page_quip}>
            <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                setSubmitting(true)
                
                await createTweet({
                    variables: values
                })
                setSubmitting(false)
                resetForm()
            }}
            >
                <Form className={styles.create_quip_form}>
                    <Field name='content' type='text' as='textarea' placeholder='Make us laugh!'/>
                    <ErrorMessage name='content' component={'div'} />
                    <button type='submit' className={styles.home_quip_button}>Quip</button>
                </Form>
            </Formik>  
            <div className={styles.footer}></div>  
        </div>
    )
}