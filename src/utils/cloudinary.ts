import { v2 } from "cloudinary";

v2.config({
    url:process.env.CLOUDINARY_URL as string,
})
const cloudinary = v2;
export default cloudinary;