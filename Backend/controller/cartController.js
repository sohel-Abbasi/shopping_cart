import Cart from "../model/Cart.js";

export const getCart = async (req, res) => {
  const userId = await req.user._id;
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json({ products: cart?.products || [], success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const addToCart = async (req, res) => {
  const userId = await req.user._id;
  const product = req.body.product;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [product] });
    } else {
      cart.products.push(product);
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
