import React, { useState } from "react";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    modalStyle? : "blue" | "white"
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose = () => {}, modalStyle = "white", children }: ModalProps)
{
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
            console.log("Modal closed");
        }
    }

    return(
        <div className={`modal-backdiv ${isOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className={`modal-container ${modalStyle}`}>
                <button className="modal-close-button" onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
                {children}
            </div>
        </div>
    )
        
}