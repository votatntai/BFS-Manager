import axios from "./customAxios";

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
 
 /**
 * Task
 */
 export const getTask = (object: Object) => axios.get(`/tasks`,{params: object});
 export const createTask= (formData: Object) => axios.post('/tasks',formData);
 export const updateTask = (id: string, formData: Object) => axios.put(`/tasks/${id}`,formData);
 export const assigntStaffToTask = (object: Object) => axios.post(`/tasks/assign-staffs`,object);
 export const deleteStaffToTask = (id: string, object: Object) => axios.delete(`/tasks/assign-staffs/${id}`,{params: object});
 export const updateStaffToChecklist = (id: string, object: Object) => axios.put(`/task-check-lists/${id}`,object);

 /**
 * Staff
 */
 export const getTickets = (object: Object) => axios.get(`/tickets`,{params: object});

 /**
 * Ticket
 */
 export const getStaffs = (object: Object) => axios.get(`/staffs`,{params: object});
