import '../assets/styles/nullStyles.module.css';
import classes from '../assets/styles/nullStyles.module.css';
import {AppRoutes} from './Routes/AppRoutes.jsx';
import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports.js';
import '@aws-amplify/ui-react/styles.css';
import {cognitoSession, getTokens} from "../utils/auth.js";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserData, selectUserData, setTokens} from "../features/currentUser/currentUserSlice.js";
import {useNavigate} from "react-router-dom";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
            userPoolId: awsExports.USER_POOL_ID,
            loginWith: {
                username: 'false',
                email: 'true',
                phone: 'false',
            }
        }
    },
});

function App() {

    const user = useSelector(selectUserData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            let session = await cognitoSession();
            if (session.userSub) {
                let tokens = await getTokens();
                dispatch(setTokens(tokens));
                const idToken = tokens.idToken.toString();
                dispatch(fetchUserData(idToken));
            }
        };
        fetchData();
    }, [user.idToken, dispatch]);

    // useEffect(() => {
    //     if (user.status === 404) {
    //         navigate('/onboarding');
    //     } else if (user.userData) {
    //         const redirectPath = {
    //             admin: '/admin/users',
    //             exchanger: '/user/account',
    //         }[user.userData.role] || '/';
    //         navigate(redirectPath);
    //     }
    // }, [user.status, user.userData, navigate]);

    return (
        <>
            <AppRoutes/>
        </>

    );
}

export default App;
