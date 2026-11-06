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
	rating: number;
	alcohol: number;
	description: string;
	avatar?: string;
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
