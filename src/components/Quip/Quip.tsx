import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { customStyles } from '../../styles/quipModalStyles';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from '../../pages/profile';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import styles from './Quip.module.css';

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

export default function Quip() {
    const [createTweet] = useMutation(CREATE_QUIP_MUTATION, {
        refetchQueries: [{query: ME_QUERY}]
    })
    const [modalIsOpen, setIsOpen] = useState(false)

    const initialValues: QuipValues = {
        content: ''
    }

    const validationSchema = Yup.object({
        content: Yup.string().required().min(1, 'Must be more than 1 character').max(256, 'Must be under 257 characters')
    })

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }


    return (
        <div>
        <button onClick={openModal} style={{cursor: 'pointer', outline: 'none', marginRight: '10px', marginTop: '30px'}}>
            <span style={{padding: '15px 70px 15px 70px'}}>Quip</span>
        </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
                style={customStyles}
            >

            <span className={styles.exit} onClick={closeModal}>
                <FaTimes />
            </span>

            <div className={styles.header}></div>
            <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                
                await createTweet({
                    variables: values
                })
                setSubmitting(false)
                setIsOpen(false)
            }}
            >
                <Form className={styles.create_quip_form}>
                    <Field name='content' type='text' as='textarea' placeholder='Make us laugh!'/>
                    <ErrorMessage name='content' component={'div'} />
                    <div className={styles.footer}></div>
                    <button type='submit' className={styles.quip_button}>Quip</button>
                </Form>
            </Formik>
            </Modal>     
        </div>
    )
}
