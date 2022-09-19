import { rest } from "msw";
import { factory, primaryKey, manyOf, oneOf } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import randToken from "rand-token";
import ms from "ms";

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    name: String,
    email: String,
    password: String,
    role: String,
    boards: manyOf("board"),
  },
  token: {
    id: primaryKey(nanoid),
    refreshToken: String,
    user: oneOf("user"),
    expirationDate: Date,
  },
  board: {
    id: primaryKey(nanoid),
    name: String,
    sections: manyOf("section"),
  },
  section: {
    id: primaryKey(nanoid),
    heading: String,
    tasks: manyOf("task"),
  },
  task: {
    id: primaryKey(nanoid),
    text: String,
    completed: Boolean,
  },
});

const board = db.board.create({
  id: "UH67Zpi-0q7Dq5b_wDFkQ",
  name: "default board",
});

export const handlers = [
  rest.get("/v1/boards/:boardId", (req, res, ctx) => {
    const { boardId } = req.params;

    const board = db.board.findFirst({
      where: { id: { equals: boardId } },
    });

    return res(
      ctx.status(200),
      ctx.json({
        ...board,
      })
    );
  }),
  rest.post("/v1/boards/:boardId/sections", (req, res, ctx) => {
    console.log(req.body);
    const { heading } = req.body;
    const { boardId } = req.params;

    const section = db.section.create({
      heading: heading,
    });
    db.board.update({
      where: {
        id: {
          equals: boardId,
        },
      },
      data: {
        sections: (prevSections) => prevSections.concat(section),
      },
    });
    return res(ctx.status(200), ctx.json(section));
  }),
  rest.post("/v1/sections/:sectionId/tasks", (req, res, ctx) => {
    const { text } = req.body;
    const { sectionId } = req.params;

    const task = db.task.create({
      text,
      completed: false,
    });
    db.section.update({
      where: {
        id: {
          equals: sectionId,
        },
      },
      data: {
        tasks: (prevTasks) => prevTasks.concat(task),
      },
    });
    return res(ctx.status(200), ctx.json(task));
  }),
  rest.delete("/v1/sections/:sectionId/tasks/:taskId", (req, res, ctx) => {
    const { taskId, sectionId } = req.params;

    db.task.delete({
      where: {
        id: {
          equals: taskId,
        },
      },
    });
    db.section.update({
      where: {
        id: {
          equals: sectionId,
        },
      },
      data: {
        tasks: (prevTasks) => prevTasks.filter((task) => task.id !== taskId),
      },
    });

    return res(ctx.status(200));
  }),
  rest.patch("/v1/tasks/:taskId", (req, res, ctx) => {
    const { completed } = req.body;
    const { taskId } = req.params;

    const updatedTask = db.task.update({
      where: {
        id: {
          equals: taskId,
        },
      },
      data: {
        completed,
      },
    });

    return res(ctx.status(200), ctx.json(updatedTask));
  }),
  rest.post("/v1/auth/signup", (req, res, ctx) => {
    const { email, name, password } = req.body;

    const user = db.user.create({
      name,
      email,
      password,
      role: "user",
      boards: [
        db.board.create({
          name: "Стартовая доска",
        }),
      ],
    });

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "SECRET_KEY",
      { algorithm: "HS256", expiresIn: "15m" }
    );

    const refreshToken = randToken.uid(64);

    db.token.create({
      refreshToken,
      user,
      expirationDate: new Date(Date.now() + ms("30d")),
    });

    return res(
      ctx.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: ms("30d") / 1000,
      }),
      ctx.status(200),
      ctx.json({
        userInfo: user,
        accessToken,
      })
    );
  }),
  rest.post("/v1/auth/login", (req, res, ctx) => {
    const { email, password } = req.body;

    const user = db.user.findFirst({
      where: {
        email: { equals: email },
        password: { equals: password },
      },
    });

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "SECRET_KEY",
      { algorithm: "HS256", expiresIn: "15m" }
    );

    const refreshToken = randToken.uid(64);
    db.token.create({
      refreshToken,
      user,
      expirationDate: new Date(Date.now() + ms("30d")),
    });

    return res(
      ctx.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: ms("30d") / 1000,
      }),
      ctx.status(200),
      ctx.json({
        userInfo: user,
        accessToken,
      })
    );
  }),
];
