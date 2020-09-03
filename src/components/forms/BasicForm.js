import React from 'react';
import { Formik, Field, Form } from 'formik';

const fields = [
  {value: 'firstName', placeholder: 'Jane'},
  {value: 'lastName', placeholder: 'Doe'},
  {value: 'email', placeholder: 'jane@acme.com'}
]

const Basic = props => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async values => {
        await new Promise(r => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
        props.onSubmit(values)
      }}
    >
      <Form>
        {fields.map( field => {
          return (
            <React.Fragment>
              <label htmlFor={field.value}>{field.value}</label>
              <Field id={field.value} name={field.value} placeholder={field.placeholder} />
            </React.Fragment>
          )
        })}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default Basic