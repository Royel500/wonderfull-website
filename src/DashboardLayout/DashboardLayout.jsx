import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
<aside className="h-screen sticky top-15 flex-[3] bg-base-200 p-4 -y-auto">
  <h2 className="text-xl font-bold mb-4">Dashboard</h2>
  <ul className="flex flex-col space-y-5"> {/* Changed to flex-col for vertical layout */}
    <li>
      <NavLink 
        to="/dashboard"
        className={({ isActive }) => 
          isActive ? 'text-primary font-bold' : 'hover:text-primary'
        }
      >
        Overview
      </NavLink>
    </li>
    <li>
      <NavLink 
        to="explore"
        className={({ isActive }) => 
          isActive ? 'text-primary font-bold' : 'hover:text-primary'
        }
      >
        Explore Gardeners
      </NavLink>
    </li>
    <li>
      <NavLink 
        to="plants"
        className={({ isActive }) => 
          isActive ? 'text-primary font-bold' : 'hover:text-primary'
        }
      >
        Share Tip
      </NavLink>
    </li>
    <li>
      <NavLink 
        to="my-tips"
        className={({ isActive }) => 
          isActive ? 'text-primary font-bold' : 'hover:text-primary'
        }
      >
        My Tips
      </NavLink>
    </li>
  </ul>

</aside>

      {/* Main Content */}
      <main className="flex-[12] p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
