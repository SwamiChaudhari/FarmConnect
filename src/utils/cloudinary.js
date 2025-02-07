import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});



const uplodeoncloundinary = async (file) => {
  try {
    if (!file) {
      return null;
    }
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log("file is uploded", result.url);
    return result;

  } catch (err) {
    fs.unlinkSync(file);
    console.log(err);
    return null;
  }
};


export { uplodeoncloundinary };



// code from cloudinary documentation


//   // Upload an image to Cloudinary
//   const uploadResult = await cloudinary.uploader
//   .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(" Error uploading image: error aala re bho", error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     inline-size: 500,
//     block-size: 500,
//   });

//   console.log(autoCropUrl);
// })();
