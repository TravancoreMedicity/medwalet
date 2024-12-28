import { axioslogin } from '../../AxiosConfig/Axiox';
import imageCompression from 'browser-image-compression';

export const getDepartment = async () => {
    return axioslogin.get('/deptmaster/status').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getDepartmentSection = async (id) => {
    return axioslogin.get(`/deptsecmaster/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getDepartmentEmployee = async (id) => {
    return axioslogin.get(`/common/emp/deptsec/${id}`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getAllZoneMaster = async () => {
    return axioslogin.get(`/medvallet/getAllzoneMaster`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getAllUserMaster = async () => {
    return axioslogin.get(`/medvallet/getAlluserMaster`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}
export const getAllSlotMaster = async () => {
    return axioslogin.get(`/medvallet/getAllSlotMaster`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getAllVehicles = async () => {
    return axioslogin.get(`/medvehilces/getallvehicledetail`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getAllVehicleReport = async () => {
    return axioslogin.get(`/medvehilces/getAllVehicleReport`).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}



export const getAllUserRights = async () => {
    return axioslogin.get('/medvallet/getAllUserRight').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const getallPresentDriver = async (date) => {
    ;
    return axioslogin.post('/medvallet/getallPresentDriver', date).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getallDriverforDropdown = async (date) => {
    return axioslogin.post('/medvallet/getdriverdropdown', date).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getdriverDropdownReport = async (date) => {
    return axioslogin.get('/medvallet/getdriverDropdownReport', date).then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}



export const getAllDriverUserRight = async () => {
    return axioslogin.get('/medvallet/getAllDriverUserRight').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getAllAttendaceReport = async () =>{
    return axioslogin.get('/medvallet/getAllAttendaceReport').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}

export const calculateHeight = (opening, selectedFile) => {
    if (selectedFile.length > 0) {
        return { xs: 625, sm: 720, md: 710, lg: 720 };
    } else if (opening) {
        return { xs: 530, sm: 600, md: 630, lg: 630 };
    } else {
        return { xs: 430, sm: 500, md: 530, lg: 530 };
    }
};


export const HandleImageCompression = async (files) => {
    const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFiles = await Promise.all(
            files.map((file) => imageCompression(file, options))
        );
        return compressedFiles;
    } catch (error) {
        console.log("error in compressing image");
    }
};