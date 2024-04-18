import Listing from "../models/listing.model.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error.message);
  }
};

const updateListing = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    const updatedListing = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          description: req.body.description,
          address: req.body.address,
          regularPrice: req.body.regularPrice,
          discountPrice: req.body.discountPrice,
          bathrooms: req.body.bathrooms,
          bedrooms: req.body.bedrooms,
          furnished: req.body.furnished,
          parking: req.body.parking,
          type: req.body.type,
          offer: req.body.offer,
          imageUrls: req.body.imageUrls,
          userRef: req.body.userRef,
        },
      },
      { new: true }
    );

    return res.status(201).json(listing);
  } catch (error) {
    next(error.message);
  }
};

export { createListing, updateListing };
