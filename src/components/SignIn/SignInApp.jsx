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
    const user = useSelector(selectUserData);
    const dispatch = useDispatch();

    useEffect(() => {
        Hub.listen('auth',async (data) => {
            if(data?.payload?.event === 'signedIn'){
                let tokens = await getTokens();
                dispatch(setTokens(tokens));
                const idToken = tokens.idToken.toString();
                dispatch(fetchUserData(idToken));
            }
        })
    }, [dispatch]);

    const userData = user.userData;
    if(userData){
       if(userData.role === 'admin'){
           navigate('/admin/users');
       } else {
           navigate('/');
       }
    }

    return (
        <div className={styles.authContainer}>
            <Authenticator loginMechanisms={['email']}/>
        </div>
    )
}

export {SignInApp}
