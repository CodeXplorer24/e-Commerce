import { getProducts } from "@/features/shopping/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCardList from "./ProductCardList";

function Products() {
    const dispatch = useDispatch();
    const { productList, error, isLoading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productList.length) return <div>No products found.</div>;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                {productList.map((product) => (
                    <ProductCardList key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;