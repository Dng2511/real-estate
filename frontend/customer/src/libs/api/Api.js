import { Http } from "./Http.js";


export const getProperties = (config) => Http.get("/properties", config);
export const getPropertyDetails = (id, config) => Http.get(`/properties/${id}`, config);
export const getPropertyComments = (id, config) => Http.get(`/properties/${id}/comments`, config);
export const postPropertyComment = (id, data, config) => Http.post(`/properties/${id}/comments`, data, config);
export const searchProperties = (name, config) => Http.get(`/properties?name=${name}`, config);


export const getPropertyTypes = (config) => Http.get("/property-types", config);
export const CreatePropertyType = (data) => Http.get("/property-types", data);
export const getPropertyByType = (id, config) => Http.get(`/property-types/${id}`, config);

export const getFavoritesByUser = (id, config) => Http.get(`/favorites/${id}`, config);
export const getUsers = (config) => Http.get("/users", config);
