import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

// Modal component
const ReportModal = ({ onClose, onSubmit, modalParam }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputValue, modalParam.id);
        onClose();
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" style={{ backgroundColor: '#ffe499', border:'2px solid black', boxShadow: '0px 10px 30px rgba(0, 0, 0, 1)' }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Report {modalParam.firstName + " " + modalParam.lastName}</h5>
                        <Button type="button" className="close btn-danger" onClick={onClose}>
                            <span>&times;</span>
                        </Button>
                    </div>
                    <div className="modal-body">
                        <input type="text" value={inputValue} onChange={handleInputChange} className="form-control form-control-lg" />
                    </div>
                    <div className="modal-footer">
                        <Button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;