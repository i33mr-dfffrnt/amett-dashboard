import amettAPI from "../api/amettAPI";

const isAuth = async () => {
  try {
    const response = await amettAPI.get("/auth/checkAuth");
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default isAuth;
