import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import dayjs from 'dayjs';
import MasterTable from '../CommonComponents/MasterTable'
import { getAllVehicleReport, getAllVehicles } from '../CommonComponents/useQueryFunctions'
import { useQuery } from '@tanstack/react-query';
import { axioslogin } from '../../AxiosConfig/Axiox'
import { warningNofity } from '../../Constant/Constant';
import { Flag } from '@mui/icons-material';
import FilterFunctionSkeleton from '../../Components/FilterSkeleton';


const ReportHeader = lazy(() => import("../../Components/ReportHeader"))
const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))

function ReportVehicleRegistration() {
    const [selectedValue, setSelectedValue] = useState('a');
    const [todayvehicle, setTodayVehicle] = useState([])
    const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
    const [start, setStart] = useState(dayjs().format('YYYY-MM-DD'));
    const [end, setEnd] = useState(dayjs().format('YYYY-MM-DD'));
    const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)

    let TodayData = new Date().toISOString().slice(0, 10);
    const handleChange = useCallback(async (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'b') {
            const vehicleData = await getVehiclesofToday();
            setTodayVehicle(vehicleData)
            setVehicleBetweenDate([])
        }
        if (event.target.value === 'a') {
            setVehicleBetweenDate([])
            setTodayVehicle([])
        }
    });

    const handleStartDateChange = (newValue) => {
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
        if (dayjs(formattedDate).isValid()) {
            setStart(formattedDate);
        }
    };

    const handleEndDateChange = (newValue) => {
        const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
        if (dayjs(formattedDate).isValid()) {
            setEnd(formattedDate);
        }
    };

    const { success, data: allvehicleReport, refetch, isLoading: vehicleReportLoading } = useQuery({
        queryKey: ['allvehicles'],
        queryFn: () => getAllVehicleReport(),
        enabled: selectedValue === 'a',
    })

    const postData = useMemo(() => ({
        currentDate: TodayData
    }), [TodayData]);

    const BothDate = useMemo(() => ({
        startDate: start,
        EndDate: end,
    }), [start, end]);


    const getVehiclesofToday = useCallback(async () => {
        setLoadingBetweenDate(true)
        try {
            const response = await axioslogin.post('/medvehilces/getTodayVehicles', postData);
            const { success, data } = response.data;
            console.log(data, "Today Vehicles");
            if (success === 1) {
                setLoadingBetweenDate(false)
                return data;
            }
        } catch (error) {
            console.error("Error fetching today's vehicles:", error);
        }
    });

    const getVehicleFromStartAndEnd = useCallback(async () => {
        setLoadingBetweenDate(true)
        try {
            const response = await axioslogin.post('/medvehilces/getvehicleBetweenData', BothDate);
            const { success, data } = response.data;
            console.log(data, "Vehicle data");
            if (success === 1 && data.length === 0) {
                warningNofity("No data found")
                setLoadingBetweenDate(false)
                return
            }
            setVehicleBetweenDate(data)
            setLoadingBetweenDate(false)
        } catch (error) {
            console.error("Error fetching today's vehicles:", error);
        }
    });


    const colDefs = useMemo(
        () => [
            { field: 'slNo', flex: 2 },
            { field: 'vallettype', flex: 2 },
            { field: 'OwnerName', flex: 2 },
            { field: 'MobileNumber', flex: 2 },
            { field: 'VehicleNumber', flex: 2 },
            { field: 'ZoneName', flex: 2 },
            { field: 'TokenNumber', flex: 2 },
            { field: 'PaymentType', flex: 2 },
            { field: 'Amount', flex: 2 },
            { field: 'CreatedDate', flex: 2 },
        ],
        []
    );




    const mapVehicleData = useCallback((vehicles) => {
        return vehicles?.map((items) => ({
            slNo: items?.slno,
            vallettype: items?.vallet_type === 1 ? "Vallet" : "Non Vallet",
            OwnerName: items?.owner_name,
            MobileNumber: items?.mobile_number,
            VehicleNumber: items?.vehicle_number,
            ZoneName: items?.zone_name,
            TokenNumber: items?.token_number,
            PaymentType: items?.payment_type === 2 ? "UPI" : "CASH",
            Amount: items?.vallet_type === 1 ? '100' : "0",
            CreatedDate: dayjs(items?.create_date).format('DD-MM-YYYY')
        }))
    })

    const AllInformation = mapVehicleData(allvehicleReport);
    const TodayVehicleInformation = mapVehicleData(todayvehicle);
    const VehicleBetweenDate = mapVehicleData(vehiclebetweendate);

    return (
        <Box sx={{ height: window.innerHeight - 100, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
            <ToastContainer />
            <Paper elevation={3} sx={{ flex: 1, height: window.innerHeight - 80, position: 'relative', p: 1 }}>
                <ReportHeader name={'Daily Vehicle Registration Report'} path={'/Reports/mainpage'} />
                <Suspense fallback={<FilterFunctionSkeleton />}>
                    <FilterFunction
                        start={start}
                        end={end}
                        selectedValue={selectedValue}
                        handleChange={handleChange}
                        handleStartDateChange={handleStartDateChange}
                        getVehicleFromStartAndEnd={getVehicleFromStartAndEnd}
                        handleEndDateChange={handleEndDateChange}
                    />
                </Suspense>
                <Box
                    sx={{
                        width: '100%',
                        height: { md: '68%' },
                        display: 'flex'
                    }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%'
                    }}>
                        <MasterTable
                            loading={selectedValue === "a" ? vehicleReportLoading : loadingbetweenDate}
                            rowData={
                                selectedValue === "a" ? AllInformation :
                                    selectedValue === 'b' ? TodayVehicleInformation :
                                        VehicleBetweenDate
                            }
                            columnDefs={colDefs}
                        />
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(ReportVehicleRegistration)