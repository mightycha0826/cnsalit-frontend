// 뭔가 Type const를 string으로 두지 않고 추후에 확실하게 enum이나 직관적이게 1/0 이런 식으로 바꾸는 것도 괜찮을듯

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const validType = new Set(['poem', 'prose']);

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const { user } = locals;
    if (!user) throw redirect(303, '/auth/login?next=/new');

    const formData = await request.formData();
    const rawTitle = formData.get('title');
    const rawType = formData.get('type');
    const rawContent = formData.get('content');

    if (typeof rawTitle !== 'string') return fail(400, { error: '제목을 입력해주세요.' });
    if (typeof rawType !== 'string') return fail(400, { error: '유형을 선택해주세요.' });

    const title = rawTitle.trim().normalize();
    const type = rawType.trim();

    if (!title) return fail(400, { error: '제목을 입력해주세요.' });
    if (title.length > 30) return fail(400, { error: '제목은 30자 이내여야 합니다.' });
    if (!validType.has(type)) return fail(400, { error: '유효하지 않은 유형입니다.' });

    let content: unknown = null;
    if (typeof rawContent === 'string' && rawContent.trim()) {
      try {
        content = JSON.parse(rawContent);
      } 
      catch {
        return fail(400, { error: '본문 데이터가 올바르지 않습니다.' });
      }
    }

    const { data, error } = await locals.supabase
      .from('writings')
      .insert({
        user_id: user.id,
        title,
        type,
        content
      })
      .select('id')
      .single();

    if (error) {
      if (error.code === '23505') return fail(409, { error: '이미 사용 중인 제목이에요.' });
      return fail(500, { error: '저장에 실패했습니다.' });
    }

    if (!data?.id) return fail(500, { error: '저장 결과를 확인할 수 없습니다.' });

    throw redirect(303, `/writing/${data.id}`);
  }
};
