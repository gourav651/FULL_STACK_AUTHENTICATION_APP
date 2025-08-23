import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // take userId from middleware (req.user), not req.body
    const userId = req.user.id;  

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
