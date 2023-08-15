import { useCartContext } from "@/context/CartContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Cart = ({ closeModal }: { closeModal: () => void }) => {
  const { cart, setCart } = useCartContext();

  const removeAll = (productID: number) => {
    setCart((cart) => cart.filter((product) => product.id !== productID));
  };

  const removeOne = (productID: number) => {
    setCart((cart) => {
      return cart.map((prod) => {
        if (prod.id === productID) {
          return {
            ...prod,
            cartCount: prod.cartCount ? prod.cartCount - 1 : 0,
          };
        } else {
          return prod;
        }
      });
    });
  };

  const addOne = (productID: number) => {
    setCart((cart) => {
      return cart.map((prod) => {
        if (prod.id === productID) {
          return {
            ...prod,
            cartCount: prod.cartCount ? prod.cartCount + 1 : 1,
          };
        } else {
          return prod;
        }
      });
    });
  };

  let totalPrice = 0;

  return (
    <div className="cart">
      <div className="cartHeader">
        <h3>Shopping Cart</h3>
        <button className="cartCloseButton" onClick={closeModal}>
          <span>Close</span>
          <XMarkIcon className="icon4" />
        </button>
      </div>
      <div>
        <div>
          {cart.map((product) => {
            const productPrice = Number.parseFloat(
              (
                Number.parseFloat(product.price) -
                (product.discount ? product.discount / 100 : 0) *
                  Number.parseFloat(product.price)
              ).toFixed(2)
            );
            const productTotalPrice = product.cartCount
              ? productPrice * product.cartCount
              : 0;
            totalPrice += productTotalPrice;
            return (
              <div key={product.id}>
                <div className="cartProductCard">
                  <div className="cartProductInfo">
                    <div>
                      <div className="cartImage">
                        <img src={product.image} alt="product-image" />
                      </div>
                      <button
                        onClick={() => removeAll(product.id)}
                        className="cartProductRemoveBtn"
                      >
                        <TrashIcon className="icon4" />
                        <span>Remove</span>
                      </button>
                    </div>
                    <div>
                      <p className="cartProductTitle">{product.title}</p>
                      <div>
                        <p className="cartProductPrice">
                          {productPrice} USD{" "}
                          {
                            <span>
                              x {product.cartCount} item
                              {product.cartCount !== null &&
                                product.cartCount !== 1 &&
                                "s"}
                            </span>
                          }
                        </p>
                        <p className="cartProductMRP">
                          {Number.parseFloat(product.price).toFixed(2)} USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="cartProductQuantityBtn">
                      <button onClick={() => removeOne(product.id)}>-</button>
                      <span>{product.cartCount}</span>
                      <button onClick={() => addOne(product.id)}>+</button>
                    </div>
                    <div className="cartProductTotal ">
                      {product.cartCount !== null &&
                        `${productTotalPrice.toFixed(2)} USD`}
                    </div>
                  </div>
                </div>
                <div className="cartSubtotalRow">
                  <span className="cartSubtotalText">Subtotal:</span>
                  <span className="cartSubtotal">
                    {totalPrice.toFixed(2)} USD
                  </span>
                </div>
                <button className="cartCheckoutBtn">Checkout</button>
              </div>
            );
          })}
          {cart.length <= 0 && (
            <p className="emptyCartText">No items in cart!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
