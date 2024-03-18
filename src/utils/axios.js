import axios from 'axios';
import {fetchAuthSession} from "aws-amplify/auth";

const api = axios.create({
    baseURL: 'http://agroex-elb-446797069.us-east-1.elb.amazonaws.com/team3/api',
});

api.interceptors.request.use(async (config) => {
    const {idToken} = (await fetchAuthSession()).tokens ?? {};
    if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
    }

    return config;
});

export {api};