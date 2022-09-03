import { useContext } from "react";

import {
	CheckoutContainer,
	CheckoutHeader,
	Block,
	Total,
} from "./checkout.styles";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(CartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<Block>
					<span>Product</span>
				</Block>
				<Block>
					<span>Description</span>
				</Block>
				<Block>
					<span>Quantity</span>
				</Block>
				<Block>
					<span>Price</span>
				</Block>
				<Block>
					<span>Remove</span>
				</Block>
			</CheckoutHeader>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<Total>Total: ${cartTotal}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
