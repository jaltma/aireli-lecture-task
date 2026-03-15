import { Request, Response } from 'express';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  // Cast as PlatformUser to bypass strict TS constraints on missing fields
  const newUser = {
    id: "",
    email,
    password
  } as PlatformUser;

  try {
    const createdUser = await createUser(newUser);
    res.status(201).json({ user: createdUser });
  } catch (error) {
    console.error('Error registering user in controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};