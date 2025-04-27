exports.handler = async (event) => {
    try {
        const lead = JSON.parse(event.body);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Lead received', lead })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing lead' })
        };
    }
};