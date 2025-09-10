import {
  Menu,
  User,
  Building2,
  FileText,
  List,
  FileType,
  FilesIcon,
  Folders,
  LogOut,
  Infinity,
  FileSpreadsheet,
  Paperclip,
} from "lucide-react";
const SideBar = () => {
  return (
    <div className="menu">
      <h1>Menu</h1>
      <div className="line"></div>
      <div className="menu-item">
        <Menu size={20} />
        <span>Invoices</span>
      </div>
      <div className="menu-item">
        <User size={20} />
        <span>Customers</span>
      </div>
      <div className="menu-item">
        <Building2 size={20} />
        <span>My Business</span>
      </div>
      <div className="menu-item">
        <FileType size={20} />
        <span>Invoice Journal</span>
      </div>
      <div className="menu-item">
        <FilesIcon size={20} />
        <span>Price List</span>
      </div>
      <div className="menu-item">
        <List size={20} />
        <span>Multiple Invoicing</span>
      </div>
      <div className="menu-item">
        <Folders size={20} />
        <span>Unpaid Invoices</span>
      </div>
      <div className="menu-item">
        <FileText size={20} />
        <span>Offer</span>
      </div>
      <div className="menu-item">
        <Paperclip size={20} />
        <span>Inventory Control</span>
      </div>
      <div className="menu-item">
        <FileSpreadsheet size={20} />
        <span>Member Invoicing</span>
      </div>
      <div className="menu-item">
        <Infinity size={20} />
        <span>Import/Export</span>
      </div>
      <div className="menu-item">
        <LogOut size={20} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
