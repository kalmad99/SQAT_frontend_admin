import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { axios } from 'axios'

export default function Login() {
    const initialValues = { email: "", password: "" }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const navigate = useNavigate();

    const login = async (formValues) => {
        axios.post('localhost:8080/login', formValues)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        await login(formValues)
        setIsSubmit(true)
        setFormValues(initialValues)
        // navigate('/users')
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const validate = (values) => {
        const errors = {}
        const emailRegex = new RegExp('/\S+@\S+\.\S+/')

        if (!values.email) {
            errors.email = "Email is a Required Field"
        } else if (!emailRegex.test(values.email)) {
            errors.name = "Invalid Email Address"
        }
        if (!values.password) {
            errors.password = "Password is a Required Field"
        }
        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Successful Login")
        } else {
            console.log(formErrors)
        }
    }, [formErrors, isSubmit]);

    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 class="text-2xl font-bold text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div class="mt-4">
                        <div>
                            <label class="block" for="email">Email</label>
                            <input onChange={changeHandler} type="text" placeholder="Email" value={formValues.email}
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <p class="text-red-500 text-xs italic">{formErrors.email}</p>
                        </div>
                        <div class="mt-4">
                            <label class="block">Password</label>
                            <input onChange={changeHandler} type="password" placeholder="Password" value={formValues.password}
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <p class="text-red-500 text-xs italic">{formErrors.password}</p>
                        </div>
                        <div class="flex items-baseline justify-between">
                            <button type='submit' class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}