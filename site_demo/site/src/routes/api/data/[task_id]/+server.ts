// // src/routes/api/data.js
// export async function GET() {
//   // Replace with your actual data fetching logic
//   const data = await fetchSomeDataFromSource();
//   console.log('requesting')
//   return new Response(JSON.stringify(data), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// async function fetchSomeDataFromSource() {
//   // Mock data fetching
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(['Item 1', 'Item 2', 'Item 3']);
//     }, 1000);
//   });
// }

// src/routes/api/data.js
export async function GET({params}) {
    // const { task_id } = params; // Assuming 'task_id' is a parameter in the request URL
    
    // console.log(params)
    const url = `http://localhost:5000/progress/${params.task_id}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
    //   console.log(data); // Log the fetched data
      
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Fetch error:', error);
      return new Response(JSON.stringify({ error: 'Fetch error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    return new Response();
  }
  