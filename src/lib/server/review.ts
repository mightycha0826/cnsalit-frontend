import { error } from '@sveltejs/kit';

type Supabase = App.Locals['supabase'];

export type ReviewItem = {
  id: string;
  content: string;
  user_id: string;
  created_at: string | null;
  author: { pen_name: string | null } | null;
};

type CreateReviewInput = {
  writingId: number;
  userId: string;
  content: string;
};

type CreateReviewResult =
  | { ok: true }
  | { ok: false; code: 'EMPTY' | 'TOO_LONG' | 'WRITING_NOT_FOUND' | 'DUPLICATE' | 'UNKNOWN' };

export const getReviewMap = async (
  supabase: Supabase, 
  writingIds: number[]
) => {
  const ids = [...new Set(writingIds)];
  const map = new Map<number, number>();
  for (const id of ids) map.set(id, 0);

  if (ids.length === 0) return map;

  const { data, error: dbError } = await supabase.from('reviews').select('writing_id').in('writing_id', ids);
  if (dbError) throw error(500, '댓글 수 조회 실패');

  for (const row of data ?? []) {
    map.set(row.writing_id, (map.get(row.writing_id) ?? 0) + 1);
  }

  return map;
};

export const getReviews = async (supabase: Supabase, writingId: number): Promise<ReviewItem[]> => {
  const { data: reviews, error: reviewError } = await supabase
    .from('reviews')
    .select('id, content, user_id, created_at')
    .eq('writing_id', writingId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false });

  if (reviewError) throw error(500, '댓글 목록 조회 실패');

  const authorIds = [...new Set((reviews ?? []).map((r) => r.user_id).filter(Boolean))];
  const { data: authors, error: authorError } =
    authorIds.length === 0
      ? { data: [] as { id: string; pen_name: string | null }[], error: null }
      : await supabase.from('users').select('id, pen_name').in('id', authorIds);

  if (authorError) throw error(500, '작성자 조회 실패');

  const authorMap = new Map((authors ?? []).map((a) => [a.id, a.pen_name]));

  return (reviews ?? []).map((r) => ({
    ...r,
    author: { pen_name: authorMap.get(r.user_id) ?? null }
  }));
};

export const createReview = async (
  supabase: Supabase,
  { writingId, userId, content }: CreateReviewInput
): Promise<CreateReviewResult> => {
  const normalized = content.trim().normalize();
  if (!normalized) return { ok: false, code: 'EMPTY' };
  // if (normalized.length > 1000) return { ok: false, code: 'TOO_LONG' };

  const { error: insertError } = await supabase.from('reviews').insert({
    writing_id: writingId,
    user_id: userId,
    content: normalized
  });

  if (!insertError) return { ok: true };
  if (insertError.code === '23503') return { ok: false, code: 'WRITING_NOT_FOUND' };
  if (insertError.code === '23505') return { ok: false, code: 'DUPLICATE' };
  return { ok: false, code: 'UNKNOWN' };
};

export const updateReview = async (
  supabase: App.Locals['supabase'],
  input: { reviewId: string; userId: string; content: string }
): Promise<{ ok: true } | { ok: false; code: 'EMPTY' | 'TOO_LONG' | 'NOT_FOUND' | 'UNKNOWN' }> => {
  const content = input.content.trim().normalize();
  if (!content) return { ok: false, code: 'EMPTY' };
  // if (content.length > 1000) return { ok: false, code: 'TOO_LONG' };

  const { data, error } = await supabase
    .from('reviews')
    .update({ content })
    .eq('id', input.reviewId)
    .eq('user_id', input.userId)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, code: 'UNKNOWN' };
  if (!data) return { ok: false, code: 'NOT_FOUND' };

  return { ok: true };
};

export const deleteReview = async (
  supabase: App.Locals['supabase'],
  input: { reviewId: string; userId: string }
): Promise<{ ok: true } | { ok: false; code: 'NOT_FOUND' | 'UNKNOWN' }> => {

  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', input.reviewId)
    .eq('user_id', input.userId)
    .select('id')
    .maybeSingle();

  if (error) return { ok: false, code: 'UNKNOWN' };
  if (!data) return { ok: false, code: 'NOT_FOUND' };
  
  return { ok: true };
};