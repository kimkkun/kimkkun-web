import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import KkunThumbnail from "@/components/KkunThumbnail";
import KkunInfographic from "@/components/KkunInfographic";

const TITLE_LINES = ["직원이 먹는 건", "손해가 아니라"];
const ACCENT_LINE = "보급입니다";

const INFO_DATA = {
  category: "사장 이야기" as const,
  titleLines: TITLE_LINES,
  accentLine: ACCENT_LINE,
  sectionTitle: "통제하는 사장 vs 선을 긋는 사장",
  tableHeaders: ["구분", "통제형 ✗", "선긋기형 ✓"] as [string, string, string],
  tableRows: [
    ["기본 전제", "감시해야 한다", "동료다"],
    ["규칙 방식", "금지 목록", "허용 범위"],
    ["직원 반응", "몰래 먹음", "당당하게 먹음"],
    ["분위기", "눈치 + 불신", "존중 + 자율"],
    ["사장 에너지", "CCTV 스트레스", "규칙 후 신뢰"],
  ],
  calloutTitle: "음료수 1캔 = 1,200원",
  calloutSub: "직원 재채용 비용 = 최소 50만 원+",
  stepsTitle: "보급 규칙 세팅 3단계",
  steps: [
    { num: "01", title: "허용 범위를 정한다", desc: "메뉴·음료·시간의 구체적인 선" },
    { num: "02", title: "첫날에 말해준다", desc: '"분위기 보고"는 방치, 명시가 규칙' },
    { num: "03", title: "선 넘으면 그때 말한다", desc: '"왜 먹어?" 대신 "여기까진 OK"' },
  ],
  footerLine: "보급이 되는 매장에서는",
  footerAccent: "직원이 서비스에 집중합니다",
};

const ARTICLE_MD = `# 직원이 먹는 건 손해가 아니라, 보급입니다

---

"가족 같은 직장"

이 말, 저도 싫어합니다.
사장이 하면 착취의 포장지고, 직원이 하면 거리두기의 신호거든요.

근데 "같이 전쟁 나간 동료"라면 얘기가 다릅니다.
동료한테 보급은 끊지 않거든요.

오늘은 자영업자 커뮤니티에서 매번 싸움이 붙는 주제를 꺼내보려고 합니다.
**"직원이 매장에서 먹는 거, 어디까지 허용해야 하나?"**

---

## 배고픈 병사한테 총 들고 뛰라는 겁니다

군대 다녀온 분이면 아실 거예요.
사기가 가장 떨어지는 순간이 언제인지.

총알 떨어졌을 때가 아닙니다.
밥이 늦었을 때예요.

배고픈 병사한테 "적이 온다, 뛰어"라고 하면 뜁니다. 근데 마음이 안 뜁니다.
"이 부대가 나한테 관심이 있긴 한 건가?" 이 생각이 머릿속에 박히면, 총을 잡은 손에 힘이 빠져요.

매장도 똑같습니다.

점심시간 지나서 배가 고픈 직원한테 "손님 오셨다, 웃으면서 서빙해"라고 하면 합니다. 근데 마음이 안 웃습니다.
**배고픈 사람이 진심으로 웃을 수 있는 서비스 업종은 이 세상에 없습니다.**

---

## "근데 걔네가 몰래 먹는 게 문제잖아요"

솔직히 말할게요.
저도 겪었습니다.

냉장고에서 음료수가 하나씩 빠져 있고, 영업 전에 식자재로 쓸 튀김을 튀겨 먹고.
CCTV 돌려볼까, 말까 — 이 고민을 안 해본 사장이 있을까요.

근데 여기서 갈림길이 생깁니다.

"저것들이 또 먹었네" → 통제 강화
"먹을 수 있는 선을 내가 안 정해줬구나" → 구조 설계

**문제는 직원이 먹은 게 아니라, 먹어도 되는 범위가 없었던 겁니다.**

군대로 돌아가 볼게요. 보급이 제대로 되는 부대에서는 아무도 PX 물건을 훔치지 않습니다. "내 몫이 있다"는 걸 아니까요. 보급이 불규칙하고, 뭘 먹어도 되는지 모르는 부대에서 문제가 생깁니다.

---

## 통제하는 사장 vs 선을 긋는 사장

이 둘은 비슷해 보이지만 완전히 다릅니다.

| 구분 | 통제하는 사장 | 선을 긋는 사장 |
|------|-------------|-------------|
| 기본 전제 | "직원은 감시해야 한다" | "직원은 동료다" |
| 규칙 방식 | 금지 목록 (이것저것 하지 마라) | 허용 범위 (여기까지는 자유) |
| 직원 반응 | 몰래 먹음 → 걸리면 갈등 | 허용된 범위 안에서 당당하게 먹음 |
| 분위기 | 눈치 + 불신 | 존중 + 자율 |
| 사장 에너지 | CCTV 확인, 재고 체크, 스트레스 | 규칙 한 번 정하고 끝 |
| 결과 | 직원 이직 → 재채용 비용 50만 원+ | 직원 유지 → 서비스 품질 안정 |

냉정하게 말하면, **통제는 관리가 아니라 에너지 낭비입니다.**
음료수 한 캔 1,200원 아끼려다 직원 한 명 잃으면, 재채용 비용이 최소 50만 원이에요. 여기에 교육 기간의 서비스 품질 하락, 기존 직원의 업무 부담 증가까지 더하면 — 계산이 안 맞습니다.

---

## 업종별로 보면 더 선명합니다

**요식업**: 식자재 원가가 직접 걸려 있어서 가장 민감한 업종. 하지만 "메뉴 중 OO은 자유, 식자재 임의 사용은 불가" 같은 선 하나면 충분합니다.

**카페**: 음료 한 잔 원가 500~800원. 하루 한 잔 허용하면 월 15,000원. 이걸 못 줘서 바리스타가 나가면?

**미용실**: 시술 재료는 원가가 높아서 민감하지만, 직원이 서로 연습 겸 시술해주는 건 허용하는 게 실력 향상에도 도움이 됩니다.

**소매점**: 직원 할인 10~20%는 업계 표준. 오히려 직원이 제품을 써봐야 고객한테 진짜 추천을 할 수 있습니다.

**피트니스**: 영업 외 시간 시설 이용 자유. 운동하는 트레이너가 안 하는 트레이너보다 설득력이 있는 건 당연하죠.

공통점이 보이시나요?
**허용의 원가는 대부분 직원 이탈의 원가보다 훨씬 쌉니다.**

---

## "처음 온 직원의 눈"으로 보면

입사 첫날. 매장에 들어왔습니다.

"여기 음료 마셔도 되나? 밥은 알아서 먹는 건가? 아무도 안 알려주는데..."
"다른 언니는 먹는 것 같은데, 나도 먹어도 되는 건가?"
"괜히 물어봤다가 쪼잔한 사람 되는 거 아닌가?"
"일단 참자. 나중에 분위기 보고..."

이게 첫날부터 시작되면, 그 직원은 가게에 소속감을 느끼기 전에 눈치를 먼저 배웁니다.

근데 만약 첫날에 사장이 이렇게 말했다면?

"냉장고에 음료 있으니까 하루에 하나씩은 편하게 마셔요. 식사는 영업 전후로 메뉴 중에서 골라 먹으면 됩니다. 대신 식자재 임의로 쓰는 건 안 돼요."

3문장이면 끝입니다.
이 3문장이 6개월 뒤에도 그 직원이 남아 있느냐, 한 달 만에 나가느냐를 가릅니다.

---

## 보급 규칙 세팅 가이드

**Step 1. 허용 범위를 정한다**
메뉴 중 어디까지 먹을 수 있는지, 음료는 하루 몇 잔인지, 식사 시간은 언제인지.
"다 안 돼"도, "다 돼"도 아닌 — **구체적인 선**을 정합니다.

**Step 2. 첫날에 말해준다**
입사 첫날 오리엔테이션에서 명확하게 전달합니다.
"분위기 보고 알아서 하세요"는 규칙이 아니라 방치예요.

**Step 3. 선을 넘으면 그때 말한다**
허용 범위를 정해뒀으니, 선을 넘는 경우만 피드백하면 됩니다.
"왜 먹어?"가 아니라 "여기까지는 괜찮은데, 이건 넘었어"로 대화가 됩니다.

---

### 내 매장 보급 체크리스트

| 항목 | ✗ 위험 신호 | ✓ 건강한 신호 |
|------|-----------|------------|
| 규칙 전달 | 암묵적 ("알아서 해") | 첫날 명시적 안내 |
| 직원 식사 | 금지 or 규칙 없음 | 허용 범위 + 시간 지정 |
| 음료/간식 | 전면 금지 | 하루 1잔 등 기준 있음 |
| 선 넘었을 때 | 뒤에서 불만 → 폭발 | 즉시 피드백 → 조정 |
| 사장 에너지 | CCTV 수시 확인 | 규칙 세팅 후 신뢰 |
| 직원 반응 | 몰래 먹음 / 눈치 | 당당하게 먹고 일에 집중 |

✗가 3개 이상이면?
→ 규칙이 아니라 통제로 운영되고 있을 가능성이 높습니다.
먼저 Step 1부터 시작해보세요. 허용 범위를 정하는 것만으로도 분위기가 달라집니다.

---

## 돈을 벌자고 모인 사이, 그건 맞습니다

저도 착각하지 않습니다.
직원과 사장은 고용 관계예요. 가족이 아닙니다.

근데 우리의 소중한 시간을 함께 보내고 있는 것도 사실이에요.
하루에 8시간, 일주일에 5일. 가족보다 더 오래 얼굴을 보는 사이입니다.

가족 같이는 아니지만,
**모험을 함께 하는 동료로서 같이 헤쳐나가는 중입니다.**

물론 그 중에 인성이 안 좋은 사람도 있습니다.
어쩌겠어요. 그래도 좋은 사람들이 더 많더라고요.

그렇다고 막 주자는 게 아닙니다.
선을 정해주고, 그 안에서 자유를 주는 거예요.

보급이 되는 부대에서는
병사가 전투에 집중하고,

보급이 되는 매장에서는
직원이 서비스에 집중합니다.

**직원이 먹는 건 손해가 아닙니다.**
**그건 당신의 매장이 제대로 돌아가기 위한 보급입니다.**

---

## 📎 부록 1. 업종별 보급 허용범위 가이드

내 매장에 바로 적용할 수 있게 정리했습니다. 캡처해서 두고 보세요.

| 업종 | 추천 허용 범위 | 명확히 금지할 것 | 한 줄 원칙 |
|------|------------|-------------|---------|
| **요식업 (식당)** | 영업 전후 직원식 1식 + 사이드 메뉴 1종 자유 | 식자재 임의 사용, 메인 메뉴 무단 조리 | "정해진 메뉴는 자유, 식자재는 보고" |
| **카페** | 하루 음료 1~2잔 + 폐기 직전 베이커리 | 영업 중 손님 앞 음료 제조, 신상품 무단 시음 | "원가 800원, 충성도 80,000원" |
| **미용·뷰티** | 직원 간 시술 연습 (영업 외 시간), 샘플 제품 사용 | 고가 시술 재료 사적 사용, 고객 예약 시간 침범 | "연습은 실력, 재료는 자산" |
| **소매·편집샵** | 직원 할인 10~20% + 시즌 오프 제품 우선 구매 | 신상품 무단 착용, 진열 상품 손상 | "직원이 입어봐야 진짜 추천이 나옴" |
| **피트니스·필라테스** | 영업 외 시간 시설·기구 자유 사용 | 회원 시간대 침범, 강사 매트 등 비품 손상 | "운동 안 하는 트레이너의 설득력 = 0" |
| **1인 서비스 (네일·왁싱 등)** | 보조 직원 셀프 시술 (영업 외), 디자인 연습 | 고가 컬러·재료 임의 사용 | "연습한 만큼 손이 빨라진다" |

→ 공통 원칙: **"무엇을(what) + 언제(when) + 얼마나(how much)"** 이 세 가지를 명시하면 끝.

---

## 📎 부록 2. 우리 매장 보급 진단 체크리스트

| # | 질문 | YES | NO |
|---|------|-----|-----|
| 1 | 직원 식사·음료 규칙을 첫날에 명시적으로 알려준다 | ☐ | ☐ |
| 2 | "이건 먹어도 되고, 이건 안 된다"를 직원이 명확히 안다 | ☐ | ☐ |
| 3 | 직원이 뭔가 먹을 때 눈치 보지 않는다 | ☐ | ☐ |
| 4 | 직원이 선을 넘었을 때 즉시 피드백할 수 있다 (뒤에서 끙끙대지 않음) | ☐ | ☐ |
| 5 | 최근 한 달간 CCTV로 직원 식사 관련 확인을 한 적이 없다 | ☐ | ☐ |
| 6 | 직원에게 "왜 먹었어?"보다 "여기까지는 괜찮아"가 더 자주 나온다 | ☐ | ☐ |
| 7 | 직원 식사 규칙 때문에 갈등이 생긴 적이 없다 | ☐ | ☐ |

**진단 결과**

- **YES 6~7개**: 보급이 되는 매장. 직원이 일에 집중할 수 있는 구조가 잡혀 있습니다.
- **YES 4~5개**: 절반은 맞고 절반은 비어 있음. 첫날 오리엔테이션에 식사 규칙 1분만 추가해보세요.
- **YES 3개 이하**: 통제 모드로 운영 중일 가능성이 높습니다. 본문 Step 1부터 다시 읽어보세요. 음료수 한 캔 아끼다 사람을 잃는 구조일 수 있습니다.

---

📩 **김꾼 — 자영업자를 사업가로**
장사의 구조를 바꾸는 글을 씁니다.

**NEXT**: "사장이 빠져도 돌아가는 매장" — 시스템화의 시작점
`;

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl md:text-4xl font-black leading-tight mt-4 mb-10">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-20 mb-8">
      <div className="w-full h-px bg-border/50 mb-10" />
      <h2 className="text-2xl md:text-3xl font-black leading-tight">{children}</h2>
    </div>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-bold mt-14 mb-6 leading-tight">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[15px] leading-[2.2] text-foreground/85 mb-6">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-foreground font-semibold underline decoration-foreground/40 decoration-2 underline-offset-4">
      {children}
    </strong>
  ),
  hr: () => (
    <div className="my-16 flex justify-center">
      <div className="w-12 h-px bg-muted/30" />
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-foreground/30 pl-5 my-8 italic text-muted">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-3 my-6 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-3 my-6 ml-4 list-decimal">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[15px] leading-[2.2] text-foreground/85">{children}</li>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 -mx-6 px-6 overflow-x-auto">
      <div className="rounded-xl border border-border min-w-[600px]">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-[#1a1a1a]">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border text-[13px] align-top">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-foreground/80 border-b border-border/50 text-[13px] leading-relaxed align-top">
      {children}
    </td>
  ),
};

export default function KkunComponentsDemoPage() {
  return (
    <main className="pt-10 pb-24">
      {/* 썸네일 */}
      <div className="px-6">
        <div className="max-w-[1000px] mx-auto">
          <KkunThumbnail
            category="사장 이야기"
            titleLines={TITLE_LINES}
            accentLine={ACCENT_LINE}
          />
        </div>
      </div>

      {/* 본문 */}
      <article className="px-6 mt-16">
        <div className="max-w-[600px] mx-auto">
          <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {ARTICLE_MD}
          </Markdown>
        </div>
      </article>

      {/* 인포그래픽 */}
      <div className="px-6 mt-20">
        <KkunInfographic {...INFO_DATA} />
      </div>
    </main>
  );
}
