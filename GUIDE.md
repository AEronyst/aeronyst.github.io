# 포트폴리오 관리 가이드

이 문서는 포트폴리오 사이트를 직접 관리하고 업데이트하는 방법을 설명합니다.

---

## 목차

1. [전체 파일 구조](#1-전체-파일-구조)
2. [로컬에서 미리보기](#2-로컬에서-미리보기)
3. [콘텐츠 수정하기](#3-콘텐츠-수정하기)
   - [텍스트 수정](#31-텍스트-수정)
   - [YouTube 영상 추가](#32-youtube-영상-추가)
   - [이미지·동영상 파일 추가](#33-이미지동영상-파일-추가)
   - [카테고리 커버 이미지 변경](#34-카테고리-커버-이미지-변경)
   - [카테고리 추가·삭제](#35-카테고리-추가삭제)
   - [경력 추가·수정](#36-경력-추가수정)
4. [Git으로 배포하기](#4-git으로-배포하기)
   - [Git이란?](#41-git이란)
   - [처음 한 번만 하는 설정](#42-처음-한-번만-하는-설정)
   - [매번 작업할 때 흐름](#43-매번-작업할-때-흐름)
   - [자주 쓰는 Git 명령어](#44-자주-쓰는-git-명령어)
5. [배포 확인](#5-배포-확인)
6. [문제 해결](#6-문제-해결)

---

## 1. 전체 파일 구조

```
portpolio/
│
├── data.js           ★ 모든 콘텐츠 데이터 (이것만 주로 수정)
│
├── index.html        메인 페이지
├── about.html        소개 페이지
├── capabilities.html 역량 페이지
│
├── covers/           카테고리 카드 커버 이미지
│   ├── cat-ad.png
│   ├── cat-drama.png
│   └── ...
│
├── uploads/          작업물 이미지·영상 파일
│   ├── 광고 브랜디드 컨텐츠.png
│   └── ...
│
├── styles.css        전체 스타일
├── app.js            앱 진입점
├── sections-a.js     Hero, Stats, About, Capabilities 컴포넌트
├── sections-b.js     WorkGrid, Career, Contact, Footer 컴포넌트
├── editable.js       Nav, LangToggle 컴포넌트
└── utils.js          유틸리티 함수
```

**평소에 건드릴 파일은 `data.js`와 `uploads/` 폴더뿐입니다.**

---

## 2. 로컬에서 미리보기

`C:\Users\aeron\Desktop\Dev\portpolio\index.html` 파일을 더블클릭하면 브라우저에서 바로 열립니다.

텍스트, 이미지, 레이아웃 등 대부분의 내용은 이 방법으로 확인할 수 있습니다.

> **YouTube 임베드는 로컬에서 동작하지 않습니다.**  
> 브라우저 보안 정책상 파일로 직접 열면 외부 영상이 차단됩니다.  
> YouTube 영상은 GitHub Pages에 push한 후 `https://aeronyst.github.io` 에서 확인하세요.

---

## 3. 콘텐츠 수정하기

모든 콘텐츠는 **`data.js`** 파일 하나에서 관리합니다.  
VSCode에서 `data.js`를 열고 수정합니다.

### 3.1 텍스트 수정

텍스트는 모두 `{ "ko": "한국어", "en": "English" }` 형태입니다.

**예: 소개글 수정**

`data.js`에서 `"about"` 섹션을 찾습니다:

```js
"about": {
  "title": { "ko": "소개", "en": "About" },
  "body": {
    "ko": "여기를 수정하세요.",   // ← 한국어 텍스트
    "en": "Edit this."           // ← 영어 텍스트
  }
},
```

**예: 이름·이메일·역할 수정**

```js
"meta": {
  "name": { "ko": "최종현", "en": "Jonghyun Choi" },
  "role": { "ko": "크리에이티브 영상 프로듀서", "en": "Creative Video Producer" },
  "email": "aeronyst@gmail.com",   // ← 이메일 주소
  "location": { "ko": "서울, 대한민국", "en": "Seoul, Republic of Korea" }
},
```

---

### 3.2 YouTube 영상 추가

**① 유튜브 영상 ID 확인**

유튜브 URL에서 `v=` 뒤의 11자리 값이 영상 ID입니다.

```
https://www.youtube.com/watch?v=aVaX3ouw_e0
                                ↑ 이 부분 (aVaX3ouw_e0)

https://youtu.be/aVaX3ouw_e0
                 ↑ 이 부분 (aVaX3ouw_e0)
```

**② data.js에서 해당 카테고리의 `items` 배열에 추가**

```js
{ "id": "cat-ad", ...,
  "items": [
    // 기존 항목들...

    // ↓ 새 항목 추가 (쉼표 주의)
    {
      "id": "itm-ad-3",               // 전체에서 겹치지 않는 고유 ID
      "type": "youtube",
      "youtubeId": "aVaX3ouw_e0",     // 영상 ID
      "title": { "ko": "영상 제목", "en": "Video Title" },
      "thumbnail": "https://i.ytimg.com/vi/aVaX3ouw_e0/hqdefault.jpg"
                                       // ↑ youtubeId와 동일하게 맞춰주세요
    }
  ]
}
```

> **임베드 활성화 확인:** 본인 채널 영상이라면 YouTube Studio → 영상 → 세부정보 → 더보기 → **"동영상 삽입 허용"** 이 체크되어 있어야 합니다.

---

### 3.3 이미지·동영상 파일 추가

**① 파일을 `uploads/` 폴더에 넣기**

`C:\Users\aeron\Desktop\Dev\portpolio\uploads\` 폴더에 이미지나 영상 파일을 복사합니다.

> 파일명에 한글보다 영문을 권장합니다. 한글 파일명은 일부 브라우저나 서버에서 문제가 생길 수 있습니다.

**② data.js에 항목 추가**

```js
// 이미지 파일
{
  "id": "itm-ad-4",
  "type": "image",                    // 이미지일 때
  "url": "uploads/파일명.jpg",
  "filename": "파일명.jpg",
  "title": { "ko": "이미지 제목", "en": "Image Title" }
}

// 동영상 파일
{
  "id": "itm-ad-5",
  "type": "video",                    // 동영상 파일일 때
  "url": "uploads/파일명.mp4",
  "filename": "파일명.mp4",
  "title": { "ko": "영상 제목", "en": "Video Title" }
}
```

---

### 3.4 카테고리 커버 이미지 변경

카테고리 카드에 표시되는 커버 이미지는 `covers/` 폴더에 있습니다.

`data.js`에서 해당 카테고리의 `"cover"` 값을 수정합니다:

```js
{ "id": "cat-ad", ..., "cover": "covers/cat-ad.png", ... }
//                               ↑ 이 경로를 바꾸면 됩니다
```

새 이미지를 `covers/` 폴더에 넣고 경로를 맞춰주면 됩니다.  
권장 이미지 비율: **16:9**, 권장 크기: 1600×900px

---

### 3.5 카테고리 추가·삭제

**추가:** `data.js`의 `"categories"` 배열 끝에 항목을 추가합니다.

```js
{
  "id": "cat-new",                              // 고유 ID
  "title": { "ko": "새 카테고리", "en": "New Category" },
  "hue": 200,                                   // 커버 없을 때 배경 색조 (0~360)
  "cover": "covers/새이미지.png",               // 커버 이미지 경로
  "items": []                                   // 작업물 (처음엔 비워도 됨)
}
```

**삭제:** 해당 카테고리 블록 전체(`{ ... }`)를 지웁니다. 앞뒤 쉼표도 함께 정리하세요.

---

### 3.6 경력 추가·수정

`data.js`의 `"career"` → `"items"` 배열에서 수정합니다.  
최신 경력이 위로 오도록 배열 맨 앞에 추가합니다.

```js
"items": [
  // ↓ 새 경력을 맨 앞에 추가
  {
    "year": "2026.01",
    "title": { "ko": "프로젝트명", "en": "Project Name" },
    "body": { "ko": "작업 설명", "en": "Description" },
    "badge": null                    // 뱃지 없으면 null
    // 뱃지 있으면: "badge": { "ko": "수상작", "en": "Award" }
  },

  // 기존 항목들...
]
```

---

## 4. Git으로 배포하기

### 4.1 Git이란?

Git은 파일 변경 이력을 관리하는 도구입니다.  
쉽게 말해 **"저장 + 업로드"** 를 담당합니다.

```
내 컴퓨터 (data.js 수정)
    ↓  git add      : "이 파일들 저장 준비"
    ↓  git commit   : "변경 내용 확정 저장"
    ↓  git push     : "GitHub에 업로드"
    ↓
GitHub → GitHub Pages → 사이트 자동 반영
```

---

### 4.2 처음 한 번만 하는 설정 (해둔 것)

VSCode 터미널에서 아래 명령어를 한 번만 실행합니다 (이름·이메일은 본인 것으로):

```powershell
git config --global user.name "AEronyst"
git config --global user.email "aeronyst@gmail.com"
```

---

### 4.3 매번 작업할 때 흐름

#### 1단계 — data.js 수정 후 변경 내용 확인

```powershell
git status
```

수정된 파일 목록이 표시됩니다.

#### 2단계 — 저장 준비 (staging)

```powershell
git add .
```

`.`은 "변경된 모든 파일"을 의미합니다.  
특정 파일만 올리려면: `git add data.js`

#### 3단계 — 확정 저장 (commit)

```powershell
git commit -m "update: 광고 카테고리에 영상 3개 추가"
```

따옴표 안의 메시지는 어떤 변경을 했는지 짧게 적습니다.  
나중에 이력을 볼 때 알아보기 쉽도록 구체적으로 적는 게 좋습니다.

#### 4단계 — GitHub에 업로드 (push)

```powershell
git push origin main
```

이 명령어를 실행하면 1~2분 내로 사이트에 반영됩니다.

---

### 4.4 자주 쓰는 Git 명령어

| 명령어 | 설명 |
|---|---|
| `git status` | 변경된 파일 목록 확인 |
| `git add .` | 모든 변경 파일 저장 준비 |
| `git add data.js` | 특정 파일만 저장 준비 |
| `git commit -m "메시지"` | 변경 내용 확정 저장 |
| `git push origin main` | GitHub에 업로드 |
| `git log --oneline` | 지금까지의 저장 이력 확인 |
| `git diff` | 마지막 저장 이후 변경 내용 확인 |

---

## 5. 배포 확인

push 후 `https://aeronyst.github.io` 에 접속합니다.

반영까지 보통 **1~3분** 정도 걸립니다.  
바로 안 보이면 브라우저에서 `Ctrl + Shift + R` (강력 새로고침) 을 눌러보세요.

배포 상태는 GitHub 저장소 → **Actions** 탭에서 확인할 수 있습니다.  
초록색 체크 ✓ 이면 배포 완료입니다.

---

## 6. 문제 해결

**Q. YouTube 영상이 "Error 153"으로 보여요**  
→ YouTube Studio에서 해당 영상의 **"동영상 삽입 허용"** 설정을 확인하세요.

**Q. 로컬에서는 잘 되는데 GitHub Pages에서 이미지가 안 보여요**  
→ 파일명 대소문자를 확인하세요. Windows는 대소문자를 구분하지 않지만 GitHub Pages(Linux)는 구분합니다.  
→ `uploads/Image.png` ≠ `uploads/image.png`

**Q. push를 했는데 사이트가 안 바뀌어요**  
→ GitHub 저장소 → Actions 탭에서 배포 오류가 있는지 확인하세요.  
→ 브라우저 캐시 문제일 수 있으니 `Ctrl + Shift + R` 로 새로고침하세요.

**Q. `git push` 할 때 오류가 나요**  
→ SSH 키 설정이 필요할 수 있습니다. GitHub Docs의 [SSH 키 생성 가이드](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh)를 참고하세요.
