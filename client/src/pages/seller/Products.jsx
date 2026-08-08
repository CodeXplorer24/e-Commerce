import { CommonForm } from "@/components/common/CommonForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addProductFormElements } from "@/config/form_controller";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import ImageUpload from "@/components/seller/ImageUpload";
import ProductCard from "@/components/seller/ProductCard";
import { addProduct, getProductsBySeller } from "@/features/seller/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ImageUpload from "@/components/seller/ImageUpload";

import { useSearchParams } from "react-router-dom";

const initialProductState = {
  name: "",
  descroption: "",
  category: "",
  price: 0,
  stock: 0,
  imageUrl: ""
}
function Products() {
    const [formData, setFormData] = useState(initialProductState);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    // const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const openDialog = searchParams.get("action") === "add";

    const dispatch = useDispatch();

    const {productList, isLoading, error} = useSelector(
      (state) => state.sellerProducts
    )

    useEffect(() => {
      dispatch(getProductsBySeller());
    }, [dispatch])

    function handleSubmit(e) {
      e.preventDefault();

      // 1. Create a fresh multi-part form data instance
      const multiPartData = new FormData();

      // 2. Append text key-value metadata parameters
      multiPartData.append("name", formData.name);
      multiPartData.append("description", formData.description);
      multiPartData.append("category", formData.category);
      multiPartData.append("price", String(formData.price));
      multiPartData.append("stock", String(formData.stock));

      // 3. CRITICAL FIX: Loop over selected images and append them matching the key expected by Multer
      if (selectedImages.length === 0) {
        toast.error("Please select at least one image file");
        return;
      }

      selectedImages.forEach((imageFile) => {
        // Must match the exact key parameter string given to upload.array() on the backend
        multiPartData.append("productImages", imageFile);
      });

      // 4. Dispatch the payload bundle directly to your async thunk
      setIsUploading(true); // Flip your loading state indicators while data travels to Cloudinary

      dispatch(addProduct(multiPartData)).then((res) => {
        setIsUploading(false);

        if (res.payload?.success) {
          setSearchParams({});
          setFormData(initialProductState);
          setSelectedImages([]); // Triggers clean local unmounting hooks inside child
          toast.success(res?.payload?.message || "Product Added Successfully");
        } else {
          toast.error(res?.payload?.message || "Product Addition Failed");
        }
      });
    }

    function handleOpenDialog(){
      setSearchParams({action: "add"});
    }

    function handleCloseDialog(open){
      if(!open){
        setSearchParams({});
      }
    }
    return (
      <div className="space-y-6 w-full mt-0">
        <div className="flex w-full justify-between items-center mt-0">
          <h1 className="text-xl">Products</h1>

          <Button
           onClick={handleOpenDialog} className="font-normal text-black text-[12px] bg-green-300 rounded-full" 
           >
            Add Product
            </Button>
        </div>

        <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] md:max-w-3xl h-auto max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white rounded-lg shadow-lg border">
            <DialogHeader className="p-6 border-b shrink-0">
              <DialogTitle className="text-lg font-bold" >Add Product</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pr-1 space-y-6 touch-pan-y max-h-[calc(85vh-80px)]">
              <ImageUpload 
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                isUploading={isUploading}
                // setIsUploading={setIsUploading}
                isEditMode={null}
              />
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                buttonText={"Add"}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            productList.map((product) =>(
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </div>
      </div>
    );
}

export default Products;