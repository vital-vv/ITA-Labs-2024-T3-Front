import '../assets/styles/nullStyles.module.css';
import classes from '../assets/styles/nullStyles.module.css';
import {AppRoutes} from './Routes/AppRoutes.jsx';

import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports.js';
import '@aws-amplify/ui-react/styles.css';
import {accessToken, cognitoSession, getTokens} from "../utils/auth.js";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserData, selectUserData, setTokens} from "../features/currentUser/currentUserSlice.js";

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
    API: {
        REST: {
            headers: async () => {
                return {Authorization: accessToken};
            }
        }
    }
});

function App() {

    const user = useSelector(selectUserData);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
        let session = await cognitoSession();
            cognitoSession()


            if (session.userSub) {
                    let tokens = await getTokens();
                    dispatch(setTokens(tokens));
                    const idToken = tokens.idToken.toString();
                    dispatch(fetchUserData(idToken));
            }
        };
        fetchData();
    }, [user.idToken, dispatch]);

    return (
        <>
            <AppRoutes/>
        </>

    );
}

export default App;
