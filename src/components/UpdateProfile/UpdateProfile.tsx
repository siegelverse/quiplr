import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ME_QUERY } from '../../pages/profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from '../CreateProfile/CreateProfile.module.css';
import Modal from 'react-modal';
import { customStyles } from '../../styles/customModalStyles';

const UPDATE_PROFILE_MUTATION = gql`
    mutation updateProfile(
        $id: Int!
        $bio: String
        $location: String
        $website: String
        $avatar: String
    ) {
        updateProfile(
            id: $id
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
    id: number
    bio: string
    location: string
    website: string
    avatar: string
}

export default function UpdateProfile() {
    const { loading, error, data } = useQuery(ME_QUERY);
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
        refetchQueries: [{query: ME_QUERY}]
    })
    const [modalIsOpen, setIsOpen] = useState(false)

    const initialValues: ProfileValues = {
        id: data.me.Profile.id,
        bio: data.me.Profile.bio, 
        location: data.me.Profile.location,
        website: data.me.Profile.website,
        avatar: data.me.Profile.avatar
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal}>Update Profile</button>
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
                
                await updateProfile({
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
                    <button type='submit' className={styles.create_profile_button}>Update Profile</button>
                </Form>
            </Formik>
            </Modal>
        </div>
    )
}
