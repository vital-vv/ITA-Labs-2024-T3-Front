import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './features/store.js';

import App from './components/App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter basename="/team3">
            <App/>
        </BrowserRouter>
    </Provider>
)

