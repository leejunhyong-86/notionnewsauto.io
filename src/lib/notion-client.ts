import { Client } from '@notionhq/client';
import { config } from '../config/env.js';

export const notion = new Client({
  auth: config.notion.apiKey,
});

/**
 * Notion 데이터베이스에 페이지 추가
 */
export async function createPage(properties: Record<string, any>) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: config.notion.databaseId,
      },
      properties,
    });
    return response;
  } catch (error) {
    console.error('Notion 페이지 생성 실패:', error);
    throw error;
  }
}

/**
 * 데이터베이스 스키마 확인
 */
export async function getDatabase() {
  try {
    const response = await notion.databases.retrieve({
      database_id: config.notion.databaseId,
    });
    return response;
  } catch (error) {
    console.error('데이터베이스 조회 실패:', error);
    throw error;
  }
}

