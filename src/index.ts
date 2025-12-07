import cron from 'node-cron';
import { collectAndSaveNews } from './services/news-collector.js';
import { newsFeeds } from './config/feeds.js';

console.log('Notion 자동화 시스템이 시작되었습니다.\n');

// 매일 오전 9시에 뉴스 수집 (cron: 0 9 * * *)
// 매일 오후 6시에 뉴스 수집 (cron: 0 18 * * *)
// 또는 매 시간마다: '0 * * * *'

const schedule = process.env.NEWS_SCHEDULE || '0 9,18 * * *'; // 기본값: 하루 2회

cron.schedule(schedule, async () => {
  console.log(`\n[${new Date().toLocaleString('ko-KR')}] 뉴스 수집 작업 시작...`);
  try {
    await collectAndSaveNews(newsFeeds);
    console.log('뉴스 수집 작업 완료.\n');
  } catch (error) {
    console.error('뉴스 수집 작업 실패:', error);
  }
});

// 시작 시 한 번 실행
console.log('초기 뉴스 수집을 실행합니다...');
collectAndSaveNews(newsFeeds)
  .then(() => {
    console.log('\n스케줄러가 실행 중입니다. 종료하려면 Ctrl+C를 누르세요.');
  })
  .catch((error) => {
    console.error('초기 뉴스 수집 실패:', error);
  });

