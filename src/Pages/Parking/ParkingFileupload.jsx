import * as React from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { Box, styled } from '@mui/joy';
import Badge from '@mui/material/Badge';
import { Typography } from '@mui/material';
import { warningNofity } from '../../Constant/Constant';


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload({
  setSelectedFile,
  setPreview,
  selectedFile,
  preview,
  setPaymentFile,
  setPayPreview,
  paymentFile,
  paypreview,
  current,
  limit
}) {

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const removefile = (index) => {

    if (selectedFile) {
      const newFiles = selectedFile?.filter((_, i) => i !== index);
      const newPreviews = preview?.filter((_, i) => i !== index)
      setSelectedFile(newFiles)
      setPreview(newPreviews)
    }
    if (paymentFile) {
      const newPaymentFile = paymentFile?.filter((_, i) => i !== index);
      const newPaymentreview = paypreview?.filter((_, i) => i !== index)
      setPaymentFile(newPaymentFile)
      setPayPreview(newPaymentreview)
    }
  }

  
  

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    const hasInvalidFiles = Array.from(files).some(
      (file) => !validExtensions.includes(file.type)
    );

    if (hasInvalidFiles) {
      warningNofity("Only JPG, JPEG, and PNG formats are allowed!");
      return;
    }

    const newFiles = Array.from(files);
    const newPreviews = newFiles?.map((file) => URL.createObjectURL(file))

    if( selectedFile && selectedFile?.length + newFiles?.length > 5 -limit ){
      if(limit + selectedFile?.length >= 5) {
        warningNofity(` Maximum files Uploaded.`);
      }else{
        warningNofity(` Only Select ${ 5 - limit} Files.`);
      }  
      return;
    }

    if (selectedFile && selectedFile.length + newFiles.length > 5) {
      warningNofity("You can upload a maximum of 5 files.");
      return;
    }
    if (paymentFile && paymentFile.length + newFiles.length > 2) {
      warningNofity("You can upload a maximum of 2 payment files.");
      return;
    }

    if (selectedFile) {
      setSelectedFile((prev) => [...prev, ...newFiles])
      setPreview((prev) => [...prev, ...newPreviews])
    }

    if (paymentFile) {
      setPaymentFile((prev) => [...prev, ...newFiles])
      setPayPreview((prev) => [...prev, ...newPreviews])
    }
    // Optionally 
    //The below code helps to clean up the object URL on component unmount
    return () => newFiles.forEach((file) => URL.revokeObjectURL(file));;
  };

  return (
    <div>
      <Button
        sx={{ fontSize: { xs: 10, sm: 14, lg: 15 }, mb: 1 }}
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload  Image
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleFileChange(e)} multiple
        />
      </Button>

      <Box
        sx={{
          py:selectedFile?.length > 0  || paymentFile?.length > 0 ? 1 :0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          height:selectedFile?.length > 0  || paymentFile?.length > 0 ? 80 : 0,
           overflowY: 'auto',
           '&::-webkit-scrollbar': {
             display: 'none',
           },
        }}>
        {preview?.map((preview, index) => (
          <StyledBadge
            key={index}
            sx={{
              cursor: 'pointer',
            }} >
            <Box
              sx={{
                width: current? 70 :100,
                height:current? 70 :100 ,
                mb: 1,
                position: 'relative',
              }}>
              <Typography
                onClick={() => removefile(index)}
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  zIndex: 9999,
                  right: -10,
                  top: -10
                }}>
                ❌
              </Typography>
              <img
                src={preview}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                alt={`File preview ${index}`}
              />
            </Box>
          </StyledBadge>
        ))}
        {paypreview?.map((preview, index) =>
        (
          <StyledBadge
            key={index}
            sx={{ cursor: 'pointer' }} >
            <Box
              sx={{
                width: 100,
                height: 100,
                mb: 1,
                position: 'relative',
              }}>
              <Typography
                onClick={() => removefile(index)}
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  zIndex: 9999,
                  right: -10,
                  top: -10
                }}>
                ❌
              </Typography>
              <img
                src={preview}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                alt={`File preview ${index}`}
              />
            </Box>
          </StyledBadge>
        ))}
      </Box>
    </div>
  );
}
