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

export const validateId = (value) => {
    const regex = /^\d+$/;
    return value != null && regex.test(String(value));

}

export const sanitizeToNumbers = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

export const isValidMobileNumber = (mobile) => {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
};

export const isValidOTPMobileNumber = (mobile) => {
    const regex = /^\d{12}$/;
    return regex.test(mobile);
};

export const isValidVehicleNumber = (vehicleNo) => {
    // const regex = /^[A-Za-z0-9\s]+$/;
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(vehicleNo);
};
// validators.js


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


export const parkingType = [
    { name: "Doctors parking", unique: 1 },
    { name: "Dialysis Parking", unique: 2 },
    { name: "Mosque Parking", unique: 3 },
    { name: "Er Parking", unique: 4 },
    { name: "Temporary Parking", unique: 5 },
    { name: "Vallet", unique: 6 },
    { name: "Non Vallet", unique: 7 }
]


export const employeeID = () => {
    const userinfo = sessionStorage.getItem('userDetl');
    const employeeID = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empid : 0;
    return employeeID;
};
