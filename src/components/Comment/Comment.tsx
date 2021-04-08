import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { customStyles } from '../../styles/quipModalStyles';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { ME_QUERY } from '../../pages/profile';
import * as Yup from 'yup';
import { FaComment, FaTimes } from 'react-icons/fa';
import styles from '../Quip/Quip.module.css';

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($content: String!, $id: Int!) {
        createComment(content: $content, id: $id) {
            id
        }
    }
`

interface CommentProps {
    content: string
}

interface Props {
    tweet: string
    name: string
    avatar: string
    id: number
}

export default function Comment({ tweet, avatar, name, id }: Props) {
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: [{query: ME_QUERY}]
    })
    const [modalIsOpen, setIsOpen] = useState(false)

    const { loading, error, data } = useQuery(ME_QUERY);
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    const initialValues: CommentProps = {
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
        <span onClick={openModal}>
            <FaComment />
        </span>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 8fr", marginTop: "10px" }}>
				<img src={avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />
				<h5>{name}</h5>
			</div>
			<p
				style={{
					marginLeft: "20px",
					borderLeft: "1px solid var(--accent)",
					paddingLeft: "20px",
					height: "50px",
					marginTop: 0
				}}
			>
				{tweet}
			</p>
            <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true)
                
                await createComment({
                    variables: {...values, id}
                })
                setSubmitting(false)
                setIsOpen(false)
            }}
            >
                <Form className={styles.create_quip_form}>
                    <img src={data.me.Profile?.avatar} style={{ width: "40px", borderRadius: "50%" }} alt="avatar" />
                    <Field name='content' type='text' as='textarea' placeholder='Reply with a Quip!'/>
                    <ErrorMessage name='content' component={'div'} />
                    <div className={styles.footer}></div>
                    <button type='submit' className={styles.quip_button}>Reply</button>
                </Form>
            </Formik>
            </Modal>     
        </div>
    )
}
