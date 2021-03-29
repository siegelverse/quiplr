import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRef, useState } from 'react';
import { ME_QUERY } from '../../pages/profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from '../CreateProfile/CreateProfile.module.css';
import Modal from 'react-modal';
import { customStyles } from '../../styles/customModalStyles';
import { FaUser } from 'react-icons/fa';

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

interface UpdateValues {
    id: number
    bio: string
    location: string
    website: string
    avatar: string
}

export default function UpdateProfile() {
    const inputFile = useRef<HTMLInputElement | null>(null)
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const { loading, error, data } = useQuery(ME_QUERY);
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
        refetchQueries: [{query: ME_QUERY}]
    })
    const [modalIsOpen, setIsOpen] = useState(false)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    const initialValues: UpdateValues = {
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
    
    console.log(data.me.Profile)

    const uploadImage = async (e) => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', "image-upload")  
        console.log(data)
        setImageLoading(true)
        const res = await fetch(process.env.CLOUDINARY_URL, {
            method: "POST",
            body: data
        })
        const file = await res.json()
        console.log(file)
        setImage(file.secure_url)
        setImageLoading(false)
    }
    return (
        <div>
            <button onClick={openModal} className={styles.edit_button}>Update Profile</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Modal'
                style={customStyles}
            >
            
            <input 
            type='file' 
            name='file' 
            placeholder='upload file' 
            onChange={uploadImage} 
            ref={inputFile}
            style={{ display: 'none' }}
            />

            {imageLoading ? 
                (<h3>Loading...</h3>)
                :
                (
                    <>
                        {data.me.Profile.avatar ? (
                            <span onClick={() => inputFile.current.click()} style={{ cursor: 'pointer' }}>
                                <img 
                                    src={data.me.Profile.avatar}
                                    style={{ width: '50px', borderRadius: '50%' }}
                                    alt='avatar'
                                />
                            </span>
                        ) : (
                            <span onClick={() => inputFile.current.click()} style={{ cursor: 'pointer' }}>
                                <FaUser size={70} />
                            </span>
                        )}
                    </>
                )
            }

            <Formik 
            initialValues={initialValues} 
            // validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                
                await updateProfile({
                    variables: {...values, avatar: image}
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
