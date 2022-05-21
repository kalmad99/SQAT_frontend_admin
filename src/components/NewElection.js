import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function NewElection() {
    const initialValues = {
        dept: "", section: "", batch: "",
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const addElection = async (formValues) => {
        axios.post('localhost:8080/elections', formValues)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const validate = (values) => {
        const errors = {}
        
        if (!values.dept) {
            errors.dept = "Select Department from dropdown"
        }
        if (!values.section) {
            errors.section = "Select Section from dropdown"
        }
        if (!values.batch) {
            errors.batch = "Select Year from dropdown"
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        await addElection(formValues)
        // navigate('/users')
        setFormValues(initialValues)
        // await addUser(user);
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Successful Election Addition")
        } else {
            console.log(formErrors)
        }
    }, [formErrors, isSubmit]);

    return (
        <div class="min-h-screen w-full bg-white-800 flex items-center py-8 px-4 lg:px-8">
            <div class="w-[50vw] bg-white-800 ">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 class="mt-6 mb-6 text-left text-2xl font-extrabold text-gray-900">Add New Election</h2>
                </div>
                <form onSubmit={handleSubmit} class="w-full max-w-lg sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                Department:
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-[#C4C4C4] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-dept" name='dept' value={formValues.dept} onChange={changeHandler}>
                                    <option value="" selected disabled hidden>--Select--</option>
                                    <option value={1}>Software Engineering</option>
                                    <option value={2}>Biomedical Engineering</option>
                                    <option value={3}>Chemical Engineering</option>
                                    <option value={4}>Civil Engineering</option>
                                    <option value={5}>Electrical Engineering</option>
                                    <option value={6}>Mechanical Engineering</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <p class="text-red-500 text-xs italic">{formErrors.dept}</p>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-batch">
                                Batch:
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-[#C4C4C4] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-batch" name='batch' value={formValues.batch} onChange={changeHandler}>
                                    <option value="" selected disabled hidden>--Select--</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <p class="text-red-500 text-xs italic">{formErrors.batch}</p>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                Section:
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-[#C4C4C4] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-section" name='section' value={formValues.section} onChange={changeHandler}>
                                    <option value="" selected disabled hidden>--Select--</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            <p class="text-red-500 text-xs italic">{formErrors.section}</p>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="w-full py-2 px-4 mt-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00D05A] hover:bg-[#00D05A]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Election</button>
                    </div>
                </form >
            </div >
        </div>
    );
}