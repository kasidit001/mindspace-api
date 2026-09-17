import { Router } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export const searchRouter = Router();

// GET /api/search?q=query — full-text keyword search over lesson title + content,
// for the Cmd+K spotlight search. This is plain Postgres full-text search (to_tsvector/
// plainto_tsquery), separate from the pgvector semantic search used by /api/chat/ask —
// keyword search is what a "jump to this exact lesson" spotlight needs; RAG retrieval
// is for the chat's grounding context.
// English-only: searches title_en/content_en. The 'english' text-search config below
// doesn't stem/tokenize Thai correctly, so Thai lesson content isn't indexed here yet.
searchRouter.get("/search", async (req, res, next) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!q) {
    res.status(400).json({ error: "BadRequestError", message: "Query parameter 'q' is required" });
    return;
  }

  try {
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
        WHERE to_tsvector('english', l.title_en || ' ' || l.content_en) @@ plainto_tsquery('english', :q)
        ORDER BY rank DESC
        LIMIT 20`,
      { replacements: { q }, type: QueryTypes.SELECT }
    );

    res.json(
      rows.map((r) => ({
        lessonId: r.id,
        title: r.title,
        slug: r.slug,
        courseTitle: r.course_title,
        courseSlug: r.course_slug,
        snippet: r.snippet,
        rank: Number(r.rank),
      }))
    );
  } catch (err) {
    next(err);
  }
});
