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

  },[]);

  const driverselection = useCallback((driver) => {
    if (!driver) {
      setSelectedValue('a')
    }
    setDriver(driver);
  }, []);

  const {  data: AttendaceReport, isLoading: Attendaceloading } = useQuery({
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
    return MappingData?.map((data, index) => ({
      slNo: index + 1,
      DriverName: data?.em_name,
      CheckIn: data?.check_in_time,
      Checkout: data?.check_out_time === "9999-12-31 23:59:59" ? "Not Checked Out" : data?.check_out_time,
      TotalCount: data?.vehicle_count
    }));
  })


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