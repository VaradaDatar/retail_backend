
const { Order, ProductCart } = require("../model/order");
exports.createOrder = (req, res) => {
  const order = new Order(req.body);
// const order = new Order(req.body.order);
order.save((err, order) => {
  if (err) {
    return res.status(400).json({
      error: "Failed to save your order in DB"
    });
  }
  res.json(order);
});
};



exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("orders.order", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
    });
};



exports.getOrder = (req, res) => {
  return res.json(req.order);
};

exports.getAllOrder =
 (req, res) => 
{
  Order.find().exec((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "NO Orders found"
      });
    }
    res.json(order);
  });
};



exports.updateOrder = (req, res) => {
    
  const order = req.order;
 
  order.count = req.body.count;
  order.address = req.body.address;

  order.save((err, updatedOrder) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Order"
      });
    }
    res.json(updatedOrder);
  });
};


exports.removeOrder = (req, res) => {
 
  const order = req.order;

  order.remove((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this Order"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  });
};