import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { toggleLike } from '$lib/server/like';

export const POST: RequestHandler = async ({ locals, params }) => {
  const user = locals.user;
  if (!user) throw error(401, '로그인이 필요합니다.');

  const writingId = Number(params.id);
  if (!Number.isFinite(writingId)) throw error(400, '잘못된 글 ID');

  const result = await toggleLike(locals.supabase, writingId, user.id);
  return json(result); // { liked, likeCount }
};
