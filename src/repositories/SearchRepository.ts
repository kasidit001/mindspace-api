import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import type { SearchResultRow } from "../interfaces/search.interface";

/**
 * Plain Postgres full-text search (to_tsvector/plainto_tsquery) over lesson title + content,
 * for the Cmd+K spotlight search. English-only — see src/routes/search.ts note on why Thai
 * content isn't indexed here.
 */
export async function searchLessons(q: string): Promise<SearchResultRow[]> {
  const rows = await sequelize.query<{
    id: string;
    title: string;
    slug: string;
    course_title: string;
    course_slug: string;
    snippet: string;
    rank: number;
  }>(
    `SELECT l.id, l.title_en AS title, l.slug,
            c.title AS course_title, c.slug AS course_slug,
            ts_headline(
              'english', l.content_en, plainto_tsquery('english', :q),
              'MaxFragments=1, MaxWords=30, MinWords=15'
            ) AS snippet,
            ts_rank(
              to_tsvector('english', l.title_en || ' ' || l.content_en),
              plainto_tsquery('english', :q)
            ) AS rank
       FROM lessons l
       JOIN courses c ON c.id = l.course_id
      WHERE c.published = true
        AND to_tsvector('english', l.title_en || ' ' || l.content_en) @@ plainto_tsquery('english', :q)
      ORDER BY rank DESC
      LIMIT 20`,
    { replacements: { q }, type: QueryTypes.SELECT }
  );

  return rows.map((r) => ({
    lessonId: r.id,
    title: r.title,
    slug: r.slug,
    courseTitle: r.course_title,
    courseSlug: r.course_slug,
    snippet: r.snippet,
    rank: Number(r.rank),
  }));
}
