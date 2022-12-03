import { Routes, Route,  } from 'react-router-dom';

import { Home, Collection, PhotoGallery, Reviews, Notfoundpage, Delivery, Product } from '../pages';
import { AdminPanel } from '../pages/AdminPanelPages/AdminPanel/AdminPanel';
import { AdminPanelCreateProduct } from '../pages/AdminPanelPages/AdminPanelCreateProduct/AdminPanelCreateProduct';
import { Layout } from '../components/Layout/Layout';
import { AdminPanelProduct } from '../pages/AdminPanelPages/AdminPanelProduct/AdminPanelProduct';
import { AdminPanelProductChange } from '../pages/AdminPanelPages/AdminPanelProductChange/AdminPanelProductChange';
import { Cart } from '../pages/Cart/Cart';

export const Routing = () => {

  return(
    <>
      <Routes>
        <Route  path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="product/:id" element={<Product />} /> 
          <Route path="delivery" element={<Delivery />} />
          <Route path="photo-gallery" element={<PhotoGallery />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Notfoundpage />} /> 
        </Route>  
        <Route path="admin-panel" element={<AdminPanel />} /> 
        <Route path="admin-panel/add-product" element={<AdminPanelCreateProduct />} /> 
        <Route path="admin-panel/product/:id" element={<AdminPanelProduct />} /> 
        <Route path="admin-panel/product/:id/edit" element={<AdminPanelProductChange/>} /> 
      </Routes>
    </>
  );
};

