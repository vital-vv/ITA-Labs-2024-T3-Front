import '../assets/styles/nullStyles.module.css';
import classes from '../assets/styles/nullStyles.module.css';
import {AppRoutes} from './Routes/AppRoutes.jsx';

import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports.js';
import '@aws-amplify/ui-react/styles.css';

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
    }
});

function App() {
    return (
        <>
            <AppRoutes/>
        </>

    );
}

export default App;
