import { Paper } from '@mui/material'
import React, { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';
import MasterTable from '../CommonComponents/MasterTable'
import { getAllVehicleReport, getAllVehicles } from '../CommonComponents/useQueryFunctions'
import { useQuery } from '@tanstack/react-query';
import { axioslogin } from '../../AxiosConfig/Axiox'
import { errorNofity, warningNofity } from '../../Constant/Constant';
import FilterFunctionSkeleton from '../../Components/FilterSkeleton';
import ReportComponents from '../CommonComponents/ReportComponents';
import { format } from 'date-fns'

const FilterFunction = lazy(() => import("../CommonComponents/FilterFunction"))

function ReportVehicleRegistration() {
    const apiRef = useRef();
    const [selectedValue, setSelectedValue] = useState('a');
    const [todayvehicle, setTodayVehicle] = useState([])
    const [vehiclebetweendate, setVehicleBetweenDate] = useState([])
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date());
    const [loadingbetweenDate, setLoadingBetweenDate] = useState(false)

    const handleChange = useCallback(async (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'b') {
            const postData = { currentDate: format(new Date(), 'yyyy-MM-dd') }
            setLoadingBetweenDate(true)
            try {
                const response = await axioslogin.post('/medvehilces/getTodayVehicles', postData);
                const { success, data } = response.data;
                if (success === 1) {
                    setLoadingBetweenDate(false)
                    setTodayVehicle(data)
                }
            } catch (error) {
                errorNofity("Error fetching today's vehicles:", error);
            }
        }
        setVehicleBetweenDate([])
        if (event.target.value === 'a') {
            setVehicleBetweenDate([])
            setTodayVehicle([])
        }
    }, []);

    const {
        success: allvehiclessuccess,
        data: allvehicleReport,
        refetch: allvehiclesrefetch,
        isLoading: vehicleReportLoading
    } = useQuery({
        queryKey: ['getAllVehicleReport'],
        queryFn: () => getAllVehicleReport(),
        enabled: selectedValue === 'a',
        staleTime: Infinity
    })


    const getVehicleFromStartAndEnd = useCallback(async () => {
        setLoadingBetweenDate(true)
        const BothDate = {
            startDate: format(new Date(start), 'yyyy-MM-dd'),
            EndDate: format(new Date(end), 'yyyy-MM-dd'),
        }
        try {
            const response = await axioslogin.post('/medvehilces/getvehicleBetweenData', BothDate);
            const { success, data } = response.data;
            if (success === 1 && data.length === 0) {
                warningNofity("No data found")
                setLoadingBetweenDate(false)
                return
            }
            setVehicleBetweenDate(data)
            setLoadingBetweenDate(false)
        } catch (error) {
            errorNofity("Error fetching today's vehicles:", error);
        }
    }, [start, end]);

    const colDefs = useMemo(
        () => [
            { field: 'slNo', },
            { field: 'vallettype', },
            { field: 'OwnerName', },
            { field: 'MobileNumber', },
            { field: 'VehicleNumber', },
            { field: 'ZoneName', },
            { field: 'TokenNumber', },
            { field: 'PaymentType', },
            { field: 'Amount', },
            { field: 'CreatedDate', },
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
    }, [allvehicleReport, todayvehicle, vehiclebetweendate])

    // const AllInformation = mapVehicleData(allvehicleReport);
    // const TodayVehicleInformation = mapVehicleData(todayvehicle);
    // const VehicleBetweenDate = mapVehicleData(vehiclebetweendate);


    const AllInformation = useMemo(() => { return mapVehicleData(allvehicleReport) }, [allvehicleReport])
    const TodayVehicleInformation = useMemo(() => { return mapVehicleData(todayvehicle) }, [todayvehicle])
    const VehicleBetweenDate = useMemo(() => { return mapVehicleData(vehiclebetweendate) }, [vehiclebetweendate])



    const download = useCallback(() => {
        if (apiRef.current && apiRef.current.api) {
            apiRef.current.api.exportDataAsCsv();
        }
    }, []);

    return (
        <ReportComponents
            title="Daily Vehicle Registration  Reports"
            data={[]}
            displayClose={true}
            path={'/Reports/mainpage'}
            onDownload={download}

        >
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
            <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
                <MasterTable
                    loading={selectedValue === "a" ? vehicleReportLoading : loadingbetweenDate}
                    rowData={
                        selectedValue === "a" ? AllInformation :
                            selectedValue === 'b' ? TodayVehicleInformation :
                                VehicleBetweenDate
                    }
                    columnDefs={colDefs}
                    apiRef={apiRef}
                />
            </Paper>
        </ReportComponents>
    )
}

export default memo(ReportVehicleRegistration)