import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals, params }) => {
  const { user } = await parent();

  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, '잘못된 글 ID');

  const { data, error: dbError } = await locals.supabase
    .from('writings')
    .select('id, title, type, content, created_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (dbError || !data) throw error(404, '글을 찾을 수 없습니다.');

  return { writing: data };
};

export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const { user } = locals;
    if (!user) throw redirect(303, `/auth/login?next=/writing/${params.id}/edit`);

    const id = Number(params.id);
    if (!Number.isFinite(id)) throw error(400, '잘못된 글 ID');

    const formData = await request.formData();
    const rawTitle = formData.get('title');
    const rawContent = formData.get('content');

    if (typeof rawTitle !== 'string') return fail(400, { error: '제목을 입력해주세요.' });
    
    const title = rawTitle.trim().normalize(); //한국어 입력 정규화

    if (!title) return fail(400, { error: '제목을 입력해주세요.' });
    if (title.length > 30) return fail(400, { error: '제목은 30자 이내여야 합니다.' });

    let content: unknown = null;
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        content = JSON.parse(rawContent);
      } 
      catch {
        return fail(400, { error: '본문 데이터가 올바르지 않습니다.' });
      }
    }

    const { data, error: dbError } = await locals.supabase
      .from('writings')
      .update({ title, content })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id')
      .single();

    if (dbError) {
      if (dbError.code === '23505') return fail(409, { error: '이미 사용 중인 제목이에요.' });
      return fail(500, { error: '저장에 실패했습니다.' });
    }

    if (!data?.id) return fail(404, { error: '글을 찾을 수 없습니다.' });

    throw redirect(303, `/writing/${data.id}`);
  },
};