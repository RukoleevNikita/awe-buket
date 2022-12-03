import React from 'react';

export const useSort = (product, category) => {
  const [isSort, setIsSort] = React.useState(category);
    
  const sortedProduct = React.useMemo(() => {
    let sortableProduct = [...product];
    if (isSort === 'все товары') return sortableProduct;

    return sortableProduct.filter(e => e.category === isSort);
  }, [product, isSort]);

  return {sortedProduct, setIsSort};
};