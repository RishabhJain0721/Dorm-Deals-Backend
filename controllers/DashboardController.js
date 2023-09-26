import ItemToSell from "../models/SellModel.js";

const dashboardListItems = async (req, res) => {
  try {
    const items = await ItemToSell.find({});
    console.log(items);
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
};

export { dashboardListItems };