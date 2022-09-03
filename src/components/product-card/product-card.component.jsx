import { useContext } from "react";
import {
	ProductCardContainer,
	Name,
	Price,
	Footer,
} from "./product-card.styles";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.componet";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartContext);

	const addProductToCart = () => addItemToCart(product);

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType="inverted" onClick={addProductToCart}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};
export default ProductCard;
