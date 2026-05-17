# 최종현 포트폴리오

크리에이티브 영상 프로듀서 · 3D 아티스트 포트폴리오 사이트입니다.

**→ [aeronyst.github.io](https://aeronyst.github.io)**

## 기술 스택

- React 18 (CDN, 빌드 없음)
- 순수 HTML / CSS / JavaScript
- GitHub Pages 정적 호스팅

## 콘텐츠 수정 방법

`data.js` 파일 하나만 편집하면 됩니다.

### 텍스트 수정

`data.js` 안의 해당 필드를 직접 수정합니다. 모든 텍스트는 `{ "ko": "...", "en": "..." }` 형태로 한/영 양언어를 관리합니다.

### 작업물 추가

`data.js`의 각 카테고리 `items` 배열에 항목을 추가합니다.

**YouTube 영상**
```js
{
  "id": "itm-고유ID",
  "type": "youtube",
  "youtubeId": "유튜브_영상_ID",
  "title": { "ko": "제목", "en": "Title" },
  "thumbnail": "https://i.ytimg.com/vi/유튜브_영상_ID/hqdefault.jpg"
}
```

**이미지 · 동영상 파일**
```js
{
  "id": "itm-고유ID",
  "type": "image",
  "url": "uploads/파일명.png",
  "filename": "파일명.png",
  "title": { "ko": "제목", "en": "Title" }
}
```
> 파일은 `uploads/` 폴더에 넣고, `type`은 이미지면 `"image"`, 동영상 파일이면 `"video"`.

### 배포

```bash
git add .
git commit -m "update: 변경 내용"
git push origin main
```

push 하면 GitHub Pages에 자동 반영됩니다.
