import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({params}) => {
    console.log(params.document)
    const task_id = params.document
    return {task_id}
};