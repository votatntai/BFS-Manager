import axios from "./customAxios";
/**
 * Account
 */
export const getUsers = (object: Object) => axios.get(`/users`,{params: object});
export const getPosts = (object: Object) => axios.get(`/posts`,{params: object});


/**
 * Farm
 */
export const getFarms = (object: Object) => axios.get(`/farms`,{params: object});
export const createFarm = (formData: FormData) => axios.post('/farms',formData);
export const updateFarm = (id: string, formData: FormData) => axios.put(`/farms/${id}`,formData);

/**
 * Area
 */
 export const getAreas = (object: Object) => axios.get(`/areas`,{params: object});
 export const createArea = (formData: FormData) => axios.post('/areas',formData);
 export const updateArea= (id: string, formData: FormData) => axios.put(`/areas/${id}`,formData);

/**
 * Care mode
 */
 export const getCaremodes = (object: Object) => axios.get(`/care-modes`,{params: object});
 export const createCaremode = (formData: FormData) => axios.post('/care-modes',formData);
 export const updateCaremode = (id: string, formData: FormData) => axios.put(`/care-modes/${id}`,formData);

 /**
 * Cage
 */
export const getCages = (object: Object) => axios.get(`/cages`,{params: object});
//  export const createCaremode = (formData: FormData) => axios.post('/care-modes',formData);
//  export const updateCaremode = (id: string, formData: FormData) => axios.put(`/care-modes/${id}`,formData);
/**
 * Food
 */
 export const getFoods = (object: Object) => axios.get(`/foods`,{params: object});
 export const createFood = (formData: FormData) => axios.post('/foods',formData);
 export const updateFood = (id: string, formData: FormData) => axios.put(`/foods/${id}`,formData);

/**
 * Food category
 */
 export const getFoodCategories = (object: Object) => axios.get(`/food-categories`,{params: object});
 export const createFoodCategory = (formData: FormData) => axios.post('/food-categories',formData);
 export const updateFoodCategory = (id: string, formData: FormData) => axios.put(`/food-categories/${id}`,formData);

 /**
 * Unit of measurement
 */
 export const getUnit = (object: Object) => axios.get(`/unit-of-measurements`,{params: object});
 export const createUnit = (formData: FormData) => axios.post('/unit-of-measurements',formData);
 export const updateUnit = (id: string, formData: FormData) => axios.put(`/unit-of-measurements/${id}`,formData);

 /**
 * Menu sample
 */
 export const getMenuSample = (object: Object) => axios.get(`/menu-samples`,{params: object});
 export const createMenuSample = (formData: FormData) => axios.post('/menu-samples',formData);
 export const updateMenuSample = (id: string, formData: FormData) => axios.put(`/menu-samples/${id}`,formData);
 
 /**
 * Task
 */
 export const getTask = (object: Object) => axios.get(`/tasks`,{params: object});
 export const createTask= (formData: Object) => axios.post('/tasks',formData);
 export const updateTask = (id: string, formData: Object) => axios.put(`/tasks/${id}`,formData);
 export const assigntStaffToTask = (object: Object) => axios.post(`/tasks/assign-staffs`,object);
 export const deleteStaffToTask = (id: string, object: Object) => axios.delete(`/tasks/assign-staffs/${id}`,{params: object});
 export const updateStaffToChecklist = (id: string, object: Object) => axios.put(`/task-check-lists/${id}`,{params: object});

 /**
 * Staff
 */
 export const getStaffs = (object: Object) => axios.get(`/staffs`,{params: object});
