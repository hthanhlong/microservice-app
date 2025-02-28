import ActiveSales from "./(components)/widgets/ActiveSales";
import ProductOverview from "./(components)/widgets/ProductOverview";
import ProductRevenue from "./(components)/widgets/ProductRevenue";

export default function VendorDashboard() {
  return (
    <div className="flex-1 p-4 shadow-xl">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>
        <h1 className="text-sm text-gray-500">
          Track your sales and inventory
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ActiveSales />
        <ProductOverview />
        <ProductRevenue />
      </div>
    </div>
  );
}
