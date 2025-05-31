import { Http } from "./Http";


export const getProperties = (config) => Http.get("/properties", config);
export const postProperty = (formData) => Http.post("/properties", formData);
export const deleteProperty = (id) => Http.delete(`/properties/${id}`);

export const getPropertyDetails = (id, config) => Http.get(`/properties/${id}`, config);
export const getPropertyComments = (id, config) => Http.get(`/properties/${id}/comments`, config);
export const postPropertyComment = (id, data, config) => Http.post(`/properties/${id}/comments`, data, config);
export const searchProperties = (name, config) => Http.get(`/properties?name=${name}`, config);


export const getPropertyTypes = (config) => Http.get("/property-types", config);
export const createPropertyType = (data) => Http.post("/property-types", data);
export const deletePropertyType = (id) => Http.delete(`/property-types/${id}`);

export const getPropertyByType = (id, config) => Http.get(`/property-types/${id}`, config);

export const getAppointments = (config) => Http.get("/appointments", config);
export const updateAppointmentStatus = (id, data) => Http.put(`/appointments/${id}/status`, data);

export const getFavoritesByUser = (id, config) => Http.get(`/favorites/${id}`, config);
export const getUsers = (config) => Http.get("/users", config);
