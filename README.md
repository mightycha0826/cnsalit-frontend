# cnsalit-neo Project | 큰별문학제 온라인 전시관

## Tech Stacks
- Sveltekit + TailwindCSS (Frontend)
- Cloudflare Workers (Runtime)
- Supabase (PostgreSQL + Auth)

## Setup
```sh
# 종속성 설치
npm install

# 개발 서버 구동
npm run dev

# 프로덕션 배포
npm run build && npx wrangler deploy