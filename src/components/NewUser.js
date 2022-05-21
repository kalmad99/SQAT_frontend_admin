import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { SpinnerCircularFixed } from "spinners-react";
// import StudentContract from "../contracts/AAiTStudent.json";
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
// import { useNavigate } from 'react-router';

export default function NewUser() {
    // const { isInitialized, isWeb3Enabled, account, enableWeb3, Moralis } = useMoralis();
    // const navigate = useNavigate();

    const initialValues = {
        name: "", fname: "", gname: "",
        dept: "", section: "", year: "",
        id: "", email: "", wallet: "", bio: "", profile: null
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [candidate, setCandidate] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    const addUser = async (formValues) => {
        if (candidate) {
            axios.post('localhost:8080/candidates', formValues)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.post('https://940a-197-156-86-37.eu.ngrok.io/voters', {
                name: formValues.name,
                fname: formValues.fname,
                gname: formValues.gname,
                id: formValues.id,
                dept: formValues.dept,
                section: formValues.section,
                year: formValues.year,
                email: formValues.email,
                wallet: formValues.wallet,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const isValidFileUploaded = (file) => {
        const validExtensions = ['png', 'jpeg', 'jpg']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const picHandler = (event) => {
        setFormValues({ ...formValues, profile: event.target.files[0] })
        setIsFilePicked(true)
    }

    const checkCandidate = () => {
        setCandidate(!candidate)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        await addUser(formValues)
        // navigate('/users')
        setFormValues(initialValues)
        // await addUser(user);
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Successful Login")
        } else {
            console.log(formErrors)
        }
    }, [formErrors, isSubmit]);

    const validate = (values) => {
        const errors = {}
        const nameRegex = new RegExp('^[a-zA-Z]{3,20}$')
        const idRegex = new RegExp('^[a-zA-Z]{3}\/[0-9]{4}\/[0-9]{2}$')
        const emailRegex = new RegExp('/\S+@\S+\.\S+/')
        const walletRegex = new RegExp('^0x[a-fA-F0-9]{40}$')

        if (!values.name) {
            errors.name = "Name is a Required Field"
        } else if (!nameRegex.test(values.name)) {
            errors.name = "Invalid Name (Only Upper/Lower Case alphabets 3-20 characters long)"
        }
        if (!values.fname) {
            errors.fname = "Father's Name is a Required Field"
        } else if (!nameRegex.test(values.fname)) {
            errors.fname = "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)"
        }
        if (!values.gname) {
            errors.gname = "Grandfather's Name is a Required Field"
        } else if (!nameRegex.test(values.gname)) {
            errors.gname = "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)"
        }
        if (!values.dept) {
            errors.dept = "Select Department from dropdown"
        }
        if (!values.section) {
            errors.section = "Select Section from dropdown"
        }
        if (!values.year) {
            errors.year = "Select Year from dropdown"
        }
        if (!values.id) {
            errors.id = "ID is a Required Field"
        } else if (!idRegex.test(values.id)) {
            errors.id = "Invalid ID Format (eg. ATR/1234/09)"
        }
        if (!values.email) {
            errors.email = "Email is a Required Field"
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid Email Address"
        }
        if (values.wallet && !walletRegex.test(values.wallet)) {
            errors.wallet = "Invalid Wallet Address (0x followed by 40 hexadecimal characters)"
        }
        if (!values.bio && candidate) {
            errors.bio = "Bio is a Required Field"
        }
        if (values.profile && !isValidFileUploaded(values.profile)) {
            errors.profile = "Invalid Image Type (only png, jpg, jpeg allowed)"
        }
        return errors
    }

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-row align-center content-center py-8 px-4 lg:px-8">
            {/* {isAddNewUserLoading && (
                <div>
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                </div>
            )}
            {addNewUserError && (
                <div>
                    <h2>{addNewUserError.message.split("revert ")[1]}</h2>
                </div>
            )} */}

            <div class="w-[50vw]">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 class="mt-6 mb-6 text-left text-2xl font-extrabold text-gray-900">Add New User</h2>
                </div>
                <form onSubmit={handleSubmit} class="w-full max-w-lg sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                                Name
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" name='name' type="text" value={formValues.name} onChange={changeHandler} />
                            {/* <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text" placeholder="Enter First Name" /> */}
                            <p class="text-red-500 text-xs italic">{formErrors.name}</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-father-name">
                                Father's Name
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-father-name" name="fname" type="text" value={formValues.fname} onChange={changeHandler} />
                            <p class="text-red-500 text-xs italic">{formErrors.fname}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-grand-name">
                                Grandfather's Name
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-grand-name" name="gname" type="text" value={formValues.gname} onChange={changeHandler} />
                            <p class="text-red-500 text-xs italic">{formErrors.gname}</p>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-id">
                                ID
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" name="id" type="text" value={formValues.id} onChange={changeHandler} />
                            <p class="text-red-500 text-xs italic">{formErrors.id}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-dept">
                                Department
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='dept' id="grid-dept" value={formValues.dept} onChange={changeHandler}>
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
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-year">
                                Year
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='year' id="grid-year" value={formValues.year} onChange={changeHandler}>
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
                                <p class="text-red-500 text-xs italic">{formErrors.year}</p>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-section">
                                Section
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-white-200 text-sm text-gray-700 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='section' id="grid-section" value={formValues.section} onChange={changeHandler}>
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
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                Email Address
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='email' id="grid-email" type="email" value={formValues.email} onChange={changeHandler} />
                            {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            <p class="text-red-500 text-xs italic">{formErrors.email}</p>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-3">
                        <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-wallet">
                                Wallet Address
                            </label>
                            <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='wallet' id="grid-wallet" type="text" value={formValues.wallet} onChange={changeHandler} />
                            {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            <p class="text-red-500 text-xs italic">{formErrors.wallet}</p>
                        </div>
                    </div>
                    {candidate && (
                        <div>
                            <hr />
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-bio">
                                        Bio
                                    </label>
                                    <textarea class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none" name='bio' id="grid-bio" value={formValues.bio} onChange={changeHandler} placeholder="Enter Candidate Bio upto 250 characters" rows="4" />
                                    <p class="text-red-500 text-xs italic">{formErrors.bio}</p>
                                </div>
                            </div>
                            <div class="mb-3 w-96">
                                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-pic" >Candidate Picture</label>
                                <input class="appearance-none block w-full bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='profile' id="grid-pic" type="file" onChange={picHandler} />
                                <p class="text-red-500 text-xs italic">{formErrors.profile}</p>
                            </div>
                        </div>
                    )}
                    <div>
                        <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00D05A] hover:bg-[#00D05A]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add User</button>
                    </div>
                    <div class="w-full flex items-start items-center py-3">
                        <input class="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" id="flowbite" aria-describedby="flowbite" type="checkbox" checked={candidate} onChange={checkCandidate} />
                        <label class="text-sm ml-3 font-medium text-gray-900" for="flowbite">User wants to be a Candidate</label>
                    </div>
                </form >
            </div >
        </div >
    );
}