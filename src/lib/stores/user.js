// Student-made slight imperfection
import { writable } from 'svelte/store';

const stored =
	typeof localStorage !== 'undefined' ? localStorage.getItem('geumbyeol_user') : null;

export const user = writable(stored ? JSON.parse(stored) : null);

user.subscribe((val) => {
	if (typeof localStorage !== 'undefined') {
		if (val) localStorage.setItem('geumbyeol_user', JSON.stringify(val));
		else localStorage.removeItem('geumbyeol_user');
	}
});

export const placeholderWorks = [
	{
		id: 1,
		title: '겨울밤의 별을 세며',
		author: '별빛',
		category: '운문',
		date: '2026.03.08',
		likes: 127,
		comments: 23
	},
	{
		id: 2,
		title: '봄비가 내리는 오후',
		author: '비바람',
		category: '산문',
		date: '2026.03.07',
		likes: 89,
		comments: 15
	},
	{
		id: 3,
		title: '도시의 등불',
		author: '여행자',
		category: '운문',
		date: '2026.03.06',
		likes: 203,
		comments: 41
	}
];

export const placeholderUserStats = { myWorks: 3, totalLikes: 127, weeklyLikes: 12, myReviews: 5 };
