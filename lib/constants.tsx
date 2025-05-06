import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ShoppingCart,
  Package,
  Settings,
  CreditCard,
  BarChart3,
  HeartHandshake,
  MessageSquare,
  Shapes
} from "lucide-react";

export const navLinks = [
  {
    label: "Dashboard",
    url: "/",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    label: "Products",
    url: "/products",
    icon: <ShoppingBag className="h-5 w-5" />
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    label: "Categories",
    url: "/categories",
    icon: <Package className="h-5 w-5" />
  },
  {
    label: "Orders",
    url: "/orders",
    icon: <ShoppingCart className="h-5 w-5" />
  },
  {
    label: "Customers",
    url: "/customers",
    icon: <Users className="h-5 w-5" />
  },
  {
    label: "Transactions",
    url: "/transactions",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    label: "Messages",
    url: "/messages",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings className="h-5 w-5" />
  }
];

export const MONTHS = [
  "January",
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];

export const STATUS_OPTIONS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded"
};