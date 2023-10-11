const sendDataToServer = async (data: any) => {
    //console.log("Sending data to server:", data);

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send data.');
      }

      const responseData = await response.json();
      return responseData;

    } catch (error) {
      console.error('There was an error:', error);
      throw error;
    }
};

export default sendDataToServer;





