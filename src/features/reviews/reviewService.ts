import axios from 'axios';
import { RatingSummary, ReviewEntity, ReviewsPage } from 'types';
import { apiUrl } from '../../config/api';

const reviewsUrl = (beerId: string) => `${apiUrl}/api/beers/${beerId}/reviews`;

const auth = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export const REVIEW_COMMENT_MAX = 1000;
export const REVIEWS_PAGE_SIZE = 10;

// Public, newest first
const list = async (beerId: string, page = 1, limit = REVIEWS_PAGE_SIZE): Promise<ReviewsPage> => {
	const response = await axios.get(reviewsUrl(beerId), { params: { page, limit } });
	return response.data;
};

// The signed-in user's review, or null
const getMine = async (beerId: string, token: string): Promise<ReviewEntity | null> => {
	const response = await axios.get(`${reviewsUrl(beerId)}/me`, auth(token));
	return response.data;
};

const saveMine = async (
	beerId: string,
	body: { rating: number; comment?: string },
	token: string
): Promise<{ review: ReviewEntity } & RatingSummary> => {
	const response = await axios.put(`${reviewsUrl(beerId)}/me`, body, auth(token));
	return response.data;
};

const deleteMine = async (beerId: string, token: string): Promise<{ id: string } & RatingSummary> => {
	const response = await axios.delete(`${reviewsUrl(beerId)}/me`, auth(token));
	return response.data;
};

// Review author or admin
const deleteById = async (
	beerId: string,
	reviewId: string,
	token: string
): Promise<{ id: string } & RatingSummary> => {
	const response = await axios.delete(`${reviewsUrl(beerId)}/${reviewId}`, auth(token));
	return response.data;
};

export const reviewService = { list, getMine, saveMine, deleteMine, deleteById };
