const fetchData = async (query: string): Promise<string[] | string> => {
    try {
        const response = await fetch(`http://localhost:5000/api/query?search=${query}`, {
            method: 'GET',
        });
        const data = await response.json();

        if (data.message) {
            return data.message;
        }

        if (Array.isArray(data)) {
            const resultArray: string[] = [];
            data.forEach(item => {
                const properties = ['Authors', 'DOI', 'Journal', 'Pages', 'Title', 'Volume', 'Year',"Claim","Evidence","Research","Participant_Type","SE_Method"];
                properties.forEach((property) => {
                    if (item.hasOwnProperty(property)) {
                        resultArray.push(`${property}: ${Array.isArray(item[property]) ? item[property].join(', ') : item[property]}`);
                    }
                });
                resultArray.push(''); 
            });
            return resultArray;
        } else {
            return 'No data found';
        }
    } catch (error) {
        console.error('There was an error:', error);
        return 'Error fetching data';
    }
};

export default fetchData;