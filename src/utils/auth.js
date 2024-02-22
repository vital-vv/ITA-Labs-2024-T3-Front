import {getCurrentUser, fetchAuthSession} from "aws-amplify/auth";

export async function currentSession() {
    try {
        let {accessToken, idToken} = (await fetchAuthSession()).tokens ?? {};
        accessToken = accessToken.toString();
        idToken = idToken.toString();
        return {accessToken, idToken};
    } catch (err) {
        console.log(err);
    }
}

export async function  getUser () {
    try{
        const user = await getCurrentUser();
        console.log("user", user);
    } catch (err) {
        console.log(err);
    }
}