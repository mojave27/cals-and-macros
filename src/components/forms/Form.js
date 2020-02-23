import React from 'react'
import * as Yup from 'yup'
import { useFormik, ErrorMessage } from 'formik'
import styles from './Form.module.css'

// const validate = values => {
//   const errors = {}
//   if (!values.firstName) {
//     errors.firstName = 'Required'
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required'
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }

//   return errors
// }

const Form = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required')
    }),
    onSubmit: values => {
      //   alert(JSON.stringify(values, null, 2))
      console.log(JSON.stringify(values, null, 2))
    }
  })

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <label htmlFor='firstName'>First Name</label>
      <input
        tabIndex='1'
        id='firstName'
        name='firstName'
        type='text'
        // getFieldProps returns onChange, onBlur, value, and checked
        {...formik.getFieldProps('firstName')}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        //   <ErrorMessage name="firstName" />
        <div className={styles.error}>{formik.errors.firstName}</div>
      ) : null}
      <label htmlFor='lastName'>Last Name</label>
      <input
        tabIndex='2'
        id='lastName'
        name='lastName'
        type='text'
        {...formik.getFieldProps('lastName')}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className={styles.error}>{formik.errors.lastName}</div>
      ) : null}
      <label htmlFor='email'>Email Address</label>
      <input
        tabIndex='3'
        id='email'
        name='email'
        type='email'
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className={styles.error}>{formik.errors.email}</div>
      ) : null}
      <button tabIndex='4' type='submit'>Submit</button>
    </form>
  )
}

export default Form
