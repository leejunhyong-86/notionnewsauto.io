import { notion } from '../lib/notion-client.js';
import { config } from '../config/env.js';

async function testConnection() {
  console.log('Notion 연결 테스트를 시작합니다...\n');
  console.log('API Key:', config.notion.apiKey.substring(0, 20) + '...');
  console.log('Database ID:', config.notion.databaseId);
  console.log('');

  try {
    // 데이터베이스 정보 조회
    console.log('데이터베이스 정보를 조회하는 중...');
    const database = await notion.databases.retrieve({
      database_id: config.notion.databaseId,
    });

    console.log('✓ 데이터베이스 연결 성공!');
    console.log('데이터베이스 제목:', database.title[0]?.plain_text || '제목 없음');
    console.log('데이터베이스 ID:', database.id);
    console.log('\n속성 목록:');
    Object.keys(database.properties).forEach((key) => {
      const prop = database.properties[key];
      console.log(`  - ${key}: ${prop.type}`);
    });
  } catch (error: any) {
    console.error('\n✗ 데이터베이스 연결 실패');
    console.error('오류 코드:', error.code);
    console.error('오류 메시지:', error.message);

    if (error.code === 'object_not_found') {
      console.error('\n해결 방법:');
      console.error('1. 데이터베이스 ID가 올바른지 확인하세요');
      console.error('2. Integration이 데이터베이스에 연결되어 있는지 확인하세요');
      console.error('   - 데이터베이스 페이지 → 우측 상단 "..." → "Connections" → Integration 선택');
      console.error('3. 데이터베이스 ID 형식 확인:');
      console.error('   - URL에서 추출: https://www.notion.so/workspace/ID?v=...');
      console.error('   - 하이픈이 있으면 그대로 사용, 없으면 하이픈 없이 사용');
    }
    process.exit(1);
  }
}

testConnection();

