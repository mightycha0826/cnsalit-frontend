import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getLikeMap } from '$lib/server/like';
import { createReview, updateReview, deleteReview, getReviews } from '$lib/server/review';
import { placeholderWorks } from '$lib/stores/user.js';

export const load: PageServerLoad = async ({ locals, params }) => {

  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, '글 ID가 잘못되었습니다.');

  const { data: writing, error: writingError } = await locals.supabase
    .from('writings')
    .select('id, title, type, content, created_at')
    .eq('id', id)
    .single();

  if (writingError || !writing) {
    // Fallback for placeholder data (demo purposes)
    const placeholder = placeholderWorks.find((w) => w.id === id);
    if (placeholder) {
      return {
        writing: {
          id: placeholder.id,
          title: placeholder.title,
          type: placeholder.category,
          content: {
            ops: [
              {
                insert: `이 작품은 '${placeholder.title}'의 견본 본문입니다.\n\n데모 데이터를 위해 준비된 공간입니다.`
              }
            ]
          },
          created_at: new Date().toISOString()
        },
        likeMap: { likeCount: placeholder.likes, isLiked: false },
        reviews: [],
        reviewCount: placeholder.comments,
        currentUserId: locals.user?.id || null
      };
    }
    throw error(404, '글을 찾을 수 없습니다.');
  }

  const rawlikeMap = await getLikeMap(locals.supabase, [id], locals.user?.id || '');
  const likeMap = rawlikeMap.get(id) ?? { likeCount: 0, isLiked: false };

  const reviews = await getReviews(locals.supabase, id);

  return { writing, likeMap, reviews, reviewCount: reviews.length, currentUserId: locals.user?.id || null };
};

export const actions: Actions = {

  addReview: async ({ locals, params, request }) => {
    const user = locals.user;
    if (!user) throw redirect(303, `/auth/login?next=/writing/${params.id}`);

    const writingId = Number(params.id);
    if (!Number.isFinite(writingId)) throw error(400, '글 ID가 잘못되었습니다.');

    const formData = await request.formData();
    const content = String(formData.get('content') ?? '');

    const result = await createReview(locals.supabase, { writingId, userId: user.id, content });

    if (result.ok) throw redirect(303, `/writing/${writingId}`);
    if (result.code === 'EMPTY') return fail(400, { reviewError: '댓글을 입력해주세요.' });
    // if (result.code === 'TOO_LONG') return fail(400, { reviewError: '댓글은 1000자 이내여야 합니다.' });
    if (result.code === 'DUPLICATE') return fail(409, { reviewError: '이미 이 글에 댓글을 작성했습니다.' });
    if (result.code === 'WRITING_NOT_FOUND') throw error(404, '글을 찾을 수 없습니다.');
    return fail(500, { reviewError: '댓글 저장에 실패했습니다.' });
  },

  editReview: async ({ locals, params, request }) => {
    const user = locals.user;
    if (!user) throw redirect(303, `/auth/login?next=/writing/${params.id}`);

    const formData = await request.formData();
    const content = String(formData.get('content') ?? '');

    const reviewId = String(formData.get('review_id') ?? '');

    if (!reviewId) return fail(400, { reviewError: '잘못된 요청입니다.' });

    const result = await updateReview(locals.supabase, { reviewId, userId: user.id, content });

    if (result.ok) throw redirect(303, `/writing/${params.id}`);
    if (result.code === 'EMPTY') return fail(400, { reviewError: '댓글을 입력해주세요.' });
    // if (result.code === 'TOO_LONG') return fail(400, { reviewError: '댓글은 1000자 이내여야 합니다.' });
    if (result.code === 'NOT_FOUND') throw error(404, '댓글을 찾을 수 없습니다.');
    return fail(500, { reviewError: '댓글 수정에 실패했습니다.' });
  },

  removeReview: async ({ locals, params, request }) => {
    const user = locals.user;
    if (!user) throw redirect(303, `/auth/login?next=/writing/${params.id}`);

    const formData = await request.formData();
    const reviewId = String(formData.get('review_id') ?? '');
    if (!reviewId) return fail(400, { reviewError: '잘못된 요청입니다.' });

    const result = await deleteReview(locals.supabase, { reviewId, userId: user.id });

    if (result.ok) throw redirect(303, `/writing/${params.id}`);
    if (result.code === 'NOT_FOUND') throw error(404, '댓글을 찾을 수 없습니다.');
    return fail(500, { reviewError: '댓글 삭제에 실패했습니다.' });
  }
};