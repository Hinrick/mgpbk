import { Request, Response } from "express";

export const geLiveData = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      data: {
        teamAScore: 0,
        teamBScore: 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
