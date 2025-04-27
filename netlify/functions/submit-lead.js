exports.handler = async (event) => {
    try {
        const lead = JSON.parse(event.body);
        // Note: Netlify's filesystem is ephemeral; leads.json won't persist
        // For testing, return the lead data
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