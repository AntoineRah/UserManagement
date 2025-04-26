import { Navbar } from "../../molecules/Navbar";
import { Outlet } from "react-router";


function Dashboard() {

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export { Dashboard };
