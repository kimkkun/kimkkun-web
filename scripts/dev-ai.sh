#!/bin/sh
# AI 도구까지 켜서 로컬 서버 실행. 1Password Claude 금고의 Anthropic 키를 이 실행에만 넣는다(파일에 저장 안 함).
# 금고 항목 이름: "Anthropic API 키 (김꾼 사이트)" — 바뀌면 아래 ITEM만 고친다.
ITEM='Anthropic API 키 (김꾼 사이트)'
KEY="$(op-claude read "op://Claude/$ITEM/credential" 2>/dev/null || op-claude read "op://Claude/$ITEM/password" 2>/dev/null)"
if [ -z "$KEY" ]; then
  echo "1Password Claude 금고에서 '$ITEM'을 못 찾았어요." >&2
  exit 1
fi
ANTHROPIC_API_KEY="$KEY" exec npx next dev -p "${PORT:-3100}"
