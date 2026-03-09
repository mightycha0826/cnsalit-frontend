import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLikeMap } from '$lib/server/like';
import { getReviewMap } from '$lib/server/review';


type WritingListItem = {
  id: number;
  title: string;
  type: string;
  author: { pen_name: string | null } | null;
  created_at: string | null;
  like_count: number;
  is_liked: boolean;
  review_count: number;
};

export const load: PageServerLoad = async ({ locals }) => {
  const { data: writings, error: wError } = await locals.supabase
    .from('writings')
    .select('id, title, type, created_at, user_id')
    .order('created_at', { ascending: false });

  if (wError) throw error(500, '작품 목록을 불러오는 중에 오류가 발생했습니다.');
  

  const authorIds = [...new Set((writings ?? []).map((w) => w.user_id).filter(Boolean))];

  const { data: authors, error: aError } =
    authorIds.length === 0
      ? { data: [] as { id: string; pen_name: string | null }[], error: null }
      : await locals.supabase
          .from('users')
          .select('id, pen_name')
          .in('id', authorIds);

  if (aError) throw error(500, '작가 정보를 불러오는 중에 오류가 발생했습니다.');

  const authorMap = new Map((authors ?? []).map((u) => [u.id, u.pen_name]));

  const writingIds = (writings ?? []).map((w) => w.id);
  const currentUserId = locals.user?.id ?? '';
  const likeMap = await getLikeMap(locals.supabase, writingIds, currentUserId);
  const reviewMap = await getReviewMap(locals.supabase, writingIds);

  const merged = (writings ?? []).map((w) => {
    const like = likeMap.get(w.id) ?? { likeCount: 0, isLiked: false };

    return {
      id: w.id,
      title: w.title,
      type: w.type,
      created_at: w.created_at,
      author: { pen_name: authorMap.get(w.user_id) ?? null },
      like_count: like.likeCount,
      is_liked: like.isLiked,
      review_count: reviewMap.get(w.id) ?? 0
    };
  });

  return {
    writings: merged as WritingListItem[],
  };
};
