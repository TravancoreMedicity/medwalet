import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@mui/joy/Input';
import {
    warningNofity,
    succesNofity,
    employeeID,
    errorNofity,
    isValidMobileNumber,
    isValidVehicleNumber
} from '../../Constant/Constant'
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import { getAllSlotMaster, HandleImageCompression } from '../../Views/CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import { axioslogin } from '../../AxiosConfig/Axiox';


const defaulimage = require('../../assets/parking/defaultnoimag.jpeg')

const FormInput = lazy(() => import('../../Components/FormInput'));
const CheckBoxComponent = lazy(() => import('../../Components/CheckBoxComponent'));
const ZoneComponent = lazy(() => import('../../Components/ZoneComponent'));
const InputFileUpload = lazy(() => import('../Parking/ParkingFileupload'))
const LabourSelectBox = lazy(() => import("../../Components/AutoComplete"))


export default function ValletForm({ refetch, allvehicles, setOpen }) {


    const [selectedFile, setSelectedFile] = useState([]);
    const [preview, setPreview] = useState([]);
    const [paymentFile, setPaymentFile] = useState([]);
    const [paypreview, setPayPreview] = useState([]);
    const [driver, setDriver] = useState("");
    const [drivererror, setDriverError] = useState("");
    const [slotnumber, setSlotNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        selectedVallet: 1,
        selectZone: 0,
        ownerName: "",
        mobileNo: "",
        vehicleNo: "",
        tokenNumber: "",
        paymentid: "",
        selectupivallet: 0,
        driver_empid: 0
    });
    const [formErrors, setFormErrors] = useState({
        mobileNoError: "",
        vehicleNoError: "",
        nameError: "",
        slotError: "",
        inputError: "",
        tokenError: ""
    });




    const validate_mobilenumber = useCallback((mobileNo) => {
        if (!isValidMobileNumber(mobileNo)) return "Mobile number should be 10 digits long"
        return ''
    },[])
    const validate_VehicleNumber = useCallback((vehicleNo) => {
        if (!isValidVehicleNumber(vehicleNo)) return 'No contain special characters and Spaces';
        if (vehicleNo.length > 15) return 'Enter a valid Vehicle number'
        return '';
    },[])

    //handle all states
    const handleInputChange = useCallback((e, field) => {
        const { value } = e.target;
        const updatedValue = field === 'vehicleNo' ? value.toUpperCase() : value;
        setFormData((prevData) => ({ ...prevData, [field]: value }));
        setFormData((prevData) => ({ ...prevData, [field]: updatedValue }));

        if (field === 'mobileNo') {
            const mobileError = validate_mobilenumber(value);
            setFormErrors((prevState) => ({ ...prevState, mobileNoError: mobileError }));
        }

        if (field === 'vehicleNo') {
            const vehicleError = validate_VehicleNumber(value);
            setFormErrors((prevState) => ({ ...prevState, vehicleNoError: vehicleError }));
        }
        if (field === 'paymentid') {
            setFormErrors((prevState) => ({ ...prevState, inputError: value.trim() ? "" : "Transaction id is required" }));
        }
        if (field === 'tokenNumber') {
            setFormErrors((prevState) => ({ ...prevState, tokenError: value.trim() ? "" : "Token Number  is required" }));
        }
    }, [validate_mobilenumber, validate_VehicleNumber]);




    //current the driver seletion is static because the driver master is not yet created
    const driverselection = useCallback((driver) => {
        if (driver) {
            setDriverError("");
        } else {
            warningNofity("Please Select the driver")
            setDriverError("Please Select the driver");
        }
        setDriver(driver);
    }, []);


    //fetching all the Zone from the zone master
    const { data: allslotMaster } = useQuery({
        queryKey: ['allslotMaster'],
        queryFn: () => getAllSlotMaster(),
    })


    //reset function which calls once the insertion throws a success message
    const resetAll = useCallback(() => {
        setFormData({
            selectedVallet: 0,
            selectZone: 0,
            ownerName: "",
            mobileNo: "",
            vehicleNo: "",
            tokenNumber: "",
            paymentid: "",
            selectupivallet: 0,
            driver_empid: 0
        });
        setSelectedFile([]);
        setPaymentFile([]);
        setPreview([]);
        setPayPreview([])
        setDriver("")
        setSlotNumber(0)
    }, []);


    const insertdata = useMemo(() => {
        return {
            vallet_type: formData.selectedVallet,
            zone_slno: formData.selectZone,
            owner_name: formData.ownerName,
            mobile_number: formData.mobileNo,
            vehicle_number: formData.vehicleNo,
            slot_number: slotnumber,
            token_number: formData.tokenNumber,
            driver_emid: formData.driver_empid,
            attachment_name: formData.paymentAttachment,
            payment_type: formData.selectupivallet,
            upi_payment_transactionid: formData.paymentid,
            create_user: employeeID()
        }
    }, [formData.selectedVallet, formData.selectZone, formData.ownerName, formData.mobileNo, formData.vehicleNo, slotnumber, formData.driver_empid, formData.selectupivallet, formData.paymentAttachment, formData.paymentid, formData.tokenNumber])



    //validation function which checks all the required or mandatory fields are mentioned and created as per the reqiurements
    const validateForm = useCallback(() => {
        let hasError = false;
        const hasFormErrors = Object.values(formErrors).some(error => error !== "");
        if (hasFormErrors) {
            hasError = true
        }
        if (formData.selectedVallet === 0) {
            warningNofity("Please select the vallet type");
            hasError = true;
        }
        if (formData.selectZone === 0) {
            warningNofity("Please select the Zone Type");
            hasError = true;
        }
        // if (!formData.ownerName) {
        //     setFormErrors((prevErrors) => ({
        //         ...prevErrors,
        //         nameError: "Please enter Owner Name"
        //     }));
        //     warningNofity("Please enter Owner Name")
        //     hasError = true;
        // }
        if (!formData.mobileNo) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                mobileNoError: "Please enter mobile number"
            }));
            warningNofity("Please enter mobile number")
            hasError = true;
        }
        if (!formData.vehicleNo) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                vehicleNoError: "Please enter Vehicle number"
            }));
            warningNofity("Please enter Vehicle number")
            hasError = true;
        }

        if (!formData.tokenNumber || formData.tokenNumber === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                tokenError: "Please enter Token number"
            }));
            warningNofity("Please enter Token number")
            hasError = true;
        }
        if (slotnumber === 0 && !slotnumber) {
            warningNofity("Select the Slot number")
            hasError = true;
        } else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                slotError: ""
            }));
            hasError = false;
        }

        if (!driver) {
            setDriverError("Please Select the driver");
            hasError = true;
        }
        if (formData.selectedVallet === 1 && formData.selectupivallet === 0) {
            warningNofity("Please select the payment type");
            hasError = true;
        }
        if (formData.selectupivallet === 2 && paymentFile.length === 0) {
            warningNofity("Upload transaction screenshot");
            hasError = true;
        }
        if (formData.selectupivallet === 2 && formData.paymentid === "") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                inputError: "Please enter the transaction id"
            }));
            warningNofity("Please enter the transaction id");
            hasError = true;
        }
        return hasError;

    }, [formData,  paymentFile, driver, slotnumber,formErrors]);


    //Insertion of new data in our case the vehicle information
    const handlesubmit = useCallback(async () => {
        if (validateForm()) return;
        try {

            setIsLoading(true);
            const defaultnoimage = new File([defaulimage], "defaultnoimage.png", { type: 'image/png' });

            const compressedVehicleImage = selectedFile.length > 0 ? await HandleImageCompression(selectedFile) : [defaultnoimage];

            const compressedPaymentFile = await HandleImageCompression(paymentFile);
            const formData = new FormData()
            formData.append('postData', JSON.stringify(insertdata))

            // the map is used to send multiple files 
            if (compressedVehicleImage.length > 0) {
                compressedVehicleImage?.map((file) => {
                    const newFileName = selectedFile.length > 0
                        ? `vehicle_${file.name}`
                        : `default_vehicle_${file.name}`; // New file name for default image
                    formData.append('files', new File([file], newFileName, { type: file.type }));
                    return null
                });
            }

            if (paymentFile.length > 0) {
                compressedPaymentFile?.map((file) => {
                    const newFileName = `payment_${file.name}`;
                    formData.append('files', new File([file], newFileName, { type: file.type }));
                    return null
                });
            }

            const response = await axioslogin.post('/medvehilces/createPracticeRegistraion', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { success, message } = response.data;
            if (success === 3) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    tokenError: message
                }));
                warningNofity(message)
                setIsLoading(false)
                return
            }
            if (success === 2) return errorNofity("Error in inserting Data!")
            succesNofity("Inserted Successfully");
            setIsLoading(false)
            resetAll();
            refetch();
            setOpen(false)

        } catch (err) {
            console.log(err);
            warningNofity('An error occurred during Inserting data.');
        }
    }, [insertdata, selectedFile, paymentFile, refetch,resetAll,setOpen,validateForm])

    return (
        <Box sx={{
            width: '100%',
            minHeight: 200,
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box
                sx={{
                    width: { xs: '100%', sm: '100%' },
                    height: '98%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    bgcolor: 'white',
                    borderRadius: 2
                }}>
                <Box sx={{ width: '100%', minHeight: 200 }}>

                    <Box sx={{ width: '100%', height: 30, display: 'flex' }}>
                        <Suspense fallback="loading">
                            <CheckBoxComponent
                                label="Vallet"
                                selected={formData.selectedVallet}
                                onChange={(val) => setFormData({ ...formData, selectedVallet: val !== formData.selectedVallet ? val : 0 })}
                                value={1}
                            />
                        </Suspense>
                        <Suspense fallback="loading">
                            <CheckBoxComponent
                                label={"Non-Vallet"}
                                selected={formData.selectedVallet}
                                onChange={(val) => setFormData({ ...formData, selectedVallet: val !== formData.selectedVallet ? val : 0 })}
                                value={2}
                            />
                        </Suspense>
                    </Box>
                    <Suspense fallback="loading">
                        <ZoneComponent
                            allvehicles={allvehicles}
                            slotselect={formData.selectZone}
                            setSlotNumber={setSlotNumber}
                            zone={allslotMaster}
                            selected={formData.selectZone}
                            onChange={(val) => {
                                setFormData({ ...formData, selectZone: val !== formData.selectZone ? val : 0 })
                                if (formData.selectZone) {
                                    setSlotNumber(0);
                                }
                            }
                            }

                        />
                    </Suspense>
                    <Suspense fallback="loading">
                        <FormInput
                            name="Owner Name(optional)"
                            placeholder="Owner name(optional)"
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange(e, 'ownerName')}
                            error={!!formErrors.nameError}
                            helperText={formErrors.nameError}
                            type='text'
                        />
                    </Suspense>
                    <Suspense fallback="loading">
                        <FormInput
                            name="Mobile Number"
                            placeholder="Enter Mobile Number"
                            value={formData.mobileNo}
                            onChange={(e) => handleInputChange(e, 'mobileNo')}
                            error={!!formErrors.mobileNoError}
                            helperText={formErrors.mobileNoError}
                            type='Number'
                        />
                    </Suspense>
                    <Suspense fallback="loading">
                        <FormInput
                            name="Vehicle Number"
                            placeholder="Enter Vehicle Number"
                            value={formData.vehicleNo}
                            onChange={(e) => handleInputChange(e, 'vehicleNo')}
                            error={!!formErrors.vehicleNoError}
                            helperText={formErrors.vehicleNoError}
                            type='text'
                        />
                    </Suspense>
                    <Suspense fallback="loading">
                        <FormInput
                            name="Token Number"
                            placeholder="Enter Token Number"
                            value={formData.tokenNumber}
                            onChange={(e) => handleInputChange(e, 'tokenNumber')}
                            error={!!formErrors.tokenError}
                            helperText={formErrors.tokenError}
                            type='Number'
                        />
                    </Suspense>
                    <Box sx={{ width: '100%', height: 45, display: 'flex', alignItems: 'center' }}>
                        <Suspense fallback="loading">
                            <LabourSelectBox
                                driverselection={driverselection}
                                driver={driver}
                                setDriverEmpid={(val) => {
                                    setFormData({
                                        ...formData,
                                        driver_empid: val
                                    });
                                }}
                            />
                        </Suspense>
                    </Box>
                    {drivererror &&
                        <Typography variant="body2" sx={{ fontSize: 10, color: 'red' }}>
                            {drivererror}
                        </Typography>}
                    <Box sx={{ width: '100%', minHeight: 25, mb: 1 }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                gap: 1
                            }}>
                            <Typography sx={{ fontSize: 15 }}>Payment: </Typography>
                            <Box sx={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 1 }}>
                                {formData.selectedVallet !== 0 && formData.selectedVallet === 1 ? (
                                    <Chip color="success" variant="solid" sx={{ px: 2 }}>₹100</Chip>
                                ) : formData.selectedVallet === 2 ? (
                                    <Chip color="danger" variant="solid" sx={{ px: 2 }}>No payment</Chip>
                                ) : (
                                    <Chip>select mode</Chip>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Suspense fallback="loading">
                        <InputFileUpload
                            setSelectedFile={setSelectedFile}
                            setPreview={setPreview}
                            selectedFile={selectedFile}
                            preview={preview}
                        />
                    </Suspense>
                    {
                        formData.selectedVallet && formData.selectedVallet === 1 ? (
                            <>
                                <Divider sx={{ mt: 1 }} />
                                <Typography
                                    variant='h6'
                                    sx={{ fontSize: { xs: 11, sm: 14, md: 16, lg: 18 } }}>
                                    <strong>Payment Details</strong>
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: 40,
                                        display: 'flex',
                                        mb: 1
                                    }}>
                                    <Suspense fallback="loading">
                                        <CheckBoxComponent
                                            label={"Cash"}
                                            selected={formData.selectupivallet}
                                            value={1}
                                            onChange={(val) => {
                                                setFormData({
                                                    ...formData,
                                                    selectupivallet: val !== formData.selectupivallet ? val : 0,
                                                    paymentid: "",
                                                });
                                                setPayPreview([]);
                                                setPaymentFile([])
                                                setFormErrors((prevState) => ({ ...prevState, inputError: "" }));
                                            }}
                                        />
                                    </Suspense>
                                    <Suspense fallback="loading">
                                        <CheckBoxComponent
                                            label={"UPI"}
                                            value={2}
                                            selected={formData.selectupivallet}
                                            onChange={(val) => setFormData({ ...formData, selectupivallet: val !== formData.selectupivallet ? val : 0 })}
                                        />
                                    </Suspense>
                                </Box>
                                {
                                    formData.selectupivallet !== 0 && formData.selectupivallet === 2 &&
                                    <>
                                        <Suspense fallback="loading">
                                            <InputFileUpload
                                                setPaymentFile={setPaymentFile}
                                                setPayPreview={setPayPreview}
                                                paymentFile={paymentFile}
                                                paypreview={paypreview}
                                            />
                                        </Suspense>
                                        <Input
                                            sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 }, mb: 1 }}
                                            placeholder="Enter Transaction Id"
                                            value={formData.paymentid}
                                            onChange={(e) => handleInputChange(e, 'paymentid')}
                                        />
                                    </>
                                }
                                {formData.selectupivallet && formData.selectupivallet === 2 && formErrors.inputError ? <Typography variant="body2" sx={{ fontSize: 10, color: 'red', mb: 1 }}>{formErrors.inputError}</Typography> : null}
                                {
                                    formData.selectupivallet != null && formData.selectupivallet === 1 &&
                                    <>
                                        <Input
                                            sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 }, mb: 2 }}
                                            placeholder="₹100"
                                            value={"₹100"}
                                            disabled
                                        />
                                    </>
                                }
                            </>
                        ) : (
                            <>

                            </>
                        )
                    }
                    <Button
                        disabled={isLoading}
                        variant="contained"
                        color="success"
                        onClick={handlesubmit}
                        sx={{ width: '100%' }}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

