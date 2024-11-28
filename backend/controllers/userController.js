const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let myCloud;

    // Kiểm tra xem người dùng có upload avatar không
    if (req.body.avatar) {
        // Nếu có avatar, upload lên Cloudinary
        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale",
        });
    } else {
        myCloud = {
            public_id: "default_avatar", // Bạn có thể thay đổi `default_avatar` theo Cloudinary của bạn
            secure_url: "https://asset.cloudinary.com/dyeq1hzrg/7f707dc93cc6d1b2e1a7fd3ba74365f9", // Đường dẫn đến ảnh mặc định
        };
    }

    const { name, email, password } = req.body;

    // Tạo người dùng
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors( async (req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    const isPasswordMatched= await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    sendToken(user,201,res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req,res,next) => {
    res.cookie("token",null, {
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success: true,
        message:"Logout successfully"
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req,res,next) =>{
const user =await User.findOne({email:req.body.email});
if(!user){
    return next(new ErrorHandler("User not found",404));
}
const resetToken = user.getResetPasswordToken();
await user.save({validateBeforeSave:false});
const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore this`;
try{
    await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,

    });
    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`
    })
}catch(err){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined

    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(err.message,500));
}
})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // In ra giá trị của req.params.token để kiểm tra
    console.log("req.params.token:", req.params.token);

    // creating token hash
const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // In ra giá trị của resetPasswordToken để kiểm tra
    console.log("resetPasswordToken:", resetPasswordToken);
    const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("user:", user);
    if (!user) {
        return next(
        new ErrorHandler(
            "Reset Password Token is invalid or has been expired",
            400
        )
        );
        }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

    await user.save();

        sendToken(user, 200, res);
    });

// Get User details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",401));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password is not match",401));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200,res)

});
// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // chi update avatar khi co avatar dc them vao (khong undefined)
    if (req.body.avatar && req.body.avatar.trim() !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});




//Get all user (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    })
})
//Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
    return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
}
    res.status(200).json({
        success: true,
        user,
    })
})


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});
// delete User (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }
    await user.deleteOne();
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});