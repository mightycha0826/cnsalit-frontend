import { error } from '@sveltejs/kit';

type Supabase = App.Locals['supabase'];

export const getLikeMap = async (
  supabase: Supabase,
  writingIds: number[], //글 ID 리스트
  currentUserId: string
) => {
  const map = new Map<number, { likeCount: number; isLiked: boolean }>();

  //글이 아예 없는 경우
  if (writingIds.length === 0) 
    return map;

  const { data, error: dbError } = await supabase
    .from('likes')
    .select('writing_id, user_id')
    .in('writing_id', writingIds);

  if (dbError) throw error(500, '좋아요 정보 조회 실패');

  for (const id of writingIds) map.set(id, { likeCount: 0, isLiked: false });

  for (const row of data ?? []) {
    const item = map.get(row.writing_id);
    if (!item) continue;
    item.likeCount += 1;
    if (row.user_id === currentUserId) item.isLiked = true;
  }

  return map;
};

export const toggleLike = async (
  supabase: Supabase,
  writingId: number,
  userId: string
) => {
  const { data: existing, error: e1 } = await supabase
    .from('likes')
    .select('id')
    .eq('writing_id', writingId)
    .eq('user_id', userId)
    .maybeSingle();

  if (e1) throw error(500, '좋아요 상태 조회 실패');

  let liked: boolean;
  if (existing?.id) {
    const { error: e2 } = await supabase.from('likes').delete().eq('id', existing.id);
    if (e2) throw error(500, '좋아요 취소 실패');
    liked = false;
  } else {
    const { error: e3 } = await supabase.from('likes').insert({ writing_id: writingId, user_id: userId });
    if (e3) throw error(500, '좋아요 등록 실패');
    liked = true;
  }

  const { count, error: e4 } = await supabase
    .from('likes')
    .select('*', { head: true, count: 'exact' })
    .eq('writing_id', writingId);

  if (e4) throw error(500, '좋아요 수 조회 실패');

  return { liked, likeCount: count ?? 0 };
};
