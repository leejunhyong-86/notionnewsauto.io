import { collectAndSaveNews } from '../services/news-collector.js';
import { newsFeeds } from '../config/feeds.js';

async function main() {
  console.log('뉴스 수집을 시작합니다...\n');
  
  try {
    await collectAndSaveNews(newsFeeds);
    console.log('\n뉴스 수집이 완료되었습니다.');
  } catch (error) {
    console.error('뉴스 수집 중 오류 발생:', error);
    process.exit(1);
  }
}

main();

