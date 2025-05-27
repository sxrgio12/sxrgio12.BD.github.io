async function checkJSON(filePath) {
    try {
        // Fetch the JSON data from the file
        const response = await fetch(filePath);
        const jsonData = await response.json();

        // Function to recursively check the JSON data
        function checkObject(obj, parentPath = '') {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    checkObject(item, `${parentPath}[${index}]`);
                });
            } else if (obj !== null && typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    checkObject(obj[key], `${parentPath}.${key}`);
                });
            } else {
                // If it's a primitive value, check if it's null or undefined
                if (obj === null || obj === undefined) {
                    console.warn(`⚠️ Invalid value found at path: ${parentPath} - Value is ${obj}`);
                }
            }
        }

        // Start the check from the root of the JSON object
        checkObject(jsonData);

        console.log("JSON validation completed.");
    } catch (error) {
        console.error("Error loading the JSON file:", error);
    }
}

// Example usage: Replace 'preguntas.json' with the path to your JSON file
checkJSON('preguntas.json');
