import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "./config/store";
import { StateShema } from "./config/StateScheme";


interface StoreProvidersProps {
    children?: ReactNode;
    initialState?: Partial<StateShema>
}

function StoreProviders({children, initialState}: StoreProvidersProps) {

    const store = createReduxStore(initialState as StateShema)

    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default StoreProviders