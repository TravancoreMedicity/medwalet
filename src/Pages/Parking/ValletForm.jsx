import React, { lazy, useCallback, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@mui/joy/Input';
import { warningNofity, succesNofity, employeeID, errorNofity } from '../../Constant/Constant'
import { ToastContainer } from 'react-toastify';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import { getAllZoneMaster } from '../../Views/CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import { axioslogin } from '../../AxiosConfig/Axiox';
import imageCompression from 'browser-image-compression';





const FormInput = lazy(() => import('../../Components/FormInput'));
const CheckBoxComponent = lazy(() => import('../../Components/CheckBoxComponent'));
const ZoneComponent = lazy(() => import('../../Components/ZoneComponent'));
const InputFileUpload = lazy(() => import('./ParkingFileupload'))
const LabourSelectBox = lazy(() => import("../../Components/AutoComplete"))


export default function ValletForm() {

  const [selectedVallet, setSelectedVallet] = useState(0);
  const [selectzone, setSelecetZone] = useState(null);
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [mobileNoerror, setMobileNoError] = useState("");
  const [vehicleNoerror, setVehicleNoError] = useState("");
  const [selectedFile, setSelectedFile] = useState([])
  const [preview, setPreview] = useState([])
  const [driver, setDriver] = useState("")
  const [drivererror, setDriverError] = useState("")
  const [driver_empid, setDriverEmpid] = useState(null);
  const [selectupivallet, setSelectUpiVallet] = useState(0);
  const [paymentFile, setPaymentFile] = useState([])
  const [paypreview, setPayPreview] = useState([])
  const [paymentid, setPaymentId] = useState("")
  const [inputerror, setInputError] = useState(null)
  const [tokennumber, setTokenNumber] = useState(null)
  const [sloterror, setSlotError] = useState("")
  const [ownername, setOwnerName] = useState("")
  const [nameeroor, setNameError] = useState("")
  const [flag, setFlag] = useState(0);
  const [paymentattachment, setPaymentAttachMent] = useState("")

  

 

  //fetching all the Zone from the zone master
  const { success, data: allzonemaster, refetch } = useQuery({
    queryKey: ['allzonemaster'],
    queryFn: () => getAllZoneMaster(),
  })

  //current the driver seletion is static because the driver master is not yet created
  const driverselection = useCallback((driver) => {
    if (driver) {
      setDriverError("")
    } else {
      const diverError = handle_DriverSeletction(driver)
      setDriverError(diverError)
    }
    setDriver(driver);
  })


  //payment validataion
  const handleupipayment = useCallback((e) => {
    const value = e.target.value;
    const paymentError = payment_verification(value)
    setPaymentId(value)
    setInputError(paymentError)
  })


  //payment validataion Fun
  const payment_verification = useCallback(() => {
    if (selectupivallet === 1 && paymentid === null) {
      return "Please enter the payment id"
    }
  })

  
  //Driver validataion Fun
  const handle_DriverSeletction = useCallback(() => {
    if (!driver) return "Please Select the driver"
  })


  //Handle Mobile number
  const handleMobileChange = useCallback((e) => {
    const value = e.target.value;
    setMobileNo(value);
    const mobileError = validate_mobilenumber(value);
    setMobileNoError(mobileError);
  }, [])

    //Handle vehicle  number
  const handleVehicleChange = useCallback((e) => {
    const value = e.target.value;
    setVehicleNo(value.toUpperCase())
    const vehicleError = validate_VehicleNumber(value);
    setVehicleNoError(vehicleError)
  })


  //Handle Mobile number validation Fun
  const validate_mobilenumber = useCallback((mobileNo) => {
    if (!/^\d+$/.test(mobileNo)) {
      return "Please enter a valid Mobile Number"
    }
    if (mobileNo.length < 10) {
      return "Mobile number should be 10 digits long";
    }
    if (!mobileNo.trim()) {
      return 'Mobile number is required';
    }
    return ''
  })


  //Handle Vehicle number validation Fun
  const validate_VehicleNumber = useCallback((vehicleNo) => {
    if (!vehicleNo.trim()) {
      return 'Vehicle number is required';
    }
    const regex = /^[A-Za-z0-9\s]+$/;
    if (!regex.test(vehicleNo)) {
      return 'Vehicle number must not contain special characters';
    }
    return '';
  })


  //reset Fun to reset all the fields once insertion is completed
  const resetAll = useCallback(() => {
    setSelecetZone(null);
    setOwnerName("");
    setMobileNo("");
    setVehicleNo("");
    setSelectedVallet(0);
    setSelectedFile([]);
    setPreview([]);
    setVehicleNo("");
    setPaymentId("");
    setDriver("");
    setDriverEmpid(null)
    setTokenNumber(null)
    setSelectUpiVallet(0)
    setPaymentFile([]);
    setPayPreview([]);
  })


  //storing insertdata as object for sending to server
  const insertdata = useMemo(() => {
    return {
      vallet_type: selectedVallet,
      zone_slno: selectzone,
      owner_name: ownername,
      mobile_number: mobileNo,
      vehicle_number: vehicleNo,
      token_number: tokennumber,
      driver_emid: driver_empid,
      attachment_name: paymentattachment,
      payment_type: selectupivallet,
      upi_payment_transactionid: paymentid,
      create_user: employeeID()

    }
  }
    , [selectedVallet, selectzone, ownername, mobileNo, vehicleNo, tokennumber, driver_empid, paymentattachment, selectedFile, selectupivallet, paymentattachment, paymentid, paymentFile])

//This peace of code is used to reduce the size of the image 
  const handleImageCompression = useCallback(async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, []);

  //Handling formsubmission
  const handlesubmit = useCallback(async () => {
    if (selectedVallet === null) return warningNofity("please select the vallet type");
    if (selectzone === null) return warningNofity("please select the Zone Type");
    if (!ownername) return setNameError("Pleasa enter Owner Name");
    if (!mobileNo) return setMobileNoError("Pleasa enter mobile number");
    if (!vehicleNo) return setVehicleNoError("Pleasa enter Vehicle number");
    if (!tokennumber) return setSlotError("Enter the token number");
    if (!driver) return setDriverError("Please Select the driver");
    if (selectedFile.length === 0) return warningNofity("Please upload vehicle images");
    if (selectupivallet === 2 && !paymentid) return setInputError("Please enter the transaction id");
    if (selectupivallet === 2 && paymentFile.length === 0) return warningNofity("upload transaction screenshot");

    try {
      //inserting vehicle data 
      const response = await axioslogin.post("/medvehilces/createnewregistration", insertdata)
        .then((response) => { return response }).catch((error) => { return error });
      const data = response.data;
      if (data.success === 2) {
        errorNofity("Error in inserting Data")
      } else {
        try {
          //vehicle image 
          const formData = new FormData();
          formData.append('id', data.insertId);
          Object.entries(insertdata).forEach(([key, value]) => {
            formData.append(key, value)
          }); 
          if (selectedFile.length > 0) {
            selectedFile.forEach((file) => {
              formData.append('files', file)
            });
          }

          //Payment Image
          const paymentformData = new FormData();
          paymentformData.append('id', data.insertId);
          if (paymentFile.length > 0) {
            paymentFile.forEach((file) => {
              paymentformData.append('files', file)
            })
          }

          //once the insertion returns a success status then this will triger .the Promise ensure both work properly 
          const [InserVehicletImage, InsertPaymentImage] = await Promise.all([
            axioslogin.post("/medvehilces/vehicleImageUpload", formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
            paymentFile.length > 0
              ? axioslogin.post("/medvehilces/PatmentImageUpload", paymentformData, { headers: { 'Content-Type': 'multipart/form-data' } })
              : null
          ]);

          const vehicle_result = InserVehicletImage.data;
          const payment_result = InsertPaymentImage?.data;
          

          //throwing error in the case of error
          if (vehicle_result.success === 2 || (payment_result && payment_result.success === 2)) {
            errorNofity("Error in uploading files");
          } else {
            succesNofity("Inserted successfully");
            resetAll();
          }
        } catch (error) {
          warningNofity('An error occurred during file upload.');
          throw new Error(error)
        }
      }
    } catch (err) {
      warningNofity('An error occurred during Inserting data.');
      throw new Error(err)
    }
  }, [insertdata])

  return (
    <Box sx={{ width: '100%', minHeight: 200, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />
      <Box sx={{ width: { xs: '100%', sm: '100%' }, height: '98%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: 'white', borderRadius: 2 }}>
        <Box sx={{ width: '100%', minHeight: 200 }}>

          <Box sx={{ width: '100%', height: 30, display: 'flex' }}>
            <CheckBoxComponent
              label="Vallet"
              selected={selectedVallet}
              value={1}
              onChange={(value) => setSelectedVallet((prevValue) => (prevValue === value ? null : value))}
            />
            <CheckBoxComponent
              label={"Non-Vallet"}
              selected={selectedVallet}
              value={2}
              onChange={(value) => setSelectedVallet((prevValue) => (prevValue === value ? null : value))}
            />
          </Box>
          <ZoneComponent
            selected={selectzone}
            onChange={(value) => setSelecetZone(selectzone === value ? null : value)}
            zone={allzonemaster}
          />
          <FormInput
            name="Owner Name"
            placeholder="Enter Owner name"
            value={ownername}
            onChange={(e) => {
              setOwnerName(e.target.value)
              setPaymentAttachMent(e.target.value+"image")
            }}
            error={!!nameeroor}
            helperText={nameeroor}
            type='text'
          />
          <FormInput
            name="Mobile Number"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={handleMobileChange}
            error={!!mobileNoerror}
            helperText={mobileNoerror}
            type='Number'
          />

          <FormInput
            name="Vehicle Number"
            placeholder="Enter Vehicle Number"
            value={vehicleNo}
            onChange={handleVehicleChange}
            error={!!vehicleNoerror}
            helperText={vehicleNoerror}
            type='text'
          />
          <FormInput
            name="Token Number"
            placeholder="Enter Token Number"
            value={tokennumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            error={!!sloterror}
            helperText={sloterror}
            type='Number'
          />
          <Box sx={{ width: '100%', height: 45, display: 'flex', alignItems: 'center' }}>
            <LabourSelectBox driverselection={driverselection} driver={driver} setDriverEmpid={setDriverEmpid} />
          </Box>
          {drivererror && <Typography variant="body2" sx={{ fontSize: 10, color: 'red' }}>{drivererror}</Typography>}
          <Box sx={{ width: '100%', minHeight: 25, mb: 1 }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 1 }}>
              <Typography sx={{ fontSize: 15 }}>Payment: </Typography>
              <Box sx={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 1 }}>
                {selectedVallet !== null && selectedVallet === 1 ? (
                  <Chip color="success" variant="solid" sx={{ px: 2 }}>100 rs</Chip>
                ) : selectedVallet === 2 ? (
                  <Chip color="danger" variant="solid" sx={{ px: 2 }}>No payment</Chip>
                ) : (
                  <Chip>select mode</Chip>
                )}
              </Box>
            </Box>
          </Box>
          <InputFileUpload
            setSelectedFile={setSelectedFile}
            setPreview={setPreview}
            selectedFile={selectedFile}
            preview={preview}
          />
          <Divider sx={{ mt: 1 }} />
          <Typography variant='h6' sx={{ fontSize: { xs: 11, sm: 14, md: 16, lg: 18 } }}><strong>Payment Details</strong></Typography>
          <Box sx={{ width: '100%', height: 40, display: 'flex', mb: 1 }}>
            <CheckBoxComponent
              label={"Cash"}
              selected={selectupivallet}
              onChange={(value) => setSelectUpiVallet((prevValue) => (prevValue === value ? null : value))}
              value={1}
            />
            <CheckBoxComponent
              label={"UPI"}
              selected={selectupivallet}
              onChange={(value) => setSelectUpiVallet((prevValue) => (prevValue === value ? null : value))}
              value={2}
            />
          </Box>
          {
            selectupivallet != null && selectupivallet === 2 &&
            <>
              <InputFileUpload
                setPaymentFile={setPaymentFile}
                setPayPreview={setPayPreview}
                paymentFile={paymentFile}
                paypreview={paypreview}
              />
              <Input
                sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 }, mb: 1 }}
                placeholder="Enter Transaction Id"
                onChange={handleupipayment}
                value={paymentid}

              />
            </>
          }
          {selectupivallet && selectupivallet === 2 && inputerror ? <Typography variant="body2" sx={{ fontSize: 10, color: 'red', mb: 1 }}>{inputerror}</Typography> : null}
          {
            selectupivallet != null && selectupivallet === 1 &&
            <>
              <Input
                sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 }, mb: 2 }}
                placeholder="100rs"
                disabled
              />
            </>
          }
          <Button variant="contained" color="success" onClick={handlesubmit} sx={{ width: '100%' }}>Submit</Button>
        </Box>
      </Box>
    </Box>
  )
}
