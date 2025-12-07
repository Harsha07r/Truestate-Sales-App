import { Home, Newspaper, Boxes, FileText, Users, CheckCircle, XCircle, Square } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-gray-100 border-r p-4 flex flex-col gap-6">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <h2 className="font-semibold text-gray-800">Anurag Yadav</h2>
          <p className="text-xs text-gray-500">Vault</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-gray-700">
        
        <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
        <SidebarItem icon={<Newspaper size={18} />} label="News" />
        <SidebarItem icon={<Boxes size={18} />} label="Intake" />

        <p className="text-xs text-gray-500 mt-2">Services</p>
        <SidebarItem icon={<CheckCircle size={18} />} label="Pre-active" />
        <SidebarItem icon={<CheckCircle size={18} />} label="Active" />
        <SidebarItem icon={<XCircle size={18} />} label="Blocked" />
        <SidebarItem icon={<Square size={18} />} label="Closed" />

        <p className="text-xs text-gray-500 mt-2">Invoices</p>
        <SidebarItem icon={<FileText size={18} />} label="Proforma Invoices" />
        <SidebarItem icon={<FileText size={18} />} label="Final Invoices" />

      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer 
      ${active ? "bg-white shadow-sm font-semibold" : "hover:bg-gray-200"}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
