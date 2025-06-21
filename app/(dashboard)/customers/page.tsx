import { DataTable } from "@/components/customUI/DataTable";
import { Separator } from "@/components/ui/separator";
import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer";
import { columns } from "@/components/customers/CustomerColumns";
<<<<<<< HEAD
=======
import PageHeader from "@/components/customUI/PageHeader";
>>>>>>> 9029510 (fixed things)

const Customers = async () => {
  await connectToDB();
  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
<<<<<<< HEAD
    <div className="p-10">
      <h2 className="text-heading2-bold">Customers</h2>
=======
    <div >
      <PageHeader title="Customers" />
>>>>>>> 9029510 (fixed things)
      <Separator className="my-4 bg-grey mt-4" />

      <DataTable data={customers} columns={columns} searchKey="name" />
    </div>
  );
};

export default Customers;
