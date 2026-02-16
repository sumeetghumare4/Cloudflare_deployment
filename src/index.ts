const main: ExportedHandler<Env> = {
	// what cloudflare worker runtime sends the request to 
	fetch(request, env, ctx): Response {
		if (request.method === 'POST') {
			if (request.url.endsWith('/user')) {
				return new Response("this is a post request to /user");
			} else {
				return new Response("this is a post request to not /user");
			}
		} else {
			return new Response("this is a get request");
		}
	}
};

export default main;


