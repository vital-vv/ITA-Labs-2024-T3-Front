import {Authenticator} from "@aws-amplify/ui-react";
import {Hub} from "aws-amplify/utils";

import styles from './SignIn.module.scss';

import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {currentSession} from "../../utils/auth.js";
import {useDispatch} from "react-redux";
import {fetchUserData, setTokens} from "../../features/currentUser/currentUserSlice.js";

function SignInApp() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {

        Hub.listen('auth',async (data) => {
            if(data?.payload?.event === 'signedIn'){
                let tokens = await currentSession();
                const idToken = tokens.idToken.toString();
                dispatch(fetchUserData(idToken));
                dispatch(setTokens(tokens));
                navigate('/');
            }
        })
    }, [dispatch]);

    return (
        <div className={styles.authContainer}>
            <Authenticator loginMechanisms={['email']}>
            </Authenticator>
        </div>
    )
}

export {SignInApp}
