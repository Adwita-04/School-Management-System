import React, { useState } from 'react';
import axios from 'axios';

const AddSchool = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        image: '',
        email_id: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'School name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
        else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Contact must be 10 digits';
        if (!formData.email_id.trim()) newErrors.email_id = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) newErrors.email_id = 'Invalid email format';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            await axios.post('http://localhost:5000/api/schools', formData);
            setSubmitted(true);
            setFormData({
                name: '',
                address: '',
                city: '',
                state: '',
                contact: '',
                image: '',
                email_id: ''
            });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error adding school:', error);
            setErrors({ submit: 'Failed to add school. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    {submitted && (
                        <div className="alert alert-success mb-4" role="alert">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <strong>Success!</strong> School has been added successfully.
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="card shadow-lg">
                        <div className="card-header text-center">
                            <h3 className="mb-0">Add New School</h3>
                            <p className="mb-0 mt-2 opacity-75">Fill in the details below to register a new school</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">School Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter school name"
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email_id ? 'is-invalid' : ''}`}
                                            name="email_id"
                                            value={formData.email_id}
                                            onChange={handleChange}
                                            placeholder="school@example.com"
                                        />
                                        {errors.email_id && <div className="invalid-feedback">{errors.email_id}</div>}
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="form-label">Full Address</label>
                                    <textarea
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        name="address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter complete address"
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Enter city"
                                        />
                                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                    </div>
                                    
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter state"
                                        />
                                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">Contact Number</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder="10 digit mobile number"
                                            maxLength="10"
                                        />
                                        {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                    </div>
                                    
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label">School Image URL</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg (Optional)"
                                        />
                                        <small className="text-muted">Optional: Add a URL to school image</small>
                                    </div>
                                </div>
                                
                                {errors.submit && (
                                    <div className="alert alert-danger mb-4">
                                        {errors.submit}
                                    </div>
                                )}
                                
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Adding School...
                                            </>
                                        ) : (
                                            'Add School'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSchool;
/*EOF className="form-label">Image URL (Optional)</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>
                                
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Adding School...' : 'Add School'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSchool;*/
