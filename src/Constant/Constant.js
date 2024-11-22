import DOMPurify from "dompurify";
import 'react-toastify/dist/ReactToastify.css';
import { Flip, toast } from 'react-toastify';

export const screenHeight = window.innerHeight;
export const screenWidth = window.innerWidth;


export const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const isValidMobileNumber = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
};

export const isValidOTPMobileNumber = (mobile) => {
    const regex = /^\d{12}$/;
    return regex.test(mobile);
};


export const succesNofity = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const errorNofity = (message) => toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const warningNofity = (message) => toast.warning(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const infoNofity = (message) => toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});


export   const parkingType = [
    { name: "Doctors parking", unique: 1 },
    { name: "Dialysis Parking", unique: 2 },
    { name: "Mosque Parking", unique: 3 },
    { name: "Er Parking", unique: 4 },
    { name: "Temporary Parking", unique: 5 },
    { name: "Vallet", unique: 6 },
    { name: "Non Vallet", unique: 7 }
  ]