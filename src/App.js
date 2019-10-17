import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Context
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item])
	};

	const removeItem = id => {
		setCart(cart.filter(item => {
			return item.id !== id;
		}))
	}


	return (
		<CartContext.Provider value={{ cart, removeItem }} >
			<ProductContext.Provider value={{ products, addItem }} >
				
					<div className="App">
						<Navigation cart={cart} />

						{/* Routes */}
						<Route exact path="/" component={Products} />

						<Route
							path="/cart"
							render={() => <ShoppingCart cart={cart} />}
						/>
					</div>
				
			</ProductContext.Provider>
		</CartContext.Provider>
	);
}

export default App;
