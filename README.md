# FLAT WEB

Next.js App Router / React / GSAP ScrollTrigger로 구현한 반응형 브랜드 사이트.

## 개발

Node.js 24 권장 (Next.js 최소 Node.js 20.9).

```sh
npm ci
npm run dev
```

## 정적 빌드

```sh
npm run build
python3 -m http.server 3000 --bind 0.0.0.0 --directory out
```

`output: export`를 사용합니다. GitHub Pages 서브 경로 빌드는 `NEXT_PUBLIC_BASE_PATH=/flatweb npm run build`로 실행합니다. main push 시 `.github/workflows/deploy.yml`이 정적 파일을 빌드하고 GitHub Pages로 배포합니다. 저장소 Settings → Pages → Source를 GitHub Actions로 설정해야 하며, Pages 사용이 가능한 저장소/요금제가 필요합니다.

## 원본 이미지

첨부된 시안의 개별 원본 파일이 아직 없어 CSS 그래픽으로 임시 구성했습니다. 다른 사진으로 대체하지 않았습니다. 아래 경로에 원본을 넣으면 자동 연결됩니다.

- `public/assets/hero.jpg`: 텍스트·버튼 없는 배경 (문구와 버튼은 HTML 오버레이)
- `public/assets/work-01.jpg`: 엘코리아
- `public/assets/work-02.jpg`: ON THE PET
- `public/assets/work-03.jpg`: mune
- `public/assets/studio.jpg`: 작업실
- `public/assets/ai-workflow.jpg`: AI 워크플로

문의 버튼은 연결 준비 안내를 표시합니다. 운영자의 실제 상담 URL/이메일이 필요합니다.

히어로 부유·패럴랙스·스크롤 등장 효과는 GSAP으로 처리하며 `prefers-reduced-motion`을 존중합니다. CSS는 Next.js가 번들링합니다. Google Fonts 연결이 불가하면 시스템 폰트를 사용합니다.
