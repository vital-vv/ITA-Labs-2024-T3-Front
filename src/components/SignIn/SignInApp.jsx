import {Authenticator} from "@aws-amplify/ui-react";
import {Hub} from "aws-amplify/utils";
import styles from './SignIn.module.scss';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getTokens} from "../../utils/auth.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, selectUserData, setTokens} from "../../features/currentUser/currentUserSlice.js";

function SignInApp() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let tokens = await getTokens();
                dispatch(setTokens(tokens));
                const idToken = tokens.idToken.toString();
                await dispatch(fetchUserData(idToken));
            } catch (error) {
                console.log(error);
            }
        };
        Hub.listen('auth', async (data) => {
            if (data?.payload?.event === 'signedIn') {
                fetchData();
            }
        })
    }, [dispatch]);

    useEffect(() => {
        if (user?.status === 404) {
            navigate('/onboarding');
        } else if (user.userData) {
            const redirectPath = {
                ADMIN: '/admin/users',
                EMPLOYEE: '/user/account',
                USER: '/',
            }[user.userData.role];
            navigate(redirectPath);
        }
    }, [user.status, user.userData, navigate]);

    return (
        <div className={styles.authContainer}>
            <Authenticator loginMechanisms={['email']}/>
        </div>
    )
}

export {SignInApp}
