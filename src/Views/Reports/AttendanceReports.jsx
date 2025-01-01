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


  //Grouping the driver with the first checkin and out time
  let checkInTracker = {};
  let slNoCounter = 1;

  const pairedData = MappingData?.map((entry) => {
    const { driver_id, atendnace_time, attendnace_status, em_name } = entry;

    if (attendnace_status === 'I') {
      checkInTracker[driver_id] = { time: atendnace_time, em_name };
      return null;
    } else if (attendnace_status === 'O') {
      if (checkInTracker[driver_id]) {
        const checkIn = checkInTracker[driver_id];
        delete checkInTracker[driver_id];
        return {
          slNo: slNoCounter++,
          DriverName: em_name,
          CheckIn: checkIn.time,
          Checkout: atendnace_time
        };
      } else {
        return {
          slNo: slNoCounter++,
          DriverName: em_name,
          CheckIn: null,
          Checkout: atendnace_time
        };
      }
    }
    return {};
  }).filter(item => item !== null);

  // Add any unpaired check-ins
  Object.keys(checkInTracker).map((driver_id) => {
    const { time, em_name } = checkInTracker[driver_id];
    pairedData.push({
      slNo: slNoCounter++,
      DriverName: em_name,
      CheckIn: time,
      Checkout: "Not checked out"
    });

    return null;
  });

  const colDefs = useMemo(
    () => [
      { field: 'slNo', flex: 1 },
      { field: 'DriverName', flex: 1 },
      { field: 'CheckIn', flex: 1 },
      { field: 'Checkout', flex: 1 },
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
          // rowData={formattedfinalData}
          rowData={pairedData}
          columnDefs={colDefs}
          apiRef={apiRef}
        />
      </Paper>
    </ReportComponents>
  )
}

export default memo(AttendanceReports)