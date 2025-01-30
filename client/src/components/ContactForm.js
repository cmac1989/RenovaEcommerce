import '../styles/contactForm.css';
import FormModal from "./FormModal";
import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';

export default function ContactForm() {
    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    // State for validation messages
    const [validated, setValidated] = useState(false);
    // State form validation
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        // First name validation
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        } else if(formData.firstName.length < 3) {
            newErrors.firstName = 'First name must be at least 3 characters long';
        }
        // Last name validation
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        } else if(formData.lastName.length < 3) {
            newErrors.lastName = 'Last name must be at least 3 characters long';
        }
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        // Textarea validation
        if(!formData.message) {
            newErrors.message = 'Message is required';
            console.log(formData.message.length)
        } else if(formData.message.length < 10) {
            newErrors.message = 'Comment is not long enough';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (validateForm()) {
            const response = await fetch("http://localhost:3306/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: formData.email,
                    subject: `Message from ${formData.firstName} ${formData.lastName}`,
                    text: formData.message,
                }),
            });

            const data = await response.json();
            alert(data.message);
            setShowModal(true);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } else {
            console.log("Form has errors");
        }

    };
    return (
        <div>
            <Form className="contact-form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span>{errors.email}</span>}
                </Form.Group>
                <Form.Group controlId="formTextarea">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        placeholder="Leave a comment here"
                        name="message"
                        style={{ height: '100px', margin: '15px 0 0 0' }}
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && <span>{errors.message}</span>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {/*<FormModal*/}
            {/*    show={showModal}*/}
            {/*    onHide={() => setShowModal(false)}*/}
            {/*/>*/}
        </div>
    );
}