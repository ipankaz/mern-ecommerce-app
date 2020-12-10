const Cart = require("../models/cart");

exports.addItemToCart = (req, res, next) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      res.status(400).json({ error });
    }
    if (cart) {
      // if cart already exists , then increase the quantity or add the new item in cart
      const product = req.body.cartItems.product
      const itemPresent = cart.cartItems.find(c=>c.product==product)   
      let condition;
      let update;

        if(itemPresent){
            condition ={ "user": req.user._id , "cartItems.product":product}
            update = {
                "$set": {
                    "cartItems.$":{
                      ...req.body.cartItems,
                      quantity:itemPresent.quantity + req.body.cartItems.quantity
                                 }
                        },
                      }
                      }
        else{
          condition = { user: req.user._id }
          update = {
            $push: {
              cartItems: req.body.cartItems,
                   },
                   }
            }

            Cart.findOneAndUpdate(condition,update).exec((error,_cart)=>{
                  if(error){
                        res.status(400).json({error})
                  }if(_cart){
                      res.status(201).json({anotherItemAdded_or_quantity_increases: _cart})
                  }
              })
     
    } 
    else {
      // create a new cart for user
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) {
          res.status(400).json({ error });
        }
        if (cart) {
          res.status(200).json({ newCartCreated: cart });
        }
      });
    }
  });
};
