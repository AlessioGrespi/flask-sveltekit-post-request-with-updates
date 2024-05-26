import { fail, redirect } from '@sveltejs/kit';

const url = 'http://localhost:5000/upload'

export const actions = {
  default: async ({ request }) => {

    const formData = await request.formData();
    const uploadedFile = formData?.get('file');

    console.log(uploadedFile)
    console.log(uploadedFile.name)

    // const files = Object.fromEntries(await request.formData());
    // const file = files.fileToUpload
    // if (
    //   !(formData.fileToUpload as File).name ||
    //   (formData.fileToUpload as File).name === 'undefined'
    // ) {
    //   return fail(400, {
    //     error: true,
    //     message: 'You must provide a file to upload'
    //   });
    // }

    // const { fileToUpload } = formData as { fileToUpload: File };
    // const fileToProcess = formData.fileToUpload

    // console.log(file)



    try {
      // Make the POST request
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      console.log(`Response: ${response.status} `)

      const responseData = await response.json();

      console.log(responseData)

      const taskId: string = responseData.task_id;
      
      console.log('Task ID:', taskId);

      // return taskId;

      redirect(301, `/${taskId}`)

    } catch (error) {
      // Handle errors
      console.error('Error uploading file:', error);
      throw error;
    }
    
    
  }
};