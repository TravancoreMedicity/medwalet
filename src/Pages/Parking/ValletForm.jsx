import React, { useCallback, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import { warningNofity, succesNofity } from '../../Constant/Constant'
import { ToastContainer } from 'react-toastify';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import InputFileUpload from './ParkingFileupload';



// const InputFileUpload =  React.lazy(()=>import('./ParkingFileupload'))
const LabourSelectBox = React.lazy(() => import("../../Components/AutoComplete"))


const FormInput = ({ name, placeholder, value, onChange, helperText, error, type }) => {
  return (
    <Box sx={{ width: '100%', minHeight: 40, mb: 1 }}>
      <Typography sx={{ fontSize: 14 }}>{name} :</Typography>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          slotProps={{
            input: {
              onInput: (e) => {
                if (type === 'Number' && e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
                if (type === 'text' && /[^a-zA-Z0-9]/.test(e.target.value)) {
                  e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                }
              },
            },
          }}
          sx={{ fontSize: { xs: 12, sm: 16, md: 15, lg: 16 } }}
        />
        {error && <Typography color="error" variant="body2" sx={{ fontSize: 12 }}>{helperText}</Typography>}
      </Box>
    </Box>
  )
}

const CheckBoxComponent = ({ label, selected, onChange }) => {
  return (
    <Box sx={{ width: '50%', height: '100' }}>
      <Sheet variant="outlined" sx={{ p: 1, borderRadius: 'md', display: 'flex', alignItems: 'center', width: '95%' }}>
        <Checkbox
          label={label}
          checked={selected === label}
          onChange={() => onChange(label)}
          sx={{ fontSize: { xs: 15, sm: 20 }, width: '100%' }}
        />
      </Sheet>
    </Box>
  )
}

const ZoneComponent = ({ zone, selected, onChange }) => {
  return (
    <Box sx={{ width: '100%', minHeight: 40, mb: 1, py: 2, px: 1, borderRadius: 1 }}>
      <Typography sx={{ fontSize: 18 }}>Zone </Typography>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {
          zone?.map((item) => {
            return <Checkbox
              sx={{ boxShadow: 3, bgcolor: '#e5e5e5', py: 1, borderRadius: 3, width: '100%', px: 1 }}
              key={item}
              label={item}
              checked={selected === item}
              onChange={() => onChange(item)}
            />
          })
        }
      </Box>
    </Box>
  )
}

export default function ValletForm({ setOpen }) {

  const [selectedVallet, setSelectedVallet] = useState("");
  const [selectzone, setSelecetZone] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [mobileNoerror, setMobileNoError] = useState("");
  const [vehicleNoerror, setVehicleNoError] = useState("");
  const [selectedFile, setSelectedFile] = useState([])
  const [preview, setPreview] = useState([])
  const [driver, setDriver] = useState("")
  const [drivererror, setDriverError] = useState("")
  //new
  const [selectupivallet, setSelectUpiVallet] = React.useState(null);
  const [paymentFile, setPaymentFile] = React.useState([])
  const [paypreview, setPayPreview] = React.useState([])
  const [paymentid, setPaymentId] = React.useState("")
  const [inputerror, setInputError] = React.useState("")
  const [slotnumber , setSloteNumber] = useState(null)
  const [sloterror , setSlotError] = useState("")
  const [ownername ,setOwnerName] = useState("")
  const [nameeroor,setNameError] = useState("")




  const driverselection = React.useCallback((driver) => {
    if (driver) {
      setDriverError("")
    } else {
      const diverError = handle_DriverSeletction(driver)
      setDriverError(diverError)
    }
    setDriver(driver);
  })


  const handleupipayment = React.useCallback((e) => {
    const value = e.target.value;
    const paymentError = payment_verification(value)
    setPaymentId(value)
    setInputError(paymentError)
  })


  const payment_verification = React.useCallback(() => {
    if (selectupivallet === 'UPI' && paymentid === "") {
      return "Please enter the payment id"
    }
  })

  const handle_DriverSeletction = useCallback(() => {
    if (!driver) return "Please Select the driver"
  })

  const handleCheckboxChange = useCallback((label) => {
    setSelectedVallet(selectedVallet === label ? "" : label);
  })


  const handleCheckboxPayment = React.useCallback((label) => {
    setSelectUpiVallet(selectupivallet === label ? "" : label);
  })
  const handleZoneCheckboxChange = useCallback((label) => {
    setSelecetZone(selectzone === label ? "" : label)
  })

  const handleMobileChange = useCallback((e) => {
    const value = e.target.value;
    setMobileNo(value);
    const mobileError = validate_mobilenumber(value);
    setMobileNoError(mobileError);
  }, [])

  const handleVehicleChange = useCallback((e) => {
    const value = e.target.value;
    setVehicleNo(value.toUpperCase())
    const vehicleError = validate_VehicleNumber(value);
    setVehicleNoError(vehicleError)
  })

  //slot number

  const handleslotnumber = useCallback((e) => {
    const value = e.target.value;
    setSloteNumber(value)
  })

  //owner name 
  const handleownerName = useCallback((e)=>{
    const value = e.target.value;
    setOwnerName(value)
  })

  const validate_mobilenumber = useCallback((mobileNo) => {
    if (!/^\d+$/.test(mobileNo)) {
      return "Please enter a valid Mobile Number"
    }
    if (mobileNo.length < 10) {
      return "Mobile number should be 10 digits long";
    }
    if (!mobileNo.trim()) {
      return 'Vehicle number is required';
    }
    return ''
  })


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



  const resetAll = useCallback(() => {
    setSelecetZone("")
    setMobileNo("")
    setVehicleNo("")
    setSelectedVallet("")
    setSelectedFile([])
    setPreview([])
    succesNofity("Submited successfully")
    setTimeout(() => {
      setOpen(false)
    }, 1000);
  })


  const handlesubmit = useCallback(() => {
    if (!selectedVallet) {
      warningNofity("please select the vallet tye")
      return;
    }
    if (!selectzone) {
      warningNofity("please select the Zone Type")
      return;
    }

    if (!ownername) return setNameError("Pleasa enter Owner Name")
    if (!mobileNo) return setMobileNoError("Pleasa enter mobile number")
    if (!vehicleNo) return setVehicleNoError("Pleasa enter Vehicle number")
    if (!slotnumber) return setSlotError("Enter the slot number")
    if (!driver) return setDriverError("Please Select the driver");
    if (selectedFile.length === 0) {
      warningNofity("Please select the reqiured file")
      return;
    }

    resetAll()
  })

  const zone = [
    "zone1",
    'zone2',
    "zone3",
    'zone4'
  ]
  return (
    <Box sx={{ width: '100%', minHeight: 200, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
      <ToastContainer />
      <Box sx={{ width: { xs: '100%', sm: '100%' }, height: '98%', display: 'flex', alignItems: 'center', flexDirection: 'column', bgcolor: 'white', borderRadius: 2 }}>
        <Box sx={{ width: '100%', minHeight: 200 }}>

          <Box sx={{ width: '100%', height: 30, display: 'flex' }}>
            <CheckBoxComponent
              label="Vallet"
              selected={selectedVallet}
              onChange={handleCheckboxChange}
            />
            <CheckBoxComponent
              label={"Non-Vallet"}
              selected={selectedVallet}
              onChange={handleCheckboxChange}
            />
          </Box>
          <ZoneComponent
            selected={selectzone}
            onChange={handleZoneCheckboxChange}
            zone={zone}
          />
           <FormInput
            name="Owner Name"
            placeholder="Enter Owner name"
            value={ownername}
            onChange={handleownerName}
            error={!!nameeroor}
            helperText={nameeroor}
            type='text'
          />
          {/* change above */}
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
          {/* change below */}
          <FormInput
            name="Token Number"
            placeholder="Enter Slot Number"
            value={slotnumber}
            onChange={handleslotnumber}
            error={!!sloterror}
            helperText={sloterror}
            type='Number'
          />
          <Box sx={{ width: '100%', height: 45, display: 'flex', alignItems: 'center' }}>
            <LabourSelectBox driverselection={driverselection} driver={driver} />
          </Box>
          {drivererror && <Typography variant="body2" sx={{ fontSize: 10, color: 'red' }}>{drivererror}</Typography>}
          <Box sx={{ width: '100%', minHeight: 25, mb: 1 }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', gap: 1 }}>
              <Typography sx={{ fontSize: 15 }}>Payment: </Typography>
              <Typography sx={{ fontSize: 16 }}>{selectedVallet ? (selectedVallet === 'Vallet' ? <Chip color="success" variant="solid" sx={{ px: 2 }}>100 rs</Chip> : <Chip sx={{ px: 2 }} color="danger" variant="solid">No payment</Chip>) : <Chip>select mode</Chip>}</Typography>

            </Box>
          </Box>
          <InputFileUpload
            setSelectedFile={setSelectedFile}
            setPreview={setPreview}
            selectedFile={selectedFile}
            preview={preview}
          />
          <Divider sx={{ mt: 1 }} />
          {/* new goes here  */}
          <Typography variant='h6' sx={{ fontSize: { xs: 11, sm: 14, md: 16, lg: 18 } }}><strong>Payment Details</strong></Typography>
          <Box sx={{ width: '100%', height: 40, display: 'flex',mb:1 }}>
            <CheckBoxComponent
            label={"Cash"}
            selected={selectupivallet}
            onChange={handleCheckboxPayment}
            />
            <CheckBoxComponent
             label={"UPI"}
             selected={selectupivallet}
             onChange={handleCheckboxPayment}
            />
          </Box>
          {
            selectupivallet != null && selectupivallet === 'UPI' &&
            <>
              <InputFileUpload
                setPaymentFile={setPaymentFile}
                setPayPreview={setPayPreview}
                paymentFile={paymentFile}
                paypreview={paypreview}
              />
              <Input
                sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 },mb:2 }}
                placeholder="Enter Transaction Id"
                onChange={handleupipayment}
                value={paymentid}

              />
            </>
          }
          {selectupivallet && selectupivallet === 'UPI' && inputerror && <Typography variant="body2" sx={{ fontSize: 10, color: 'red' }}>{inputerror}</Typography>}
          {
            selectupivallet != null && selectupivallet === 'Cash' &&
            <Input
              sx={{ fontSize: { xs: 11, sm: 16, md: 15, lg: 16 },mb:2 }}
              placeholder="100"
              disabled
            />
          }

          <Button variant="contained" color="success" onClick={handlesubmit} sx={{width:'100%'}}>Submit</Button>
        </Box>
      </Box>
    </Box>
  )
}
