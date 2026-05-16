import { Outlet } from "react-router-dom";
import AccountSidebar from "../../components/app/AccountSidebar";

export default function AccountLayout() {
  return (
    <div className="px-4 pb-16 pt-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AccountSidebar />
        </div>
        <div className="space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
