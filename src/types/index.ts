/**
 * Standalone copies of the entity shapes the UI imports as `types`.
 * Object ids are strings here so the Vite build does not depend on mongoose
 * or the sibling beer-catalog-backend checkout.
 */
export interface BeerEntity {
	_id?: string;
	user?: string;
	createdAt: Date;
	createdBy: string;
	name: string;
	type: string;
	/** Sent only when creating a beer; becomes the creator's first review. */
	rating?: number;
	/** Community average of review ratings (0 when unrated). */
	ratingAvg?: number;
	ratingCount?: number;
	alcohol: number;
	description: string;
	avatar?: string;
}

export interface ReviewEntity {
	_id: string;
	beer: string;
	user: string;
	userName: string;
	rating: number;
	comment?: string;
	createdAt: string;
	updatedAt: string;
}

export interface ReviewsPage {
	currentPage: number;
	itemCount: number;
	pageCount: number;
	limitPerPage: number;
	results: ReviewEntity[];
}

export interface RatingSummary {
	ratingAvg: number;
	ratingCount: number;
}

export interface UserEntity {
	id?: string;
	_id?: string;
	name?: string;
	email: string;
	password: string;
	role?: 'user' | 'admin';
	token?: string | null;
}

/** Signed-in user kept in Redux and localStorage; `token` is the Better Auth bearer token. */
export interface AuthUser {
	id: string;
	_id: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	token: string;
}
