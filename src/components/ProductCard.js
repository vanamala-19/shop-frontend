import React from "react";

const ProductCard = ({ product }) => {
  // console.log(product.image);
  const FullStar = () => {
    return (
      <svg
        className="block h-3 w-3 align-middle text-pink-600 sm:h-4 sm:w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          className=""></path>
      </svg>
    );
  };
  const Star = () => {
    return (
      <svg
        className="block h-3 w-3 align-middle text-gray-400 sm:h-4 sm:w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          className=""></path>
      </svg>
    );
  };
  const Rating = ({ n }) => {
    return (
      <div className="mt-2 flex items-center">
        {[...Array(n)].map((e, i) => (
          <FullStar key={i} />
        ))}
        {[...Array(5 - n)].map((e, i) => (
          <Star key={i} />
        ))}
      </div>
    );
  };
  return (
    <article className="relative">
      <div className="aspect-square overflow-hidden">
        <a href={`/product/${product.id}`} title="" className="">
          {product.image ? (
            <img
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 image"
              src={`data:image/jpeg;base64,${product.image}`}
              alt="Product pic"
            />
          ) : (
            <img
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 image"
              src="https://assets.website-files.com/619e8d2e8bd4838a9340a810/64c590c754d6bc13ebd90cbc_ai_product_photo_styles.webp"
              alt=""
            />
          )}
        </a>
      </div>

      {product.quantity === 0 && (
        <div className="absolute top-0 right-0 m-1 rounded-full bg-red-600">
          <p className="rounded-full bg-red-600 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Out of Stock
          </p>
        </div>
      )}

      <div className="mt-4 flex items-start justify-between">
        <div className="">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
            <a href={`/product/${product.id}`} title="" className="">
              {product.name}
              <span className="absolute" aria-hidden="true"></span>
            </a>
          </h3>

          <Rating n={product.rating} />
        </div>

        <div className="text-right">
          <p className="text-xs font-normal sm:text-sm md:text-base">
            {product.price} $
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
