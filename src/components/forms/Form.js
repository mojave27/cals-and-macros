import React from 'react'
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Button from '../inputs/Button'
import TextInput from '../inputs/TextInput'
import styles from './Form.module.css'

const SimpleForm = () => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required')
      })}
      onSubmit={values => {
        console.log(JSON.stringify(values, null, 2))
      }}
    >
      {formik => (
        <Form className={styles.form} onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <Field name='firstName' as={TextInput} placeholder='First Name' />
            <ErrorMessage name='firstName' />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <Field name='lastName' as={TextInput} placeholder='Last Name' />
            <ErrorMessage name='lastName' />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <Field name='email' as={TextInput} placeholder='Email Address' />
            <ErrorMessage name='email' />
          </div>
          <Button className='fake' text='Submit' tabIndex='4' type='submit' />
        </Form>
      )}
    </Formik>
  )
}

export default SimpleForm
