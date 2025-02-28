import ProductItem from "./(components)/ProductItem/ProductItem";

export default function VendorProducts() {
  return (
    <div className="flex-1 p-4 shadow-xl">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-textPrimary">Products</h1>
            <h1 className="text-sm text-gray-500">
              Track your sales and inventory
            </h1>
          </div>
          <button className="bg-primary-500 text-white rounded-md text-xs">
            + Add Product
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
}
