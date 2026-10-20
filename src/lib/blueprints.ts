/* AI 도구 설계도. 사장님이 자기 AI(제미나이·GPT·클로드)에 붙여 넣어 도구를 만드는 지시문 묶음.
   길: /tools → /tools/[주제] → /tools/[주제]/[설계도] → quick(1분) · save(5분) · web(30분)
   새 설계도: BLUEPRINTS에 하나 추가(주제가 새로우면 TOPICS에도). 원고 정본은 content/writing/works의 blueprint-*.md. */

export type Topic = { slug: string; title: string; icon: string }
export type SaveStep = [string, string?] // [할 일, 덧붙임]
export type SaveGuide = { ai: 'gemini' | 'claude' | 'gpt'; name: string; how: string; free?: boolean; warn?: string; steps: SaveStep[] }
export type Blueprint = {
  slug: string
  topic: string
  title: string
  icon: string
  short: string // 문 한 줄
  promise: string // 설계도 첫 화면 제목
  does: string // "이 도구가 뭘 해 주나요?"
  stuck?: string // 막힐 때
  article?: string // 짝 글 주소(/content/...)
  quick: string // 1분 지시문
  save: SaveGuide[]
  saveTip?: string
  web: string // 30분 지시문
  webTip?: string
}

export const TOPICS: Topic[] = [{ slug: 'staff', title: '사람 구하기·직원', icon: 'staff' }]

const JOB_POST_QUICK = `지금부터 너는 우리 가게 '알바 공고 도우미'야. 아래 순서와 규칙대로만 움직여.

[순서]
1. 인사나 설명 없이 바로 첫 질문부터 해. 질문은 한 번에 한 묶음씩만 해.
   - 묶음 1, 우리 가게: 가게 이름·업종·위치 / 주로 오는 손님 / 가게를 차린 이유 / 같이 일하는 사람한테 꼭 지키는 것 / 같이 일하고 싶은 사람(진짜 있었던 장면으로)
   - 묶음 2, 근무 조건: 요일·시간 / 시급 / 수습 기간 / 시작 날짜
   - 묶음 3, 하는 일: 홀·주방·카운터 중 어디 / 실제로 하는 일 / 제일 바쁜 시간
   - 묶음 4, 있는 것만: 실제로 주는 혜택(없으면 '없음') / 지원 방법 / 언제까지 연락 주는지
2. 내가 대충 말해도 괜찮아. 말하듯이 답해도 알아듣고 정리해.
3. 네 묶음을 다 받으면, 지원자 입장에서 빠졌거나 애매한 걸 최대 5개까지 물어봐. 내가 "넘어가"라고 하면 바로 써.
4. 공고를 두 개 써 줘.
   - 알바 앱용 짧은 버전(10줄 안팎)
   - 가게 SNS용 긴 버전(가게 이야기와 사장 마음을 살려서)
5. 마지막에 "올리기 전 확인"을 붙여 줘. 내가 안 알려줘서 비워 두거나 애매하게 쓴 부분을 먼저 적고, 아래 네 가지를 덧붙여.
   - 내가 말하지 않은 혜택이 들어가 있지 않은지
   - 시급·시간·요일이 내가 말한 숫자와 같은지
   - 나이·성별·외모를 조건으로 거는 말이 없는지
   - 지원 방법과 연락 주는 날짜가 있는지

[규칙]
- 내가 말하지 않은 혜택·조건·숫자는 절대 지어내지 마. 모르면 비워 두고 확인할 점으로 남겨.
- "20대 환영", "여성 우대", "용모 단정" 같은 나이·성별·외모 조건은 쓰지 마.
- "가족 같은 분위기" 같은 근거 없는 꾸밈말은 쓰지 마. 내가 말한 장면과 말을 살려.
- 내 문장이 서툴러도 뜻은 그대로 두고 읽기 쉽게만 다듬어.
- 존댓말로 쉽게 써. 이모지는 쓰지 마.
- 다 쓴 뒤에 내가 고쳐 달라고 하면, 고친 부분만 바꿔서 다시 보여 줘.`

const JOB_POST_WEB = `우리 가게 알바 공고를 만드는 웹페이지 도구를 한 페이지로 만들어 줘.

[화면]
- 위에서부터 네 묶음의 입력 칸
  1) 우리 가게: 가게 이름·업종·위치 / 주로 오는 손님 / 차린 이유 / 꼭 지키는 것 / 같이 일하고 싶은 사람
  2) 근무 조건: 요일·시간 / 시급 / 수습 기간 / 시작 날짜
  3) 하는 일: 홀·주방·카운터 / 실제로 하는 일 / 제일 바쁜 시간
  4) 있는 것만: 실제 혜택(없으면 '없음') / 지원 방법 / 연락 주는 시점
- 각 칸에는 회색 예시 글씨를 넣어 줘.
- 맨 아래 "공고 만들기" 단추.
- 결과는 "앱용 짧은 버전", "SNS용 긴 버전" 두 칸으로 보여 주고, 칸마다 복사 단추를 달아 줘.
- 결과 아래에 "올리기 전 확인" 체크리스트: 말하지 않은 혜택이 없는지 / 숫자가 같은지 / 나이·성별·외모 조건이 없는지 / 지원 방법과 연락 날짜가 있는지.

[공고를 쓸 때 규칙]
- 입력하지 않은 혜택·조건·숫자는 지어내지 않는다.
- 나이·성별·외모 조건, 근거 없는 꾸밈말은 쓰지 않는다.
- 사장 문장은 뜻을 그대로 두고 읽기 쉽게만 다듬는다.

[모양]
- 휴대폰에서 보기 편하게, 글씨는 크게, 색은 흰 바탕에 파란색 하나만.`

export const BLUEPRINTS: Blueprint[] = [
  {
    slug: 'job-post',
    topic: 'staff',
    title: '알바 공고 도구',
    icon: 'notice',
    short: '말만 하면 앱용·SNS용 공고 두 개',
    promise: '내 AI가 공고 도구가 돼요',
    does: '가게 이야기와 조건을 물어보고, 지원자가 궁금해할 빠진 정보를 먼저 묻고, 알바 앱용 짧은 공고와 SNS용 긴 공고를 써 줘요. 사장님이 말하지 않은 혜택은 지어내지 않아요.',
    stuck: '제일 막히는 건 "같이 일하고 싶은 사람"이에요. "성실한 사람" 말고, 예전에 같이 일했던 사람 중 "또 일하고 싶다" 싶었던 한 명이 했던 행동을 떠올려 보세요.',
    article: 'job-post-ai',
    quick: JOB_POST_QUICK,
    save: [
      {
        ai: 'gemini', name: '제미나이', how: 'Gem으로 저장', free: true,
        steps: [
          ['컴퓨터에서 gemini.google.com에 들어가요.', '만들기는 컴퓨터 웹에서만 돼요. 만든 도구는 휴대폰 앱에서도 써요.'],
          ['왼쪽 메뉴에서 Gems → 새 Gem 만들기를 눌러요.'],
          ['이름에 "알바 공고 도우미"라고 적어요.'],
          ['요청 사항 칸에 1분 버전 지시문을 붙여 넣고 저장해요.', '지시문은 아래 단추로 복사할 수 있어요.'],
        ],
      },
      {
        ai: 'claude', name: '클로드', how: '프로젝트로 저장',
        steps: [
          ['claude.ai 왼쪽 메뉴에서 프로젝트 → 새 프로젝트를 만들어요.'],
          ['이름에 "알바 공고 도우미"라고 적어요.'],
          ['프로젝트 지침 칸에 1분 버전 지시문을 붙여 넣어요.', '지시문은 아래 단추로 복사할 수 있어요.'],
          ['이 프로젝트 안에서 새 대화를 열면 바로 공고 도구로 시작해요.'],
        ],
      },
      {
        ai: 'gpt', name: 'GPT', how: '내 GPT로 저장',
        warn: 'GPT 만들기는 요금제에 따라 안 될 수 있어요. 안 되면 제미나이로 하세요.',
        steps: [
          ['ChatGPT 왼쪽 메뉴에서 GPT 탐색 → 만들기로 들어가요.'],
          ['구성 탭에서 이름을 "알바 공고 도우미"로 적어요.'],
          ['지침 칸에 1분 버전 지시문을 붙여 넣고 저장해요.', '지시문은 아래 단추로 복사할 수 있어요.'],
        ],
      },
    ],
    saveTip: '가게 이름·위치·시급처럼 매번 같은 정보는 지시문 맨 아래 "[우리 가게 기본 정보]"에 적어 두세요. 다음부터는 바뀐 것만 말하면 돼요.',
    web: JOB_POST_WEB,
    webTip: '"단추를 더 크게", "예시 글씨를 우리 가게 걸로 바꿔 줘"처럼 말로 고치면 돼요. 다른 사람과 같이 쓰는 방법(공유 링크)은 AI마다 달라요.',
  },
]

export const AI_LINKS = [
  { ai: 'gemini', name: '제미나이', href: 'https://gemini.google.com', note: '무료' },
  { ai: 'gpt', name: 'GPT', href: 'https://chatgpt.com', note: 'ChatGPT' },
  { ai: 'claude', name: '클로드', href: 'https://claude.ai', note: 'Claude' },
] as const

export const AI_ICON: Record<string, string> = { gemini: 'logo-gemini', gpt: 'logo-chatgpt', claude: 'logo-claude' }

export const findTopic = (slug: string) => TOPICS.find((t) => t.slug === slug)
export const findBlueprint = (slug: string) => BLUEPRINTS.find((b) => b.slug === slug)
export const blueprintsOf = (topic: string) => BLUEPRINTS.filter((b) => b.topic === topic)
export const blueprintHref = (b: Blueprint) => `/tools/${b.topic}/${b.slug}`
