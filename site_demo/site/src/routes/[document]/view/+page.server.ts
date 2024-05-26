import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params}) => {

    console.log(params)
    
    const url = `http://localhost:5000/result/${params.document}`;
     
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any headers if needed
            },
            // You can add credentials: 'same-origin' if needed for same-origin requests
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const result = data

        console.log(result)

        return {result};
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Throw the error further so it can be handled by the caller
    }
};