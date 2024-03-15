import {fetchAuthSession} from "aws-amplify/auth";

export async function getTokens() {
    try {
        let {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
        accessToken = accessToken.toString();
        idToken = idToken.toString();
        return {accessToken, idToken};
    } catch (err) {
        console.log(err);
    }
}

export async function cognitoSession() {
    try {
        return (await fetchAuthSession()) ?? {};
    } catch (err) {
        console.log(err);
    }
}

export const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();