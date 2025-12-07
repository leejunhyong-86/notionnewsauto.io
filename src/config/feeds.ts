/**
 * 뉴스 수집을 위한 RSS 피드 설정
 * 원하는 피드를 추가하세요
 */
export const newsFeeds = [
  {
    url: 'https://rss.cnn.com/rss/edition.rss',
    name: 'CNN',
  },
  {
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    name: 'BBC News',
  },
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    name: 'New York Times',
  },
  // 한국 뉴스 예시
  {
    url: 'https://news.naver.com/main/rss/section.naver?sid=100',
    name: '네이버 정치',
  },
  {
    url: 'https://news.naver.com/main/rss/section.naver?sid=101',
    name: '네이버 경제',
  },
  {
    url: 'https://news.naver.com/main/rss/section.naver?sid=105',
    name: '네이버 IT/과학',
  },
];

