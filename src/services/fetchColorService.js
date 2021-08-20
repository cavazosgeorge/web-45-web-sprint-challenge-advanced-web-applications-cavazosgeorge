import axiosWithAuth from "../helpers/axiosWithAuth";

export const fetchColorService = () => {
  return axiosWithAuth()
    .get("/colors")
    .then((response) => response)
    .catch((error) => error);
};

//export default fetchColorService;
