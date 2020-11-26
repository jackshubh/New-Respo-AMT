//import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const TokenEndPoint = {
    baseURL: 'http://testapi.eshakti.com/mobileapi/user/login',
};

export const UserInfoEndPoint = {
    baseURL: 'http://testapi.eshakti.com/mobileapi/user/details',
}

export const ListOfServicesEndPoint = {
    baseURL: 'http://testapi.eshakti.com/mobileapi/execute',
}

export const GetAllUsersListEndPoint = {
    baseURL: 'http://testapi.eshakti.com/mobileapi/userlist',
}

export const UpdatePermissionEndPoint = {
    baseURL: 'http://testapi.eshakti.com/mobileapi/permissionassign',
}

export const authToken = '93D821EC97742C7A33B9043C5B676DDC4AAEADAADF0BDD93553AB51EBE8DEC8CEAC148D4806CA52EFAA079CC88A16A91737DE5FAD0DBD0CEF998EA3D6C7173F2CFB8123572B89E60D1787F8829E5E266676DAE9AED1D6CD4CEFDAF32CC8E12B1643791CC828DAF10B7F7AF0ECF9F0682';

export const UserInfoData = async (authToken) => {

    const response = await axios({
        method: 'get',
        url: UserInfoEndPoint.baseURL,
        headers: { 'Authorization': 'Basic ' + authToken },
    })
        .then((response) => {
            console.log('UserInfoFetched');
            let objTemp = {};
            objTemp = response.data.data;
            return objTemp;
        })
        .catch((error) => {
            console.log(error);

        })
    return response;
}

export const ListOfServices = async () => {
    const response = await axios({
        method: 'post',
        url: ListOfServicesEndPoint.baseURL,
        data: {
            "spName": '',
            "params": '',
        }
    })
        .then(() => {
            console.log('Fetched all the list of services');
            return response;
        })
        .catch((error) => {
            console.log(error);
        })

    return null;
}

export const GetAllUsers = async () => {
    const response = await axios({
        method: 'get',
        url: GetAllUsersListEndPoint.baseURL,
    })
        .then((response) => {
            console.log('All the users fetched')
            return response;
        })
        .catch((error) => {
            console.log(error);
        })
    return null;
}

export const UpdatePermissions = async (ServiceName, arrUser) => {

    const response = await axios({
        method: 'post',
        url: UpdatePermissionEndPoint.baseURL,
        data: {
            "spName": '',
            "servicename": ServiceName,
            "users": arrUser,
        }
    })
        .then((response) => {
            console.log('Updated Successfully');
            return response;
        })
        .catch((error) => {
            console.log(error);
        })
    return response;
}

// export const storeData = async (authToken) => {
//     try {
//         await AsyncStorage.setItem('@authToken', authToken)
//         console.log("done");
//     } catch (e) {
//         // save error
//         console.log(e);
//     }
// }

// export const getAuthToken = async () => {
//     try {
//         return (
//             await AsyncStorage.getItem('@authToken')
//         )
//     }
//     catch (e) {
//         console.log("Error while fetch authToken from store", e);
//     }
// }