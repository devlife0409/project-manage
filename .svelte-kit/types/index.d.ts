type DynamicRoutes = {
	"/dashboard/projects/[id]": { id: string };
	"/dashboard/projects/[id]/[view]": { id: string; view: string }
};

type Layouts = {
	"/": { id?: string; view?: string };
	"/dashboard": { id?: string; view?: string };
	"/dashboard/members": undefined;
	"/dashboard/projects": { id?: string; view?: string };
	"/dashboard/projects/[id]": { id: string; view?: string };
	"/dashboard/projects/[id]/[view]": { id: string; view: string };
	"/dashboard/reports": undefined;
	"/dashboard/team": undefined;
	"/login": undefined
};

export type RouteId = "/" | "/dashboard" | "/dashboard/members" | "/dashboard/projects" | "/dashboard/projects/[id]" | "/dashboard/projects/[id]/[view]" | "/dashboard/reports" | "/dashboard/team" | "/login";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/dashboard" | "/dashboard/members" | "/dashboard/projects" | `/dashboard/projects/${string}` & {} | `/dashboard/projects/${string}/${string}` & {} | "/dashboard/reports" | "/dashboard/team" | "/login";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/favicon.png";