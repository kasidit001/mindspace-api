import { Router } from "express";
import { Lesson, Note } from "../models";
import { requireAuth } from "../utils/auth";

export const notesRouter = Router();

// POST /api/notes  { content: string, lessonId?: string, source?: "manual" | "chat" }
notesRouter.post("/notes", requireAuth, async (req, res, next) => {
  const { content, lessonId, source } = req.body ?? {};

  if (typeof content !== "string" || !content.trim()) {
    res.status(400).json({ error: "BadRequestError", message: "Body must include a non-empty 'content' string" });
    return;
  }

  if (source !== undefined && source !== "manual" && source !== "chat") {
    res.status(400).json({ error: "BadRequestError", message: "'source' must be 'manual' or 'chat'" });
    return;
  }

  try {
    if (lessonId !== undefined && lessonId !== null) {
      const lesson = await Lesson.findByPk(lessonId);
      if (!lesson) {
        res.status(404).json({ error: "NotFoundError", message: "Lesson not found" });
        return;
      }
    }

    const note = await Note.create({
      userId: req.user!.id,
      content: content.trim(),
      lessonId: lessonId ?? null,
      source: source ?? "manual",
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// GET /api/notes — the authenticated user's own notes; optionally filter with ?lessonId=
notesRouter.get("/notes", requireAuth, async (req, res, next) => {
  try {
    const { lessonId } = req.query;
    const where = {
      userId: req.user!.id,
      ...(typeof lessonId === "string" ? { lessonId } : {}),
    };

    const notes = await Note.findAll({
      where,
      include: [{ model: Lesson, as: "lesson", attributes: ["id", "titleEn", "titleTh", "slug"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json(notes);
  } catch (err) {
    next(err);
  }
});
