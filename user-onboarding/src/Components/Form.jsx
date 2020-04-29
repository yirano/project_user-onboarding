import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Form as ReactForm, Input, Label, Row, Col, FormGroup, Button, Alert } from 'reactstrap'

export default function Form({ setPost, post }) {

  const initialFormState = {
    name: '',
    email: '',
    password: '',
    jobs: '',
    tos: ''
  }

  const [serverError, setServerError] = useState('')
  const [formState, setFormState] = useState(initialFormState);

  const [isButtonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState(initialFormState)

  // schema is used for all validation to determine whether the input is valid or not
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email()
      .required("Must be a valid email address"),
    password: yup.string().required(),
    tos: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    jobs: yup.string().required('Please pick a job')
  })

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name, e.target.type)
      .validate(e.target.type !== 'checkbox' ? e.target.value : e.target.checked)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" })
      })
      .catch(err => {
        console.log("Form -> err", err)
        setErrors({ ...errors, [e.target.name]: err.errors[0] })
      })
  }

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log("Form -> valid", valid)
      setButtonDisabled(!valid);
    })
  }, [formState])

  const formSubmit = e => {
    e.preventDefault();

    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => {
        console.log("Form -> res", res.data)
        setPost([...post, res.data])
        setFormState({
          name: '',
          email: '',
          password: '',
          jobs: '',
          tos: ''
        })
        setServerError(null)
      })
      .catch(err => {
        setServerError("There is an error!")
      })
  }

  const inputChange = e => {
    e.persist();

    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }

    console.log('checked', e.target.checked);
    console.log('value', e.target.value);

    validateChange(e);
    setFormState(newFormData)
  }

  console.log(formState);

  return (
    <ReactForm style={{ padding: '90px' }} onSubmit={formSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="John Jacob" onChange={inputChange} value={formState.name} />
        {errors.name.length > 0 ? <Alert color="warning">{errors.name}</Alert> : null}
        {/* {errors.name && touched.name ? (<Alert color="warning">{errors.name}</Alert>) : null} */}
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="email@email.com" onChange={inputChange} value={formState.email} />
            {errors.email.length > 0 ? (
              <Alert color="warning">{errors.email}</Alert>) : null}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Create a Password" onChange={inputChange} value={formState.password} />
            {errors.password.length > 0 ? (
              <Alert color="warning">{errors.password}</Alert>) : null}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="jobs">Jobs</Label>
        <Input type="select" name="jobs" id="jobs" onChange={inputChange} value={formState.jobs}>
          <option value="" disable>--Please select a job--</option>
          <option value="photographer">Photographer</option>
          <option value="ticketbooth">Ticket Booth</option>
          <option value="vendor">Vendor</option>
        </Input>
        {errors.jobs.value === "" && errors.jobs.value ? (
          <Alert color="warning">{errors.jobs}</Alert>) : null}
      </FormGroup>

      <FormGroup check>
        <Input type="checkbox" name="tos" id="tos" onChange={inputChange} checked={formState.tos} />
        <Label for="tos" check>Terms &amp; Conditions</Label>
        {errors.tos ? (
          <Alert color="warning">{errors.tos}</Alert>) : null}
      </FormGroup>
      <Button color="primary" style={{ marginTop: '20px', width: '110px' }}>Sign Up</Button>

      {/* disabled={isButtonDisabled}  */}
    </ReactForm>
  )
}
