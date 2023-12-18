const BASE_URL = import.meta.env.VITE_STRAPI_URL as string

export const backendRoutes = {
	BASE_URL: BASE_URL,
	auth: {
		login: `${BASE_URL}/api/auth/local`,
	}
}