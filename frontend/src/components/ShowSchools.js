import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowSchools = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('http://localhost:5000/api/schools');
            setSchools(response.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
            setError('Failed to load schools. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const LoadingSpinner = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading schools...</span>
                    </div>
                    <h4 className="text-muted">Loading Schools</h4>
                    <p className="text-muted">Please wait while we fetch the school data</p>
                </div>
            </div>
        </div>
    );

    const ErrorAlert = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className="flex-grow-1">
                            <h6 className="alert-heading">Error Loading Schools</h6>
                            <p className="mb-2">{error}</p>
                            <button className="btn btn-outline-danger btn-sm" onClick={fetchSchools}>
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const EmptyState = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center py-5">
                    <div className="mb-4">
                        <div className="display-1 text-muted mb-3">📚</div>
                        <h3 className="text-muted mb-3">No Schools Found</h3>
                        <p className="text-muted mb-4">
                            It looks like there are no schools registered yet. 
                            Start by adding your first school to the system.
                        </p>
                        <a href="/add" className="btn btn-primary">
                            Add First School
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    const SchoolCard = ({ school }) => (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <div className="position-relative">
                    {school.image ? (
                        <img
                            src={school.image}
                            className="card-img-top"
                            alt={school.name}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x220/667eea/ffffff?text=School+Image';
                            }}
                        />
                    ) : (
                        <div 
                            className="card-img-top d-flex align-items-center justify-content-center bg-light"
                            style={{ height: '220px' }}
                        >
                            <div className="text-center text-muted">
                                <div className="display-4 mb-2">🏫</div>
                                <small>School Image</small>
                            </div>
                        </div>
                    )}
                    <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-primary">ID: {school.id}</span>
                    </div>
                </div>
                
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">{school.name}</h5>
                    
                    <div className="mb-3">
                        <div className="d-flex align-items-start mb-2">
                            <div className="me-2 mt-1">
                                <svg width="16" height="16" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                            </div>
                            <div>
                                <div className="fw-medium">{school.address}</div>
                                <small className="text-muted">{school.city}, {school.state}</small>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                            <div className="me-2">
                                <svg width="16" height="16" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.97a.678.678 0 0 1-.725-.245L5.717 8.17a.678.678 0 0 1-.245-.725l.569-1.805a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                                </svg>
                            </div>
                            <span className="fw-medium">{school.contact}</span>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <div className="me-2">
                                <svg width="16" height="16" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg>
                            </div>
                            <a 
                                href={`mailto:${school.email_id}`} 
                                className="text-decoration-none"
                                title={`Send email to ${school.name}`}
                            >
                                {school.email_id}
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="card-footer">
                    <small className="text-muted">
                        Registered School • Contact for admissions
                    </small>
                </div>
            </div>
        </div>
    );

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert />;
    if (schools.length === 0) return <EmptyState />;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="mb-1">Registered Schools</h2>
                            <p className="text-muted mb-0">
                                Total of {schools.length} school{schools.length !== 1 ? 's' : ''} registered
                            </p>
                        </div>
                        <div className="d-flex gap-2">
                            <button 
                                className="btn btn-outline-primary"
                                onClick={fetchSchools}
                                title="Refresh school list"
                            >
                                <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                                Refresh
                            </button>
                            <a href="/add" className="btn btn-primary">
                                <svg width="16" height="16" fill="currentColor" className="me-1" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Add School
                            </a>
                        </div>
                    </div>
                    
                    <div className="row">
                        {schools.map((school) => (
                            <SchoolCard key={school.id} school={school} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowSchools;
