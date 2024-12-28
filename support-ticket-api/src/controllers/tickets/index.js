export function index({request, response, database}){
    const { status } = request.query;

    const filters = status ? { status } : null

    const tickets = database.select("ticket", filters)

    return response.end(JSON.stringify(tickets))
}