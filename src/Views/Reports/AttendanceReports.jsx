import { Box } from '@mui/joy';
import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from 'react'
import MasterTable from '../CommonComponents/MasterTable';
import { axioslogin } from '../../AxiosConfig/Axiox';
import { errorNofity, warningNofity } from '../../Constant/Constant';
import { getAllAttendaceReport } from '../CommonComponents/useQueryFunctions';
import { useQuery } from '@tanstack/react-query';
import FilterFunctionSkeleton from '../../Components/FilterSkeleton';
import { format } from 'date-fns';
import ReportComponents from '../CommonComponents/ReportComponents';

const Searchskeleton = lazy(() => import("../../Components/Searchskeleton"))
const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))
const SearchComponent = lazy(() => import("../CommonComponents/SearchComponent"))

function AttendanceReports() {

  const apiRef = useRef();
  const [selectedValue, setSelectedValue] = useState('a');
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date());
  const [todayvehicle, setTodayVehicle] = useState([])
  const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
  const [driver, setDriver] = useState("");
  const [driverempid, setDriverEmpid] = useState("")
  const [employeeDetail, setEmployeeDetail] = useState([]);
  const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)

  const handleChange = useCallback(async (event) => {
    setSelectedValue(event.target.value)

    if (event.target.value === 'b') {
      setLoadingBetweenDate(true)
      const postData = { currentDate: format(new Date(), 'yyyy-MM-dd') }
      try {
        const response = await axioslogin.post('/medvallet/getTodayAttendaceReport', postData);
        const { success, data } = response.data;
        if (success === 2) {
          errorNofity("error in fetching data")
          setLoadingBetweenDate(false)
          return
        }
        setLoadingBetweenDate(false)
        setTodayVehicle(data)
      } catch (error) {
        console.log("Error fetching today's vehicles:", error);
      }
      setVehicleBetweenDate([])
      setDriver("")
      setDriverEmpid("")
    }

    if (event.target.value === 'a') {
      setVehicleBetweenDate([])
      setTodayVehicle([])
      setDriver("")
      setDriverEmpid("")
    }

  }, []);

  const driverselection = useCallback((driver) => {
    if (!driver) {
      setSelectedValue('a')
    }
    setDriver(driver);
  }, []);

  const { data: AttendaceReport, isLoading: Attendaceloading } = useQuery({
    queryKey: ['getAllAttendaceReport'],
    queryFn: () => getAllAttendaceReport(),
  });



  const handleEmployeeSearch = useCallback(async () => {
    setSelectedValue("")
    setLoadingBetweenDate(true)
    try {
      const response = await axioslogin.post('/medvallet/getselectedEmployee', {
        driver_id: driverempid
      });
      const { success, data } = response.data;
      if (success === 2) return errorNofity("error in fetching data")
      setEmployeeDetail(data)
      setLoadingBetweenDate(false)
    } catch (err) {
      errorNofity("Error in searching!")
    }
  }, [driverempid])



  const getVehicleFromStartAndEnd = useCallback(async () => {
    setLoadingBetweenDate(true)
    const BothDate = {
      startDate: format(new Date(start), 'yyyy-MM-dd'),
      EndDate: format(new Date(end), 'yyyy-MM-dd'),
    }
    try {
      const response = await axioslogin.post('/medvallet/getAttendaceBetweenDate', BothDate);
      const { success, data } = response.data;
      if (success === 1 && data.length === 0) {
        warningNofity("No data found")
        setLoadingBetweenDate(false)
        return
      }
      setVehicleBetweenDate(data)
      setLoadingBetweenDate(false)
    } catch (error) {
      console.log("Error fetching today's vehicles:", error);
    }
  }, [start, end]);


  const MappingData = selectedValue === 'a' && AttendaceReport ? AttendaceReport
    : selectedValue === 'b' ? todayvehicle
      : selectedValue === 'c' ? vehiclebetweendate
        : employeeDetail

        



  const formattedfinalData = useMemo(() => {
    if (!MappingData) return [];
  
    // Group the data by driver_id, and sort by attendance time
    const groupedData = MappingData
      .sort((a, b) => new Date(a.atendnace_time) - new Date(b.atendnace_time)) // Sort by attendance time
      .reduce((acc, data) => {
        const { driver_id, attendnace_status, atendnace_time, em_name } = data;
  
        // Initialize if the driver doesn't exist yet
        if (!acc[driver_id]) {
          acc[driver_id] = {
            DriverName: em_name,
            CheckInTimes: [],
            CheckOutTimes: [],
          };
        }
  
        // Add times to check-in and check-out arrays based on status
        if (attendnace_status === 'I') {
          acc[driver_id].CheckInTimes.push(atendnace_time);
        } else if (attendnace_status === 'O') {
          acc[driver_id].CheckOutTimes.push(atendnace_time === "9999-12-31 23:59:59" ? "Not Checked Out" : atendnace_time);
        }
  
        return acc;
      }, {});
  
    // Format the grouped data into pairs and generate sequential slNo
    const result = Object.values(groupedData).map((driverData, index) => {
      const { DriverName, CheckInTimes, CheckOutTimes } = driverData;
      const pairs = [];
  
      // Loop through the CheckInTimes and pair them with CheckOutTimes
      const maxCount = Math.max(CheckInTimes.length, CheckOutTimes.length);
      for (let i = 0; i < maxCount; i++) {
        pairs.push({
          slNo: pairs.length + 1, // Sequential number for each pair
          DriverName,
          CheckIn: CheckInTimes[i] || "Not Checked In", // Handle missing check-ins
          Checkout: CheckOutTimes[i] || "Not Checked Out", // Handle missing check-outs
        });
      }
  
      return pairs;
    });
  
    return result.flat().sort((a, b) => a.slNo - b.slNo); // Flatten and sort by slNo
  }, [MappingData]);
  
  
  

  const colDefs = useMemo(
    () => [
      { field: 'slNo', flex: 1 },
      { field: 'DriverName', flex: 1 },
      { field: 'CheckIn', flex: 1 },
      { field: 'Checkout', flex: 1 },
      { field: 'TotalCount', flex: 1 },
    ],
    []
  );

  const download = useCallback(() => {
    if (apiRef.current && apiRef.current.api) {
      apiRef.current.api.exportDataAsCsv();
    }
  }, []);


  return (

    <ReportComponents
      title="Driver Attendace Reports"
      data={[]}
      displayClose={true}
      path={'/Reports/mainpage'}
      onDownload={download}

    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Suspense fallback={<FilterFunctionSkeleton />}>
          <FilterFunction
            start={start}
            end={end}
            selectedValue={selectedValue}
            handleChange={handleChange}
            handleStartDateChange={setStart}
            getVehicleFromStartAndEnd={getVehicleFromStartAndEnd}
            handleEndDateChange={setEnd}
          />
        </Suspense>
        <Suspense fallback={<Searchskeleton />}>
          <SearchComponent
            driverselection={driverselection}
            driver={driver}
            setDriverEmpid={setDriverEmpid}
            handleEmployeeSearch={handleEmployeeSearch}

          />
        </Suspense>
      </Box>

      <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
        <MasterTable
          loading={selectedValue === 'a' ? Attendaceloading : loadingbetweenDate}
          rowData={formattedfinalData}
          columnDefs={colDefs}
          apiRef={apiRef}
        />
      </Paper>
    </ReportComponents>
  )
}

export default memo(AttendanceReports)