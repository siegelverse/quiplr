import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ME_QUERY } from '../../pages/profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './CreateProfile.module.css';
import Modal from 'react-modal';
import { customStyles } from '../../styles/customModalStyles';

const CREATE_PROFILE_MUTATION = gql`
    mutation addProfileForUser(
        $bio: String
        $location: String
        $website: String
        $avatar: String
    ) {
        addProfileForUser(
            bio: $bio
            location: $location
            website: $website
            avatar: $avatar
        ){
            id
        }
    }
`

interface ProfileValues {
    bio: string
    location: string
    website: string
    avatar: string
}

export default function CreateProfile() {
    const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
        refetchQueries: [{query: ME_QUERY}]
    })
    const [modalIsOpen, setIsOpen] = useState(false)

    const initialValues: ProfileValues = {
        bio: '', 
        location: '',
        website: '',
        avatar: ''
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal}>Create Profile</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
                style={customStyles}
            >

            <Formik 
            initialValues={initialValues} 
            // validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                
                await createProfile({
                    variables: values
                })
                setSubmitting(false)
                setIsOpen(false)
            }}
            >
                <Form className={styles.create_profile_form}>
                    <Field name='bio' type='text' as='textarea' placeholder='Bio'/>
                    <ErrorMessage name='bio' component={'div'} />
                    <Field name='location' type='location' placeholder='Location'/>
                    <ErrorMessage name='location' component={'div'} />
                    <Field name='website' type='website' placeholder='Website'/>
                    <ErrorMessage name='website' component={'div'} />
                    <button type='submit' className={styles.create_profile_button}>Create Profile</button>
                </Form>
            </Formik>
            </Modal>
        </div>
    )
}
