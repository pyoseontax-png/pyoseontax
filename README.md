# 세무회계 표선 홈페이지 (pyoseontax.com)

GitHub Pages로 무료 호스팅하는 정적 웹사이트입니다. 서버·DB 없이 파일만 올리면 동작합니다.

## 파일 구성

```
index.html          메인 페이지 (모든 내용이 여기 있습니다)
privacy.html        개인정보처리방침
404.html            없는 주소로 들어왔을 때 보이는 페이지
CNAME               연결할 도메인 (pyoseontax.com) — 지우지 마세요
robots.txt          검색엔진 수집 허용 설정
sitemap.xml         검색엔진용 페이지 목록
.nojekyll           GitHub의 Jekyll 처리 끄기 — 지우지 마세요
assets/css/style.css   디자인
assets/js/main.js      동작 (메뉴, 나침반, 상담폼)
assets/img/            로고·사진·아이콘
```

---

# 1단계 · GitHub에 올리기

## 1-1. 계정과 저장소 만들기

1. https://github.com 에서 회원가입 (이미 있다면 로그인)
2. 오른쪽 위 **+** → **New repository**
3. 아래처럼 설정하고 **Create repository**
   - Repository name: `pyoseontax` (아무 이름이나 가능)
   - **Public** 선택 ← 무료 계정은 Public이어야 Pages가 동작합니다
   - Add a README file은 **체크 해제**

## 1-2. 파일 업로드 (드래그 앤 드롭)

1. 만들어진 저장소 화면에서 **uploading an existing file** 링크 클릭
2. 압축을 푼 폴더 **안의 파일들을 전부 선택**해서 드래그
   - ⚠️ 폴더째로 끌어넣지 말고, 폴더를 열어서 `index.html`, `assets` 등을 함께 선택하세요.
   - ⚠️ `.nojekyll`, `CNAME`은 숨김 파일처럼 보일 수 있으니 빠지지 않았는지 확인하세요.
3. 아래 **Commit changes** 클릭

> 터미널을 쓰신다면:
> ```bash
> cd 폴더경로
> git init
> git add .
> git commit -m "홈페이지 최초 배포"
> git branch -M main
> git remote add origin https://github.com/사용자명/pyoseontax.git
> git push -u origin main
> ```

## 1-3. GitHub Pages 켜기

1. 저장소 상단 **Settings** → 왼쪽 메뉴 **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / 폴더 **/ (root)** → **Save**
4. 1~2분 뒤 새로고침하면 `https://사용자명.github.io/pyoseontax/` 주소가 나옵니다. 여기서 먼저 확인하세요.

---

# 2단계 · pyoseontax.com 도메인 연결

## 2-1. GitHub 쪽 설정

Settings → Pages → **Custom domain** 칸에 `pyoseontax.com` 입력 후 **Save**
(저장소에 `CNAME` 파일이 이미 있으므로 자동으로 채워져 있을 수도 있습니다.)

## 2-2. 도메인 관리 사이트에서 DNS 설정

가비아·후이즈·카페24·GoDaddy 등 **도메인을 구입한 곳**의 DNS 관리 화면에서 아래 레코드를 추가합니다.

| 타입 | 호스트/이름 | 값 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `사용자명.github.io.` |

- `@`는 도메인 자체(pyoseontax.com)를 뜻합니다. 관리 화면에 따라 빈칸이나 `pyoseontax.com.`으로 입력합니다.
- CNAME 값의 **끝 점(.)**을 빠뜨리지 마세요. 일부 업체는 자동으로 붙습니다.
- 기존에 다른 A 레코드나 포워딩 설정이 있으면 **삭제**해야 합니다.

## 2-3. HTTPS 켜기

DNS 반영에 보통 10분~24시간이 걸립니다. 반영이 끝나면 Settings → Pages 화면의
**Enforce HTTPS** 체크박스가 활성화됩니다. 반드시 체크하세요. (`https://pyoseontax.com`으로 접속)

체크박스가 회색으로 비활성이면 아직 인증서 발급 중입니다. 몇 시간 뒤 다시 확인하세요.

---

# 3단계 · 상담 신청 폼 연결 (필수)

GitHub Pages는 정적 호스팅이라 폼 전송 기능이 없습니다. 무료 폼 서비스를 연결합니다.

1. https://formspree.io 가입 (무료 플랜: 월 50건)
2. **New Form** 생성 → 수신 이메일을 `jmw@pyoseontax.com`으로 지정
3. 발급된 주소(예: `https://formspree.io/f/abcdwxyz`) 복사
4. `index.html`에서 아래 부분을 찾아 주소를 교체

```html
<form class="form" id="contactForm"
      action="https://formspree.io/f/YOUR_FORM_ID"   ← 이 줄을 교체
      method="POST">
```

5. 저장 후 다시 업로드(commit)하면 적용됩니다.

> 연결 전에는 상담 신청 버튼을 눌러도 "폼이 연결되지 않았습니다. 전화나 이메일로 연락 주세요"라는 안내가 나오도록 되어 있어, 문의가 그냥 사라지지는 않습니다.

---

# 4단계 · 반드시 수정해야 할 내용

`index.html`을 GitHub 화면에서 열고 연필(✏️) 아이콘을 눌러 바로 수정할 수 있습니다.

약력·사업자등록번호·주소·주차 안내는 이미 실제 정보로 반영되어 있습니다. 남은 항목은 아래 둘입니다.

| 위치 | 지금 상태 | 할 일 |
|---|---|---|
| 상담 시간 | `평일 09:00 – 18:00` | 실제 운영 시간으로 조정 (연락처 카드 · 오시는 길 두 곳) |
| 개인정보처리방침 | 위탁업체·시행일 | 실제 사용하는 서비스와 날짜로 수정 |

**약도 교체**: `assets/img/map.png`를 같은 이름의 다른 이미지로 덮어쓰면 지도가 바뀝니다.
지금 이미지는 가로 380px이라 고해상도 화면에서 다소 뿌옇게 보일 수 있습니다.
더 선명하게 하려면 지도를 화면에 크게 띄운 상태에서 **가로 800px 이상**으로 다시 캡처해 교체하세요.

**표현 관련 주의**: 세무사법과 관련 광고 규정상 "최고", "1위", "100% 환급", 승소율·환급액 보장 같은 표현은 문제가 될 수 있습니다. 지금 원고는 사실 위주로만 작성했으니, 문구를 추가하실 때 참고하세요.

---

# 5단계 · 검색 노출 (선택)

1. **구글**: [Search Console](https://search.google.com/search-console)에서 `pyoseontax.com` 등록 → 확인용 메타태그를 `index.html` 상단 `google-site-verification` 칸에 입력 → `sitemap.xml` 제출
2. **네이버**: [서치어드바이저](https://searchadvisor.naver.com)에서 사이트 등록 → 확인용 코드를 `naver-site-verification` 칸에 입력 → 사이트맵 제출
3. **네이버 스마트플레이스**: 지역 검색 노출에는 홈페이지보다 이쪽이 효과가 큽니다. 별도로 등록하세요.

---

# 자주 겪는 문제

**404가 뜹니다**
Pages 설정에서 Branch가 `main` / `(root)`인지, 저장소 최상위에 `index.html`이 있는지 확인하세요.
(`pyoseontax/index.html`처럼 폴더 안에 들어가 있으면 안 됩니다.)

**CSS가 깨진 채로 나옵니다**
`assets` 폴더가 통째로 올라갔는지 확인하세요. 파일 하나씩 올리면 폴더 구조가 깨질 수 있습니다.

**도메인 연결 후 화면이 안 바뀝니다**
DNS 반영 대기 중입니다. 브라우저 캐시를 지우거나 시크릿 창에서 확인하세요. 최대 24시간.

**수정했는데 화면이 그대로입니다**
GitHub Pages 반영에 1~2분 걸립니다. 이후에도 그대로면 `Ctrl+Shift+R`(맥은 `Cmd+Shift+R`)로 강력 새로고침하세요.

---

# 나중에 페이지를 더 늘리려면

`privacy.html`을 복사해서 이름만 바꾸면 새 페이지가 됩니다.
예를 들어 업무분야별 상세 페이지를 만들고 싶다면 `yangdo.html`(양도소득세) 같은 파일을 만들고,
`index.html`의 메뉴에 `<a href="yangdo.html">양도소득세</a>`를 추가하세요.
검색 유입에는 업무분야별 페이지와 사례·칼럼 글이 가장 효과적입니다.
