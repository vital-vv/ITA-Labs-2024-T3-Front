import {useSelector} from "react-redux";
import {selectUserData} from "../../../../features/currentUser/currentUserSlice.js";
import {LoginLink} from "./LoginLink/LoginLink.jsx";
import {AdminMenu} from "./AdminMenu/AdminMenu.jsx";
import {ExchangerMenu} from "./ExchangerMenu/ExchangerMenu.jsx";
import {UserMenu} from "./UserMenu/UserMenu.jsx";

function IsAuthorized() {
    const user = useSelector(selectUserData);

    if(user.idToken === null){
        return <LoginLink/>;
    }

    switch (user.userData?.role) {
        case 'admin':
            return <AdminMenu />;
        case 'exchanger':
            return <ExchangerMenu/>;
        case 'user':
            return <UserMenu/>
    }
}

export {IsAuthorized};
