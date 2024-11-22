import { axioslogin } from '../../AxiosConfig/Axiox';


export const getDepartment = async () => {
    return axioslogin.get('/deptmaster/status').then((res) => {
        const { success, data } = res.data;
        if (success === 1) {
            return data
        }
    })
}


export const getDepartmentSection = async (id) =>{
    return axioslogin.get(`/deptsecmaster/${id}`).then((res)=>{
        const {success,data} = res.data;
        if(success === 1){
            return data
        }
    })
}


export const getDepartmentEmployee = async (id) =>{
    return axioslogin.get(`/common/emp/deptsec/${id}`).then((res)=>{
        const {success,data} = res.data;
        console.log(res.data);
        if(success === 1){
            return data
        }
    })
}